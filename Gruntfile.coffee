module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # Will compile CoffeeScript into Javascript
    coffee:
      compile:
        options:
          sourceMap: true
        files: [
          expand: true
          flatten: true
          src: ['src/*.coffee.md']
          dest: 'lib/'
          ext: '.js'
        ]

    concat:
      build:
        src: ['lib/*.js']
        dest: 'build/<%= pkg.name %>.js'

    clean:
      build: ['lib/', 'build/']
      all: ['lib/', 'build/', 'node_modules/', 'bower_components/']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.registerTask 'default', 'clean:build coffee concat'.split ' '
