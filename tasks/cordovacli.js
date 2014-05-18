/*
 * grunt-cordovacli
 * https://github.com/csantana23/grunt-cordovacli
 *
 * Copyright (c) 2013 Carlos Santana
 * Licensed under the Apache-2.0 license.
 */
/*global module */
var path = require('path'),
    os   = require('os');

module.exports = function (grunt) {
    'use strict';

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var runCordova,
        runCordovaParallel,
        runCordovaSeries,
        runFullCycle,
        runCreate,
        runPlatform,
        runPlugin,
        cordova_path = path.dirname(require.resolve('cordova')),
        cordova_json = path.join(cordova_path,'package.json'),
        cordova_pkg = grunt.file.readJSON(cordova_json),
        cordova_plugins_map = {
            'battery-status':      'org.apache.cordova.battery-status',
            'camera':              'org.apache.cordova.camera',
            'console':             'org.apache.cordova.console',
            'contacts':            'org.apache.cordova.contacts',
            'device':              'org.apache.cordova.device',
            'device-motion':       'org.apache.cordova.device-motion',
            'device-orientation':  'org.apache.cordova.device-orientation',
            'dialogs':             'org.apache.cordova.dialogs',
            'file':                'org.apache.cordova.file',
            'file-transfer':       'org.apache.cordova.file-transfer',
            'geolocation':         'org.apache.cordova.geolocation',
            'globalization':       'org.apache.cordova.globalization',
            'inappbrowser':        'org.apache.cordova.inappbrowser',
            'media':               'org.apache.cordova.media',
            'media-capture':       'org.apache.cordova.media-capture',
            'network-information': 'org.apache.cordova.network-information',
            'splashscreen':        'org.apache.cordova.splashscreen',
            'vibration':           'org.apache.cordova.vibration'
        };
    runCordova = function (args, opts, done) {
        var cordova_cli, spawn_cmd;

        cordova_cli = path.join(cordova_path, cordova_pkg.bin.cordova);
        opts.stdio = 'inherit';
        spawn_cmd = {
                "cmd": cordova_cli,
                "args": args,
                "opts": opts
        };

        if (os.platform() === 'win32') {
            spawn_cmd.cmd = 'node';
            spawn_cmd.args = [cordova_cli].concat(args);
        }

        grunt.log.writeln('Running:' + spawn_cmd.cmd + ' ' + spawn_cmd.args.join(' '));
        var child = grunt.util.spawn(spawn_cmd,
            function (err, result) {
                if (err) {
                    grunt.log.error(err);
                } else {
                    grunt.log.success('Done-> cordova ' + args.join(' '));
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

    runCreate = function (options, done) {
        // cordova create <PATH> [ID] [NAME]
        var args = ['create', options.path, options.id, options.name].concat(options.args);
        runCordova(args, {}, done);
    };
    runPlatform = function (options, done) {
        //platform(s) [{add|remove|rm} <PLATFORM>]
            var tasks = [];
            tasks.length = 0;
            options.platforms.forEach(function (p) {
                var f;
                f = function (callback) {
                    runCordova(['platform', options.action, p ].concat(options.args), {cwd:options.path}, callback);
                };
                tasks.push(f);
            });
            runCordovaParallel(tasks, done);
    };

    runPlugin = function (options, done) {
        //plugin(s) [{add|remove|rm} <PATH|URI>]
            var tasks = [];
            tasks.length = 0;

            if(grunt.util.kindOf(options.plugins) !== 'array'){
                options.plugins = [options.plugins];
            }

            options.plugins.forEach(function (p) {
                var f;
                if(cordova_plugins_map[p]){
                    p = cordova_plugins_map[p];
                }
                f = function (callback) {
                    runCordova(['plugin', options.action, p ].concat(options.args), {cwd:options.path}, callback);
                };
                tasks.push(f);
            });
            runCordovaSeries(tasks, done);
    };

    runFullCycle = function (commands, options, done){
        var tasks = [];
        commands.forEach(function(command){
            if(command === 'create'){
                tasks.push(function (cb){runCreate(options,cb);});
            } else if (command === 'platform'){
                options.action = 'add';
                tasks.push(function (cb){runPlatform(options,cb);});
            } else if (command === 'plugin' && options.plugins){
                options.action = 'add';
                tasks.push(function (cb){runPlugin(options,cb);});
            } else if (command === 'prepare' || command === 'compile' || command === 'build'){
                tasks.push(function (cb){runCordova([command].concat(options.args), {cwd:options.path}, cb);});
            }
        });
        runCordovaSeries(tasks,done);
    };

    grunt.registerMultiTask('cordovacli', '"Wraps a web application as a hybrid app with Cordova CLI"', function () {
    // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            path: 'HelloCordova',
            name: 'HelloCordova',
            id: 'io.cordova.hellocordova',
            args: []

        }),
            done = this.async(),
            msg = '',
            args = [],
            cmd_opts =  {},
            tasks = [],
            i;

        grunt.log.writeln('Using cordova CLI version (' + cordova_pkg.version + ') ');

        if (grunt.util.kindOf(options.command) === 'array'){
            // full cordova lifecycle
            return runFullCycle(options.command,options, done);
        }
        if (options.command !== "create") {
            grunt.log.writeln('Setting Current Working Directory (CWD) to ' + options.path);
            cmd_opts.cwd = options.path;
        }
        if (options.command === "create") {
            return runCreate(options,done);
        } else if (options.command === "platform") {
            return runPlatform(options, done);
        } else if (options.command === "plugin") {
            return runPlugin(options, done);
        } else {
            if (options.platforms) {
                tasks = [];
                tasks.length = 0;
                options.platforms.forEach(function (p) {
                    var f;
                    f = function (callback) {
                        if (options.command === "serve" && options.port) {
                            runCordova([options.command, p, options.port].concat(options.args), cmd_opts, callback);
                        } else {
                            runCordova([options.command, p ].concat(options.args), cmd_opts, callback);
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
                runCordova(args.concat(options.args), cmd_opts, done);
            }
        }
    });
};
