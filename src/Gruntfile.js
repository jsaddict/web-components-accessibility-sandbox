/*
 * web-components-accessibility
 *
 * Copyright (c) 2013 Marcy Sutton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  
  // Project configuration.
  grunt.initConfig({
    config: {
      src: 'src',
      dist: './dist'
    },
    sass: {
      dist: {
        files: {
          '<%= config.dist %>/styles/main.css' : '<%= config.src %>/styles/main.sass'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    browserify: {
      basic: {
        src: ['<%= config.src %>/scripts/{,*/}*.js', '<%= config.src %>/scripts/{,*/}*.coffee'],
        options: {
          transform: ['coffeeify'],
          extensions: ['.js', '.coffee']
        },
        dest: '<%= config.dist %>/scripts/main.js'
      }
    },
    connect: {
      options: {
        port: 8888,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= config.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            'test',
            '<%= config.src %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= config.dist %>'
        }
      }
    },
    jade: {
      html: {
        files: {
          '<%= config.dist %>':['<%= config.src %>/templates/*.jade', '<%= config.src %>/templates/!_*.jade']
        },
        options: {
          client: false,
          basePath: '<%= config.src %>/templates',
          pretty: true
        }
      }
    },
    watch: {
      coffee: {
        files: ['<%= config.src %>/scripts/{,*/}*.coffee'],
        tasks: ['browserify']
      },
      sass: {
        files: ['<%= config.src %>/styles/{,*/}/*.{scss,sass}'],
        tasks: ['sass']
      },
      jade: {
        files: [
          '<%= config.src %>/templates/*.jade',
          '<%= config.src %>/templates/**/*.jade'
        ],
        tasks: 'jade'
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/*.html',
          '<%= config.dist %>}/styles/{,*/}*.css',
          '{.tmp,<%= config.dist %>}/scripts/{,*/}*.js',
          '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },   
    concurrent: {
      server: [
        'sass',
        'browserify',
        'jade'
      ],
      test: [
        'sass'
      ],
      dist: [
        'sass',
        'browserify',
        'jade'
      ]
    }
  });
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'clean',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'clean',
    'concurrent:dist'
  ]);
};