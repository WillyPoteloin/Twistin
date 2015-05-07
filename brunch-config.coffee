module.exports = config:
	paths:
		watched: ['app']
	modules:
		wrapper: false
	optimize: true
	files:
		javascripts:
			joinTo:
				'libraries.js': /^(bower_components|app\/js)/
				'app.js': /^(app\/modules\/.*\.js)/
				'manager.js': /^(app\/modules\/manager)/
		stylesheets:
			joinTo:
				'libraries.css': /^(bower_components|app\/css)/
				'app.css': /^(app\/styles\/)/
	plugins:
		sass:
			allowCache: true
		uglify:
			ignored: /^public\/app.js/
