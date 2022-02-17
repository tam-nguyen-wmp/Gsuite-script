function AllDriveDetail() {
    var ss = SpreadsheetApp.getActive();
    var listArray = [];
    var pageToken;
    var teamDrives;
    var sum = 0;
    var external_account = "Yes";
    var domain_ = ['domain.com']
    var domain__outside = ['gmail.com', '...']
  
    listArray.push(['Name Drive', 'Email User', 'Type User', 'Role', 'External accounts'])
    do {
      teamDrives = Drive.Drives.list({
        pageToken: pageToken,
        maxResults: 50,
        useDomainAdminAccess: true
      })
  
      if (teamDrives.items && teamDrives.items.length > 0) {
        for (var i = 0; i < teamDrives.items.length; i++) {
          var teamDrive = teamDrives.items[i];
  
          var permissionLists = Drive.Permissions.list(teamDrive.id, {
            supportsAllDrives: true,
            useDomainAdminAccess: true
          });
          if (permissionLists.items && permissionLists.items.length > 0) {
            for (var j = 0; j < permissionLists.items.length; j++) {
  
              var permissionList = permissionLists.items[j];
              if (permissionList.emailAddress != "") {
                var role;
                sum++;
                if (permissionList.permissionDetails[0].role == "organizer") {
                  role = "Manager";
                }
                else if (permissionList.permissionDetails[0].role == "fileOrganizer") {
                  role = "Content Manager";
                }
                else if (permissionList.permissionDetails[0].role == "writer") {
                  role = "Contributor";
                }
                else if (permissionList.permissionDetails[0].role == "reader") {
                  role = "Viewer - Commenter";
                }
                else if (permissionList.permissionDetails[0].role == "commenter") {
                  role = "Commenter";
                }
                else {
                  role = permissionList.permissionDetails[0].role;
                }
  
                var domain_check = permissionList.emailAddress.split("@")[1]
                if (domain_.indexOf(domain_check) > -1)
                {
                  external_account = "";
                }
                else
                {
                  external_account = "Yes";
                }
                listArray.push([teamDrive.name, permissionList.emailAddress, permissionList.type, role, external_account]);
              }
            }
          } else {
            Logger.log("No permission");
          }
        }
  
      } else {
        Logger.log("No permissions found.");
      }
      pageToken = teamDrives.nextPageToken
    } while (pageToken)
  
    try {
      var outputSheet = ss.getSheetByName('ShareDriveDetail');
      outputSheet.getDataRange();
    } catch (err) {
      var outputSheet = ss.insertSheet('ShareDriveDetail', 2);
    }
  
    while (outputSheet.getMaxRows() <= (sum + 1)) {
      outputSheet.insertRowAfter(outputSheet.getLastRow());
    }
    outputSheet.clear();
    outputSheet.getRange(1, 1, listArray.length, listArray[0].length).setValues(listArray);
  
    outputSheet.getRange(1, 1, 1, outputSheet.getLastColumn()).setBorder(true, true, true, true, true, true).setBackground("#CCA").setFontWeight("bold").setHorizontalAlignment("left");
    outputSheet.setFrozenRows(1);
    outputSheet.getRange(2, 1, listArray.length, listArray[0].length).sort([{ column: 1, ascending: true }, { column: 2, ascending: true }]);
    outputSheet.getRange(2, 1, listArray.length, listArray[0].length).setHorizontalAlignment("left")
  }