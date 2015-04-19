var express = require('express');
var auth = require('http-auth');

// connexion à la base de données
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twistin', function(err) {
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

app.use('/', express.static(__dirname + '/public/'));

app.listen(3333);