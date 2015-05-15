var express = require('express');
var auth = require('http-auth');

// connexion à la base de données
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twistin', {user:"twistin", pass:"Raz0rlight."}, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();

// on créer las paramètres pour l'authentification
var basic = auth.basic({
    realm: "Identification requise !",
    file: __dirname + "/.htpasswd"
});
app.use(auth.connect(basic));

var channels = require(__dirname + '/app/routes/channels');
app.use('/channels', channels);
var videos = require(__dirname + '/app/routes/videos');
app.use('/videos', videos);
var medias = require(__dirname + '/app/routes/medias');
app.use('/medias', medias);

app.use('/', express.static(__dirname + '/public/'));
app.use('/manager', express.static(__dirname + '/public/manager'));

app.listen(3333);