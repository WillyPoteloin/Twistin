var express = require('express');
var multer  = require('multer');

var app = express();

var router = express.Router();

var multerParser = multer({ dest: './public/uploads/'});

router.post('/', multerParser, function(req, res, next) {
	if(req.files.file !== undefined) {
		res.json(req.files.file);
	}
	else {
		res.send('nok');
	}
});

module.exports = router;