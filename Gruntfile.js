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
            tests: ['myHybridAppFolder','cordova']
        },
        cordovacli: {
            options: {
                path: 'myHybridAppFolder'
            },
            cordova: {
                options: {
                    command: ['create','platform','plugin','build'],
                    platforms: ['ios','android'],
                    plugins: ['device','dialogs'],
                    path: 'cordova',
                    id: 'io.cordova.hellocordova',
                    name: 'HelloCordova'
                }
            },
            cordova2: {
                options: {
                    command: ['create','platform','plugin'],
                    platforms: ['ios'],
                    plugins: [],
                    path: 'cordova',
                    id: 'io.cordova.hellocordova',
                    name: 'HelloCordova'
                }
            },
            create: {
                options: {
                    command: 'create',
                    id: 'com.myHybridApp', //optional
                    name: 'myHybridApp'    //optional
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',                  //valid actions for command platform are add , remove, rm
                    platforms: ['ios', 'android']          //valid platforms for command platform are ios, android, blackberry10, wp8, wp7
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',                  //valid actions for command plugin are add , remove, rm
                    plugins: [                      //plugins are fetched from cordova registry plugins.cordova.io
                        'battery-status',
                        'camera',
                        'console',
                        'contacts',
                        'device',
                        'device-motion',
                        'device-orientation',
                        'dialogs',
                        'file',
                        'file-transfer',
                        'geolocation',
                        'globalization',
                        'inappbrowser',
                        'media',
                        'media-capture',
                        'network-information',
                        'splashscreen',
                        'vibration'
                    ]
                }
            },
            add_plugins_test: {
                options: {
                    command: 'plugin',
                    action: 'add',                  //valid actions for command plugin are add , remove, rm
                    plugins: [                      //plugins are fetched from Apache Foundation Repo https://git-wip-us.apache.org/repos/asf/
                        'battery-status',
                        '../test_plugins/org.apache.cordova.camera'

                    ]
                }
            },
            build: {
                options: {
                    command: 'build',
                    platforms: ['ios', 'android']
                }
            },
            emulate_android: {
                options: {
                    command: 'emulate',
                    platforms: ['android']
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
    grunt.registerTask('test', ['clean', 'cordovacli:create', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
