module.exports = config:
	paths:
		watched: ['brunch-config.coffee', 'app/modules', 'app/js', 'app/css', 'app/styles', 'app/assets']
	modules:
		wrapper: false
	optimize: true
	files:
		javascripts:
			joinTo:
				'libraries.js': /^(bower_components|app\/js)/
				'app.js': /^(app\/modules\/[^\/]*\.js)/
				'manager.js': /^(app\/modules\/manager)/
		stylesheets:
			joinTo:
				'libraries.css': /^(bower_components|app\/css)/
				'app.css': /^(app\/styles\/)/
	plugins:
		# off: ['browser-sync-brunch']
		# browserSync:
		# 	port: 81
		# 	scriptPath: (path) -> "http://twistin.fr:1281"+path;
		sass:
			allowCache: true
		uglify:
			ignored: /^public\/(app|manager).js/
		postcss:
			processors: [
				require('autoprefixer')
			]
