module.exports = (grunt) ->

  pkg = grunt.file.readJSON 'package.json'

  grunt.initConfig
    pkg: pkg

    'file-creator':
      loader:
        'src/loader.js': (fs,fd,done) ->
          fs.writeSync fd,"""
            window.#{pkg.name} = require("./#{pkg.name}.coffee.md").#{pkg.name};
          """
          done()

    browserify:
      dist:
        options:
          transform: ['coffeeify','debowerify','decomponentify', 'deamdify', 'deglobalify']
          noParse: ['node_modules/coffeecup/lib/coffeecup.js'] # coffeecup conditionally requires stylus
        files:
          'build/<%= pkg.name %>.js': 'src/loader.js'

    clean:
      build: ['lib/', 'build/', 'src/loader.js']
      all: ['lib/', 'build/', 'node_modules/', 'bower_components/']

    uglify:
      build:
        files:
          # Uglify creates invalid content ("Syntax Error").
          'build/<%= pkg.name %>.min.js': 'build/<%= pkg.name %>.js'

  grunt.loadNpmTasks 'grunt-file-creator'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', 'clean:build file-creator:loader browserify'.split ' '
