var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
	nom: String,
	description: String,
	url: String,
	media: mongoose.Schema.Types.ObjectId,
	img: String,
	followerSource: Number,
	followerTwistin: Number,
	nbRefus: Number,
	dateAjout: { type: Date, default: Date.now },
	dateMaj: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Channel', channelSchema);