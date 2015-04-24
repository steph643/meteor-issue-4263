//---------------------------------

if (Meteor.isServer)
  Meteor.users.remove({});

//---------------------------------

Meteor.methods({

  // Create a user account
  createJohnAccount: function () {
    Accounts.createUser({
      username: 'john',
      email   : 'john@g.com',
      password: '123456'
    });
  },

  // Delete the current user then do something funny
  removeUser: function () {
    // Delete the current user
    console.log('BEGIN - deleteUser: about to remove user ' + this.userId);
    Meteor.users.remove(this.userId);
    console.log('END   - deleteUser: user has now been removed');

    // HERE DO ANYTHING INVOLVING THE Meteor.users COLLECTION, such as a
    // Meteor.users.update() or this one:
    this.setUserId(null);
  }
});

//---------------------------------

// On client...
if (Meteor.isClient) {
  Meteor.startup(function () {
    // create a user...
    Meteor.call('createJohnAccount', function (error, result) {
      // then log him in...
      Meteor.loginWithPassword('john', '123456', function (error) {
        // then remove him...
        console.log('Calling "removeUser"...');
        Meteor.call('removeUser');
      });
    });
  });
}

//---------------------------------