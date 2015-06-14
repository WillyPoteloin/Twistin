var mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema({
	nom: String,
	url: String,
	img: String,
	nbChaine: Number,
});

module.exports = mongoose.model('Media', mediaSchema);