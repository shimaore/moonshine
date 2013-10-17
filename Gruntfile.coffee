module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # Will include bower.json's packages into config.js
    bower:
      target:
        rjsConfig: 'app/config.js'

    # Will compile CoffeeScript into Javascript
    coffee:
      compile:
        options:
          sourceMap: true
        files: [{
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['*.coffee.md','*.coffee'],
          dest: 'lib/',
          ext: '.js'
        }]

    # Build single include
    requirejs:
      compile:
        options:
          name: '<%= pkg.name %>'
          baseUrl: 'lib/'
          mainConfigFile: 'app/config.js'
          out: 'build/<%= pkg.name %>.min.js'

    clean:
      build: ['lib/', 'build/']
      all: ['lib/', 'build/', 'node_modules/', 'bower_components/']

  grunt.loadNpmTasks 'grunt-bower-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.registerTask 'default', 'clean:build bower coffee requirejs'.split ' '
