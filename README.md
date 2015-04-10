# grunt-cordovacli [![Build Status](https://secure.travis-ci.org/csantanapr/grunt-cordovacli.png?branch=master)](https://travis-ci.org/csantanapr/grunt-cordovacli)

> "Wraps a web application as a hybrid app with [Apache Cordova CLI](http://cordova.io) or [Crome Cordova Apps CLI](https://github.com/MobileChromeApps/mobile-chrome-apps)"

More information about [Apache Cordova Command-line Interface](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface)
More information about [Chrome Apps for Mobile](https://github.com/MobileChromeApps/mobile-chrome-apps)

## First Install Cordova or CCA
- This plugin requires Grunt `^0.4.5`
- NPM module `cordova-cli` version >=3.0.0 or `cca` >=0.5.1 needs to be install locally or at peer location as node module grunt-cordovacli, or in a node_module directory of the parent directory structure
```shell
npm install cordova@latest --save
```
or
```shell
npm install cca@latest --save
```

## Gettings Started with Grunt and the Cordova/CCA Grunt Plugin
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
        cli: 'cca'  // cca or cordova
    },
    cordova: {
        options: {
            command: ['create','platform','plugin','build'],
            platforms: ['ios','android'],
            plugins: ['device','dialogs'],
            path: 'myHybridAppFolder',
            id: 'io.cordova.hellocordova',
            name: 'HelloCordova'
        }
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
    remove_plugin: {
        options: {
            command: 'plugin',
            action: 'rm',
            plugins: [
                'battery-status'
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

#### options.cli
Type: `String`
Default value: `'cordova'`
Valid values for String: `'cordova'` `'cca'`
Specify the cli to use


#### options.command
Type: `String` or `Array`
Valid values for String: `'create'` `'platform'` `'plugin'` `'build'` `'emulate'` `'prepare'` `'compile'` `'run'` `'serve'`
Specify the cordova command when using `String`


Valid values for Array: `'create'` `'platform'` `'plugin'` `'prepare'` `'compile'` `'build'`
Specify a full cycle or series of cordova commands when is an `Array`

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
Valid value: `'ios'` `'android'` `'blackberry10'`  `'wp8'` `'ubuntu'` `'firefoxos'` `'amazon-fireos'`
Version can be specified like  `'ios@3.7.0'`
Can also pass a directory containing a platform git repository
Required for Commands: `'platform'`
Not Applicable for Commands: `'plugin'`
Optional for other commands
If using with option.action=add and platform is already present, then the add action it's skip

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
* ID or ID@version (i.e. org.apache.cordova.device it will be downloaded from plugins.cordova.io)
* Git Url          (i.e. https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git)
* Directory Path   (~/userid/cordova/plugins/plugin1)

If using with option.action=add and using ID or ID@version, and plugin is already present, cordova will skip it
If using remove or rm options.command to remove a plugin only Shortcut  or ID are supported

## Contributing
Biggest contribution you can do is to open issues.
You will need to have signed off on the [Apache CLA](http://www.apache.org/licenses/icla.txt) in order for changes to be accepted. For more information, refer to: http://www.apache.org/licenses/#clas
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
