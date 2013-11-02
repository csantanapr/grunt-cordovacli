# grunt-cordovacli

> "Wraps a web application as a hybrid app with [Apache Cordova CLI 3.x](http://cordova.io)"

More information about the new [Apache Cordova 3.x Command-line Interface](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface)

````
Synopsis

    cordova command [options]

Global Commands

    create <PATH> [ID] [NAME] ............... creates a cordova project in the specified PATH, with
                                               optional NAME and ID (reverse-domain-style package name)

Project-Level Commands

    platform(s) [{add|remove|rm} <PLATFORM>] . add or remove a specified PLATFORM, OR
                                                list all installed, available and unavailable platforms
    plugin(s) [{add|remove|rm} <PATH|URI>|ID] ... add or remove a plugin from the specified PATH or URI, OR
                                                list all currently installed plugins
    prepare [PLATFORM.] ..................... copies files for specified platforms, or all platforms,
                                               so that the project is ready to build in each SDK.
    compile [PLATFORM.] ..................... builds the app for specified platforms, or all platforms
    build [PLATFORM..] ...................... shortcut for prepare, then compile
    emulate [PLATFORM..] .................... deploys app in specified (or all) platforms' emulator,
                                                opening emulator if necessary
    run [PLATFORM..] ........................ deploys app on specified (or all) platform devices, which
                                                must be properly connected and configured in each SDK
    serve <PLATFORM> [PORT] .................. runs a local web server for the specified platform's www/
                                                directory, with optional port number that defaults to 8000.
                                                (Note: you must edit the native code to reference the server)
````




## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cordovacli --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cordovacli');
```

## The "cordovacli" task
_Run this task with the `grunt cordovacli` command._

### Overview
In your project's Gruntfile, add a section named `cordovacli` to the data object passed into `grunt.initConfig()`.

### Usage Examples

```

cordovacli: {
    options: {
        path: 'myHybridAppFolder'
    },
    create: {
        options: {
            command: 'create',
            id: 'com.myHybridApp',
            name: 'myHybridApp'
        }
    },
    add_platforms: {
        options: {
            command: 'platform',
            action: 'add',
            platforms: ['ios', 'android']
        }
    },
    add_plugins: {
        options: {
            command: 'plugin',
            action: 'add',
            plugins: [
                'battery-status',
                'camera',
                'console',
                'contacts',
                'device',
                'device-motion',
                'device-orientation',
                'dialogs',
                'file',
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
            platforms: ['android'],
            args: ['--target','Nexus5']
        }
    }
}
```


### Options

#### options.command
Type: `String`
Valid values: `'create'` `'platform'` `'plugin'` `'build'` `'emulate'` `'prepare'` `'compile'` `'run'` `'serve'`

Specify the cordova command

#### options.id
Type: `String`
Default value: `'io.cordova.hellocordova'`
Use with Command: `'create'`

Specify the ID (reverse-domain-style package name) for the Cordova App

#### options.name
Type: `String`
Default value: `'HelloCordova'`
Use with Command: `'create'`

Specify the Name for the Cordova App

#### options.path
Type: `String`
Default value: `'HelloCordova'`

Specify the path to the Cordova project directory

#### options.action
Type: `String`
Valid value: `'add'` `'rm'` `'remove'`
Required for Commands: `'platform'`

Specify the action to perform

#### options.platforms
Type: `String` `'Array'`
Valid value: `'ios'` `'android'` `'blackberry10'` `'wp7'` `'wp8'`
Required for Commands: `'platform'`
Not Applicable for Commands: `'plugin'`
Optional for other commands

Specify the platform type

#### options.plugins
Type: `String` `'Array'`
Shortcut values for Apache Cordova plugins:

    'battery-status'
    'camera'
    'console'
    'contacts'
    'device'
    'device-motion'
    'device-orientation'
    'dialogs'
    'file'
    'geolocation'
    'globalization'
    'inappbrowser'
    'media'
    'media-capture'
    'network-information'
    'splashscreen'
    'vibration'

Use with Commands: `'plugin'`

Specify the plugin to add to the Cordova project
It can be specify in 4 forms:

* Shortcut         (i.e. 'camera' it will be downloaded form plugins.cordova.io)
* ID               (i.e. org.apache.cordova.device it will be downloaded from plugins.cordova.io)
* Git Url          (i.e. https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git)
* Directory Path   (~/userid/cordova/plugins/plugin1)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

