module.exports = config:
	files:
		javascripts: joinTo:
			'app.js': /(bower_components|app\/js\/)/
		stylesheets: joinTo:
			'libraries.css': /(bower_components)/
			'app.css': /(app\/styles\/)/
	optimize: true
	plugins:
		sass:
			allowCache: true