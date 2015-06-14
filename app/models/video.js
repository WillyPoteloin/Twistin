var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	channelId: mongoose.Schema.Types.ObjectId,
	nom: String,
	description: String,
	img: String,
	vueSource: Number,
	vueTwistin: Number,
	codeLecteur: String,
	url: String,
	dateAjout: { type: Date, default: Date.now },
	dateMaj: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);