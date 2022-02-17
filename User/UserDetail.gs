function AllUsers() {
    var ss = SpreadsheetApp.getActive();
    var pageToken, page, count = 0;
    var listArray = [];
    var region = "Global";
    var reg_code = "123" // Code country
    var sum = 0;
    var country_define = ['Asia','Europe']
    
    listArray.push(['No.', 'Account Type', 'First Name', 'Last Name', 'Region', 'RegCode', 'Country', 'Office', 'City', 'Title', 'Type', 'Primary Email', 'EmployeeID', 'Phone', 'Division', 'Department', 'Cost Centre', 'Office Type', 'Alias A', 'Alias B', 'Alias C', 'Alias D', 'Alias E', 'Alias F', 'Alias G', 'Alias H', 'Additional Services', 'Creation Date', 'Last Connection', 'Suspended', 'ID']);
    
    do {
      page = AdminDirectory.Users.list({
        //domain: 'domain.com',
        customer: 'my_customer',
        orderBy: 'givenName',
        maxResults: 500,
        pageToken: pageToken
      });
      var users = page.users;
  
  
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        count++; sum++;
  
        try {
          var office = user.addresses[0].formatted;
        } catch (err) {
          var office = " | ";
        }
  
        if (user.phones != undefined) {
          if (user.phones[0].type == "work") {
            var phone = user.phones[0].value
          }
        } else {
          var phone = ""
        }
        
        // Address(Work): Country | Site || Country - Site
        if (office != undefined) {
          if (office.indexOf(" | ") > -1)
          {
            var country = office.split(" |")[0]
            var site = office.split("| ")[1]
          }
          else if (office.indexOf(" - ") > -1){
            var country = office.split(" -")[0]
            var site = office.split("- ")[1]
          }
  
        } else {
          var site = ""
          var country = ""
        }
  
        if (country_define.indexOf(site) > -1){
          var temp_country_define = country;
          country = site
          site = temp_country_define
        }
  
        if (country.indexOf("Brazil") > -1) {
          region = "Americas"
          reg_code = "444"
        } 
        
        else if (country.indexOf("Australia") > -1) {
          region = "Oceania"
          reg_code = "333"
        } 
        
        else if (country.indexOf("India") > -1) {
          region = "Asia"
          reg_code = "222"
        } 
             
         else if (country.indexOf("France") > -1) {
          region = "Europe"
          reg_code = "111"
        } 
          
        else {
          region = ""
          reg_code = ""
        }
  
        if (region != "Europe") {
          var city = site.split(" (")[0]
        } else {
          var city = ""
        }
  
        if (user.aliases != undefined) {
          var portal = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "domaina.com") {
              var portal = "Yes"
            }
          }
          if (portal == undefined) {
            var portal = ""
          };
        }
  
        if (user.aliases != undefined) {
          var b = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "domainbcom") {
              var b = "Yes"
            }
          }
          if (portal == undefined) {
            var b = ""
          };
        }
  
        if (user.aliases != undefined) {
          var c = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "a.domainb.com") {
              var c = "Yes"
            }
          }
          if (c == undefined) {
            var c = ""
          };
        }
  
        if (user.aliases != undefined) {
          var d = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "b.domainb.com") {
              var d = "Yes"
            }
          }
          if (d == undefined) {
            var d = ""
          };
        }
  
        if (user.aliases != undefined) {
          var e = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "c.domainb.com") {
              var e = "Yes"
            }
          }
          if (e == undefined) {
            var e = ""
          };
        }
  
  
        if (user.aliases != undefined) {
          var ea = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "a.domainc.com") {
              var ea = "Yes"
            }
          }
          if (ea == undefined) {
            var ea = ""
          };
        }
  
        if (user.aliases != undefined) {
          var eb = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "b.domainc.com") {
              var eb = "Yes"
            }
          }
          if (eb == undefined) {
            var eb = ""
          };
        }
  
        if (user.aliases != undefined) {
          var ec = ""
          for (var n = 0; n < user.aliases.length; n++) {
            var ua = user.aliases[n];
            count++;
            var uasplit = ua.split("@")[1]
            if (uasplit == "c.domainc.com") {
              var ec = "Yes"
            }
          }
          if (ec == undefined) {
            var ec = ""
          };
        }
  
        /*try{
          if(usercomanizations[0].title != undefined){
            var title = usercomanizations[0].title
          }else{
          var title = ""
          }
        } catch(error)
        {
          var title = error
        }*/
  
        try {
          var title = usercomanizations[0].title
        } catch (error) {
          var title = ""
        }
  
        if (usercomUnitPath == "/AdditionalServices") {
          var addservice = "Yes"
        } else {
          var addservice = ""
        }
  
        /*try{
          if(usercomanizations[0].description != undefined){
            var description = usercomanizations[0].description
          }else{
          var description = ""
          }
        } catch(error)
        {
          var description = error
        }*/
  
        try {
          var description = usercomanizations[0].description
        } catch (error) {
          var description = ""
        }
  
        if (description == "...") {
          var acc_type = "VIP"
        } else {
          var acc_type = "Staff"
        }
  
        try {
          var division_depart = usercomanizations[0].department;
        } catch (err) {
          var division_depart = " | ";
        }
  
        if (division_depart != undefined) {
          var division = division_depart.split(" |")[0]
          var department = division_depart.split("| ")[1]
        } else {
          var division = ""
          var department = ""
        }
  
        try {
          var cost_centre = usercomanizations[0].costCenter;
        } catch (err) {
          var cost_centre = "-";
        }
  
        try {
          var employeeID = user.externalIds[0].value;
        } catch (err) {
          var employeeID = "...";
        }
  
        if (cost_centre != undefined) {
          var office_type_z = cost_centre.split("-")[1]
        } else {
          var office_type_z = ""
        }
  
        if (office_type_z == "AAA") {
          var office_type = "A"
        } else {
          var office_type = "B"
        }
  
        listArray.push([count, acc_type, user.name.givenName, user.name.familyName, region, reg_code, country, site, city, title, description, user.primaryEmail, employeeID, phone, division, department, cost_centre, office_type, alias_a, b, c, d, e, f, g, h, addservice, new Date(user.creationTime), new Date(user.lastLoginTime), user.suspended == true ? "Suspended" : "Currently Active", user.id]);
  
  
      }
      pageToken = page.nextPageToken;
  
    } while (pageToken);
  
    try {
      var outputSheet = ss.getSheetByName('UserDetails');
      outputSheet.getDataRange();
    } catch (err) {
      var outputSheet = ss.insertSheet('UserDetails', 0);
      outputSheet.insertRows(1000,1000);
    }
    
    // Set string column
    var column = outputSheet.getRange("F2:F");
    column.setNumberFormat("@");
    
    while (outputSheet.getMaxRows() <= (sum + 1)) {
      outputSheet.insertRowAfter(outputSheet.getLastRow());}
  
    outputSheet.clear();
    
    outputSheet.getRange(1, 1, listArray.length, listArray[0].length).setValues(listArray);
  
    outputSheet.getRange(1, 1, 1, outputSheet.getLastColumn()).setBorder(true, true, true, true, true, true).setBackground("#CCA").setFontWeight("bold").setHorizontalAlignment("left");
    outputSheet.setFrozenRows(1);
    outputSheet.getRange(2, 1, listArray.length, listArray[0].length).sort([{ column: 7, ascending: true }, { column: 8, ascending: true }]);
    outputSheet.getRange(2, 1, listArray.length, listArray[0].length).setHorizontalAlignment("left");
  }
  