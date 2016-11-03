module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean:{
            build: ["build"]
        },
        copy: {
            build_dist: {
                files: [
                    {
                        "expand":true,
                        "cwd":"node_modules/",
                        "src":["angular/angular.js", "angular-animate/angular-animate.min.js", "angular-messages/angular-messages.min.js", "angular-sanitize/angular-sanitize.min.js"],
                        "dest":"sample-apps/js"
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);

    //grunt.registerTask('enspire:build',['clean:server_build','copy:build_dist']);
};