/**
 * Lists all the groups in the domain.
 */
 function listAllGroups() {
    var pageToken;
    var page;
    do {
      page = AdminDirectory.Groups.list({
        domain: 'worldmosquito.org',
        maxResults: 100,
        pageToken: pageToken
      });
      var groups = page.groups;
      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          Logger.log('%s (%s)', group.name, group.email);
        }
      } else {
        Logger.log('No groups found.');
      }
      pageToken = page.nextPageToken;
    } while (pageToken);
  }
  
  function listGroupMembers() {
    var group = GroupsApp.getGroupByEmail("abc@domain.com");
    console.log(group.getEmail() + ':');
    var users = group.getUsers();
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      console.log(user.getEmail());
    }
  }


  function getAllUsersInOrgRaw() {

    const  list = AdminDirectory.Users.list({
        customer: 'my_customer',
      })
    
    return list
    
  }
  
  function runsies(){
    console.log(getAllUsersInOrgRaw())
  }
  
  
  /**
   * Lists users in a G Suite domain.
   */
  function listUsers() {
    var optionalArgs = {
      customer: 'my_customer',
      maxResults: 500,
      orderBy: 'email'
    };
    var response = AdminDirectory.Users.list(optionalArgs);
    var users = response.users;
    if (users && users.length > 0) {
      Logger.log('Users:');
      for (i = 0; i < users.length; i++) {
        var user = users[i];
        Logger.log('%s (%s)', user.primaryEmail);
      }
    } else {
      Logger.log('No users found.');
    }
  }