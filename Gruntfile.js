module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 8080
        }
      }
    },
    watch: {
      options: {livereload: true},
      files: ["./*.js", "./*.css", "./*.html"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);
};
