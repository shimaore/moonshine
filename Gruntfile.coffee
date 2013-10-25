module.exports = (grunt) ->

  pkg = grunt.file.readJSON 'package.json'
  pkg.name = pkg.name.replace /-browserify$/, ''

  grunt.initConfig
    pkg: pkg

    browserify:
      dist:
        options:
          transform: ['coffeeify']
          noParse: ['bower_components/coffeecup.js/index.js'] # coffeecup conditionally requires stylus
        files:
          'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.coffee.md'

    clean:
      dist: ['lib/', 'dist/']
      modules: ['node_modules/', 'bower_components/']

    uglify:
      dist:
        files:
          # Uglify creates invalid content ("Syntax Error").
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'

  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', 'clean:dist browserify'.split ' '
