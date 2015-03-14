module.exports = config:
  files:
    javascripts: joinTo:
    	'app.js': /(bower_components|app\/js)/
    stylesheets: joinTo:
    	'app.css': /(bower_components|app\/styles)/
