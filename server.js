var express = require('express');
var auth = require('http-auth');

var app = express();

// on créer las paramètres pour l'authentification
var basic = auth.basic({
    realm: "Identification requise !",
    file: __dirname + "/.htpasswd"
});
app.use(auth.connect(basic));

app.use('/', express.static(__dirname + '/public/'));

app.listen(3333);