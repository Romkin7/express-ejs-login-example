const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	loggedIn: {type: Boolean, default: false}
},
{
	timestamps: true
});

UserSchema.pre('save', function(next) {
	let user = this;
  	if (!user.isModified('password')) return next();
  	bcrypt.genSalt(10, function(err, salt) {
    	if (err) return next(err);
    	console.log(user.password, salt);
    	bcrypt.hash(user.password, salt, function(err, hash) {
      	if (err) return next(err);
      	user.password = hash;
      	next();
    });
  });
});

//compare password in the database and the one that the user types in
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);