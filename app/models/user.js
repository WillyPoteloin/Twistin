var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	channels: Array,
	cookies: Array,
	log: Array,
	dateInscrition: Date,
	derniereConnexion: Date,
	nbConnexion: Number,
});

module.exports = mongoose.model('User', userSchema);