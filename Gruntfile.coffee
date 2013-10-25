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
        'src/common.js': (fs,fd,done) ->
          fs.writeSync fd,"""
            module.exports = require("./#{pkg.name}.coffee.md").#{pkg.name};
          """
          done()


    browserify:
      dist:
        options:
          transform: ['coffeeify','debowerify','decomponentify', 'deamdify', 'deglobalify']
          noParse: ['node_modules/coffeecup/lib/coffeecup.js'] # coffeecup conditionally requires stylus
        files:
          'dist/<%= pkg.name %>.js': 'src/loader.js'
          'dist/<%= pkg.name %>-common.js': 'src/common.js'

    clean:
      dist: ['lib/', 'dist/', 'src/loader.js']
      modules: ['node_modules/', 'bower_components/']

    uglify:
      dist:
        files:
          # Uglify creates invalid content ("Syntax Error").
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'

  grunt.loadNpmTasks 'grunt-file-creator'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', 'clean:dist file-creator:loader browserify'.split ' '
