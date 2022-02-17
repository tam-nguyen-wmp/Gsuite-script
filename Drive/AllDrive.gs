function AllDrive() {
    var ss = SpreadsheetApp.getActive();
    var listArray = [];
    var count = 0;
    var pageToken;
    var teamDrives;
    var sum = 0;
  
    listArray.push(['No.', 'Name', 'ID'])
  
    do {
      teamDrives = Drive.Drives.list({
        pageToken: pageToken,
        maxResults: 50,
        useDomainAdminAccess: true
      })
  
      if (teamDrives.items && teamDrives.items.length > 0) {
        for (var i = 0; i < teamDrives.items.length; i++) {
          var teamDrive = teamDrives.items[i];
          count++;sum++;
          listArray.push([count, teamDrive.name, teamDrive.id]);
        }
      } else {
        Logger.log("No Drives found.");
      }
      pageToken = teamDrives.nextPageToken
    } while (pageToken)
  
    try {
      var outputSheet = ss.getSheetByName('AllShareDrives');
      outputSheet.getDataRange();
    } catch (err) {
      var outputSheet = ss.insertSheet('AllShareDrives', 2);
    }
  
    outputSheet.clear();
  
    outputSheet.getRange(1, 1, listArray.length, listArray[0].length).setValues(listArray);
  
    outputSheet.getRange(1, 1, 1, outputSheet.getLastColumn()).setBorder(true, true, true, true, true, true).setBackground("#CCA").setFontWeight("bold").setHorizontalAlignment("left");
    outputSheet.setFrozenRows(1);
    //outputSheet.getRange(2,1,listArray.length, listArray[0].length).sort({column: 1, ascending: true});
    outputSheet.getRange(2, 1, listArray.length, listArray[0].length).setHorizontalAlignment("left")
  }