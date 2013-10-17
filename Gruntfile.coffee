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
        files:
          'lib/moonshine.js': ['src/moonshine.coffee.md']
          'lib/ccss.js': ['src/ccss.coffee']

    # Build single include
    requirejs:
      compile:
        options:
          name: 'moonshine'
          baseUrl: 'lib/'
          mainConfigFile: 'app/config.js'
          out: 'lib/moonshine.min.js'

    clean:
      build: ['lib/']
      all: ['node_modules/', 'bower_components/']

  grunt.loadNpmTasks 'grunt-bower-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.registerTask 'default', 'clean:build bower coffee requirejs'.split ' '
