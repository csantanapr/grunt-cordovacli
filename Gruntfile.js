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
            tests: ['tmp', '.cordova', 'myHybridAppFolder']
        },
        cordovacli: {
            options: {
                path: 'myHybridAppFolder'
            },
            create: {
                options: {
                    command: 'create',
                    id: 'com.myHybridApp', //optional
                    name: 'myHybridApp'    //optional
                }
            },
            /* I think there is a bug in cordova cli that doesn't handle running in parallel
               Doing individual add platform to work around problem
            add_platform: {
                options: {
                    command: 'platform',
                    action: 'add',                  //valid actions for command platform are add , remove, rm
                    platforms: ['ios', 'android', 'blackberry10', 'wp8']          //valid platforms for command platform are ios, android, blackberry10, wp8, wp7
                }
            },
            */
            add_platform_ios: {
                options: {
                    command: 'platform',
                    action: 'add',                  //valid actions for command platform are add , remove, rm
                    platforms: ['ios']          //valid platforms for command platform are ios, android, blackberry10, wp8, wp7
                }
            },
            add_platform_android: {
                options: {
                    command: 'platform',
                    action: 'add',                  //valid actions for command platform are add , remove, rm
                    platforms: ['android']          //valid platforms for command platform are ios, android, blackberry10, wp8, wp7
                }
            },
            /* I think there is a bug in cordova cli that doesn't handle running in parallel
               Doing individual add plugin to work around problem
            add_plugin: {
                options: {
                    command: 'plugin',
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
            */
            add_plugin_vibration: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'vibration']
                }
            },
            add_plugin_device_orientation: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'device-orientation']
                }
            },
            add_plugin_network_information: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'network-information']
                }
            },
            add_plugin_device: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'device']
                }
            },
            add_plugin_contacts: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'device']
                }
            },
            add_plugin_media_capture: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'media-capture']
                }
            },
            add_plugin_inappbrowser: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'inappbrowser']
                }
            },
            add_plugin_globalization: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'globalization']
                }
            },
            add_plugin_geolocation: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'geolocation']
                }
            },
            add_plugin_dialogs: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'dialogs']
                }
            },
            add_plugin_file: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [ 'file']
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios']
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
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
