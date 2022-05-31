function onOpen() {
    var SS = SpreadsheetApp.getActiveSpreadsheet();
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Tool')
      .addItem('Shared Drives', 'AllDrive')
      .addSeparator()
      .addItem('External Shares', 'listFilesAndFolders')
      .addToUi();
  };
  
  function listFilesAndFolders() {
  
    var ss = SpreadsheetApp.getActive();
    var outputSheet = ss.getSheetByName('External Shares');
    if (!outputSheet) {
      outputSheet = ss.insertSheet('External Shares', 3);
    } else {
      outputSheet.clear();
    }
  
    outputSheet.getRange(1, 1, 1, 7).setValues([['Team Drive Name', 'Folder/File', 'Type', 'External User', 'Email', 'Domain', 'Privilege']]);
    outputSheet.getRange(1, 1, 1, 7).setBorder(true, true, true, true, true, true).setBackground("#CCA").setFontWeight("bold").setHorizontalAlignment("left");
    outputSheet.setFrozenRows(1);
  
    var processSheet = ss.getSheetByName('Process');
    if (!processSheet) {
      processSheet = ss.insertSheet('Process', 4);
    } else {
      processSheet.clear();
    }
  
    processSheet.getRange(1, 1, 1, 3).setValues([['Team Drive Name', 'External Shares No.', 'Comments']]);
    processSheet.getRange(1, 1, 1, 3).setBorder(true, true, true, true, true, true).setBackground("#CCA").setFontWeight("bold").setHorizontalAlignment("left");
    processSheet.setFrozenRows(1);
  
    var sdSheet = ss.getSheetByName('Shared Drives');
  
    if (!sdSheet) return;
    var values = sdSheet.getDataRange().getValues();
    if (!values || values.length < 1) return;
  
    for (var i = 1; i < values.length; i++) {
      listFiles(values[i][1], values[i][2], outputSheet, processSheet);
    }
  }
  
  function listFiles(teamDriveName, teamDriveId, outputSheet, processSheet) {
  
    var domain_local = ['local.com'];
    var listArray = [];
    var files, pageToken, hasErr;
    do {
      try {
        hasErr = false;
        files = Drive.Files.list({
          maxResults: 500,
          pageToken: pageToken,
          corpora: 'teamDrive',
          supportsAllDrives: true,
          teamDriveId: teamDriveId,
          includeTeamDriveItems: true
        });
      } catch (err){
        hasErr = true;
        var lastProcessRow = processSheet.getLastRow() + 1;
        processSheet.getRange(lastProcessRow, 1, 1, 3).setValues([[teamDriveName, '', 'Access Denied!']]);
        break;
      }
      
      files.items && files.items.forEach(file => {
        var fileType = (file.mimeType == "application/vnd.google-apps.folder") ? "Folder" : "File";
  
        var filedetail = DriveApp.getFileById(file.id);
  
        var editors = filedetail.getEditors();
        editors && editors.forEach(editor => {
          var email = editor.getEmail();
          var domain_check = email.split("@")[1]
          if ( domain_local.indexOf(domain_check) < 0) {
            listArray.push([teamDriveName, file.title, fileType, editor.getName(), editor.getEmail(), editor.getDomain(), "Editor"]);
          }
        });
  
        var viewers = filedetail.getViewers();
        viewers && viewers.forEach(viewer => {
          var email = viewer.getEmail();
          var domain_check = email.split("@")[1]
          if ( domain_local.indexOf(domain_check) < 0) {
            listArray.push([teamDriveName, file.title, fileType, viewer.getName(), viewer.getEmail(), viewer.getDomain(), "Viewer"]);
          }
        });
  
      });
  
      pageToken = files.nextPageToken;
    } while (pageToken);
  
    if (listArray.length > 0) {
      var lastOutputRow = outputSheet.getLastRow() + 1;
      outputSheet.getRange(lastOutputRow, 1, listArray.length, listArray[0].length).setValues(listArray);
    } 
  
    if (!hasErr) {
      var lastProcessRow = processSheet.getLastRow() + 1;
      processSheet.getRange(lastProcessRow, 1, 1, 3).setValues([[teamDriveName, listArray.length, '']]);
    } 
  }
