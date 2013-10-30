/*
 * grunt-cordovacli
 * https://github.com/csantana23/grunt-cordovacli
 *
 * Copyright (c) 2013 Carlos Santana
 * Licensed under the Apache-2.0 license.
 */
/*global module */
var path = require('path');

module.exports = function (grunt) {
    'use strict';

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var runCordova,
        runCordovaParallel,
        runCordovaSeries,
        cordova_json = path.join(__dirname,'../node_modules','cordova','package.json'),
        cordova_pkg = grunt.file.readJSON(cordova_json);
        grunt.log.writeln('Using cordova CLI version (' + cordova_pkg.version + ') ');

    runCordova = function (args, opts, done) {
        var cordova_cli = path.join(__dirname,'../node_modules','cordova', cordova_pkg.bin.cordova);


        grunt.log.writeln('Running: cordova' + args.join(' '));
        grunt.util.spawn(
            {
                "cmd": cordova_cli,
                "args": args,
                "opts": opts
            },
            function (err, result) {
                if (err) {
                    grunt.log.error(err);
                } else {
                    grunt.log.success('Done-> ' + cordova_cli + ' ' + args.join(' '));
                }
                done(err, result);
            }
        );
    };
    runCordovaParallel = function (tasks, done) {
        grunt.util.async.parallel(tasks, function (err, result) {
            if (err) {
                grunt.log.writeln('Error-> with Parallel tasks' + err);
                done(false);
            } else {
                grunt.log.writeln('Success-> with Parallel tasks');
                done();
            }
        });
    };
    runCordovaSeries = function (tasks, done) {
        grunt.util.async.series(tasks, function (err, result) {
            if (err) {
                grunt.log.writeln('Error-> with Series tasks' + err);
                done(false);
            } else {
                grunt.log.writeln('Success-> with Series tasks');
                done();
            }
        });
    };

    grunt.registerMultiTask('cordovacli', '"Wraps a web application as a hybrid app with Cordova CLI"', function () {
    // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            path: 'cApp',
            name: 'Hello',
            id: 'com.hello',
            plugin_path_ext: '.git',
            plugin_base_path: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-',
            plugin_path: false

        }),
            done = this.async(),
            msg = '',
            args = [],
            cmd_opts =  {},
            tasks = [];


        if (options.command !== "create") {
            grunt.log.writeln('Setting Current Working Directory (CWD) to ' + options.path);
            cmd_opts.cwd = options.path;
        }
        if (options.command === "create") {
            // compose create command
            // cordova create <PATH> [ID] [NAME]
            args = [options.command, options.path, options.id, options.name];
            runCordova(args, cmd_opts, done);
        } else if (options.command === "platform" && options.platforms) {
            //platform(s) [{add|remove|rm} <PLATFORM>]
            tasks = [];
            tasks.length = 0;
            options.platforms.forEach(function (p) {
                var f;
                f = function (callback) {
                    runCordova([options.command, options.action, p ], cmd_opts, callback);
                };
                tasks.push(f);
            });
            runCordovaParallel(tasks, done);
        } else if (options.plugins) {
            //plugin(s) [{add|remove|rm} <PATH|URI>]
            tasks = [];
            tasks.length = 0;
            options.plugins.forEach(function (p) {
                var f;
                if (options.plugin_path === false) {
                    p = options.plugin_base_path + p + options.plugin_path_ext;
                }
                f = function (callback) {
                    runCordova([options.command, options.action, p ], cmd_opts, callback);
                };
                tasks.push(f);
            });
            runCordovaSeries(tasks, done);
        } else {
            if (options.platforms) {
                tasks = [];
                tasks.length = 0;
                options.platforms.forEach(function (p) {
                    var f;
                    f = function (callback) {
                        if (options.command === "serve" && options.port) {
                            runCordova([options.command, p, options.port], cmd_opts, callback);
                        } else {
                            runCordova([options.command, p ], cmd_opts, callback);
                        }

                    };
                    tasks.push(f);
                });
                runCordovaParallel(tasks, done);

            } else {
                args = [options.command];
                if (options.command === "serve" && options.port) {
                    args.push(options.port);
                }
                runCordova(args, cmd_opts, done);
            }

        }


    });

};

