module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    bower:
      target:
        rjsConfig: 'app/config.js'
    coffee:
      compile:
        options:
          sourceMap: true
        files:
          'lib/moonshine.js': ['src/moonshine.coffee.md']
          'lib/ccss.js': ['src/ccss.coffee']
    requirejs:
      compile:
        options:
          name: 'moonshine'
          baseUrl: 'lib/'
          mainConfigFile: 'app/config.js'
          out: 'lib/moonshine.optimized.js'
    concat:
      dist:
        src: ['lib/ccss.js', 'lib/moonshine.js']
        dest: 'build/<%= pkg.name %>.js'
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        src: 'lib/<%= pkg.name %>.js'
        dest: 'build/<%= pkg.name %>.min.js'

  grunt.loadNpmTasks 'grunt-bower-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'
  # grunt.loadNpmTasks 'grunt-contrib-concat'
  # grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', 'bower coffee requirejs'.split ' '
