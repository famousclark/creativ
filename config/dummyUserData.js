const User = require('../models/home');


module.exports = function () {
  User.estimatedDocumentCount().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({
    	name: 'famous',
    	mail: 'fclark2@u.rochester.edu',
    	password: 'taco'
    });

    User.create([user1], (error) => {
      if (!error) {
        console.log('Ready to go!');
      }else {
        console.log('Something went wrong...');
      }
    });
  });
}
