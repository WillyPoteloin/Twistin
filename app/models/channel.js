var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
	nom: String,
	description: String,
	urlSource: String,
	media: mongoose.Schema.Types.ObjectId,
	followerSource: Number,
	followerTwistin: Number,
	nbRefus: Number,
	dateMaj: { type: Date, default: Date.now },
	dateAjout: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Channel', channelSchema);