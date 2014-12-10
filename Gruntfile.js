module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
          
        separator: '; \n /****/ \n'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'js/main.js'
      }
    },
        watch: {
      files: ['src/js/*.js'],
      tasks: ['concat'],
            options:{
         livereload:true   
        }
    }
  });

    
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [ 'concat', 'watch']);

};