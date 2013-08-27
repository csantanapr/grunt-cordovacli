/*
 * grunt-cordovacli
 * https://github.com/csantana23/grunt-cordovacli
 *
 * Copyright (c) 2013 Carlos Santana
 * Licensed under the Apache-2.0 license.
 */
/*global module */




module.exports = function (grunt) {
    'use strict';

  // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        cordovatest: {
            default_options: {
                options: {
                },
                files: {
                    'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            },
            custom_options: {
                options: {
                    separator: ': ',
                    punctuation: ' !!!'
                },
                files: {
                    'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            }
        },
        cordovacli: {
            create: {
                options: {
                    command: 'create',
                    path: 'myHybridAppFolder',
                    id: 'com.myHybridApp', //optional
                    name: 'myHybridApp'    //optional
                }
            },
            add_platform: {
                options: {
                    command: 'platform',
                    path: 'myHybridAppFolder',
                    action: 'add',                  //valid actions for command platform are add , remove, rm
                    platforms: ['ios', 'android']          //valid platforms for command platform are ios, android, blackberry10, wp8, wp7
                }
            },
            add_plugin: {
                options: {
                    command: 'plugin',
                    path: 'myHybridAppFolder',
                    action: 'add',                  //valid actions for command plugin are add , remove, rm
                    plugins: [                      //plugins are fetched from Apache Foundation Repo https://git-wip-us.apache.org/repos/asf/
                        'vibration',
                        'device-orientation',
                        'network-information',
                        'device',
                        'contacts',
                        'media-capture',
                        'inappbrowser',
                        'globalization',
                        'geolocation',
                        'file',
                        'dialogs'
                    ]
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    path: 'myHybridAppFolder',
                    platforms: ['ios']
                }
            },
            build_all: {
                options: {
                    command: 'build',
                    path: 'myHybridAppFolder'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'cordovatest', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
