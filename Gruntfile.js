module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Concatenate the JavaScripts!
    uglify: {
      build: {
        options: {
          beautify: false,
          mangle: true
        },
        files: {
          'js/build/main.min.js': ['js/jquery-*.js','js/libs/*.js', 'js/main.js']
        }
      }
    },
    // Crunch the images!
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    // Compile Sass!
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'auto',
        },
        files: {
          'css/main.css': 'sass/main.scss'
        }
      }
    },
    // Autoprefix so I don't have to!
    autoprefixer: {
      dist: {
        files: {
          'css/main.css': 'css/main.css'
        }
      }
    },
    // Watch for changes!
    watch: {
      options: {
        spawn: false // Very important, don't miss this
      },
      scripts: {
        files: ['js/libs/*.js', 'js/main.js'],
        tasks: ['uglify']
      },
      images: {
        files: 'images/*.{png,jpg,gif}',
        tasks: ['imagemin']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    },
    // Inject changes into the browser!
    browserSync: {
      dev: {
        bsFiles: {
          src : [
          'css/*.css',
          'js/**/*.js',
          'images/*.{png,jpg,gif}',
          '**/*.html'
          ]
        },
        options: {
          open: false,
          watchTask: true,
          server: "./"
        }
      }
    }
  });

  // Load the required plugins
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task
  grunt.registerTask('default', ['uglify', 'imagemin', 'sass', 'autoprefixer']);
  // Watch tasks
  grunt.registerTask('listen', ['browserSync', 'watch']);
};