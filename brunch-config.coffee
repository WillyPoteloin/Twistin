module.exports = config:
	paths:
		watched: ['app']
	modules:
		wrapper: false
	server: 
		run: yes
		base: '/public'
	optimize: true
	files:
		javascripts:
			joinTo:
				'libraries.js': /^(bower_components)/
				'app.js': /^(app\/)/
			order:
				before: ['app/module.js']
		stylesheets:
			joinTo:
				'libraries.css': /^(bower_components)/
				'app.css': /^(app\/styles\/)/
	plugins:
		sass:
			allowCache: true
		uglify:
			ignored: /^public\/app.js/
