module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		mochaTest: {
			all: {
				src: ['test/*.test.js']
			}
		}	
	});

	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('test', ['mochaTest']);
};
