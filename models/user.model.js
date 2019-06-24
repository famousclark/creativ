//load the things we need
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//define the schema for our user model
const userSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,

	name:  {
    type: String,
    required: 'Full name can\'t be empty'
  },

	email:  {
    type: String,
    required: 'Email can\'t be empty',
  },

  password: {
    type: String,
    required: 'Password name can\'t be empty',
    minlength : [4,'Password must be at least 4 character long']
  },

  date: {
  	type: Date,
    default: Date.now
  },

	roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],

	profile:{
		ownedBuckets: [{ type : Schema.Types.ObjectId, ref: 'Bucket'}]
	}
});


//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};
//custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
