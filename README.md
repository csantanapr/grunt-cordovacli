# grunt-cordovacli

> "Wraps a web application as a hybrid app with [Apache Cordova CLI](http://cordova.io)"

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

```js
cordovacli: {
    create: {
        options: {
            command: 'create',
            path: 'myHybridAppFolder',
            id: 'com.myHybridApp',
            name: 'myHybridApp'
        }
    },
    add_platform: {
        options: {
            command: 'platform',
            path: 'myHybridAppFolder',
            action: 'add',
            platforms: ['ios', 'android']
        }
    },
    add_plugin: {
        options: {
            command: 'plugin',
            path: 'myHybridAppFolder',
            action: 'add',
            plugins: [
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
    build_all: {
        options: {
            command: 'build',
            path: 'myHybridAppFolder'
        }
    },
    emulate_android: {
        options: {
            command: 'emulate',
            path: 'myHybridAppFolder',
            platforms: ['android']
        }
    }
}
```


### Options

#### options.command
Type: `String`
Valid values: `'create'` `'platform'` `'plugin'` `'build'` `'emulate'` `'prepare'` `'compile'`

Specify the cordova command

#### options.id
Type: `String`
Default value: `'com.hello'`
Use with Command: `'create'`

Specify the ID (reverse-domain-style package name) for the Cordova App

#### options.name
Type: `String`
Default value: `'Hello'`
Use with Command: `'create'`

Specify the Name for the Cordova App

#### options.path
Type: `String`
Default value: `'.cordova'` 

Specify the path to the Cordova project directory

#### options.action
Type: `String`
Valid value: `'add'` `'rm'` `'remove'`
Required for Commands: `'platform'` 

Specify the action to perform

#### options.plugins
Type: `String`
Shortcut values for Apache Cordova plugins:
`'vibration'`
`'device-orientation'`
`'network-information'`
`'device'`
`'contacts`'
`'media-capture'`
`'inappbrowser'`
`'globalization'`
`'geolocation'`
`'file'`
`'dialogs'`
`'camera'`
`'media'`
`'device-motion'`
                
Use with Commands: `'plugin'` 

Specify the plugin to add to the Cordova project
The value of plugin will be use with plugin_path_ext and plugin_base_path

`'https://git-wip-us.apache.org/repos/asf/cordova-plugin-'plugin-value'.git'`

If you want to use a different repo for see options:

- options.plugin_path_ext: '.git'
- options.plugin_base_path: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-'

If you want to use a local path:

- options.plugin_path: '~/plugins/myhwplugin'
            
#### options.plugin_path
Type: `String` or `Boolean`
Default value: `'false'`
Applicable Commands: `'plugin'`

Specify the path to plugin to add or remove

#### options.plugin_path_ext
Type: `String`
Default value: `'.git'`
Applicable Commands: `'plugin'`

Specify the extension for repo if plugin_path: false

#### options.plugin_base_path
Type: `String`
Default value: `'.git'`
Applicable Commands: `'https://git-wip-us.apache.org/repos/asf/cordova-plugin-'`

Specify the base url for repo if plugin_path: false

#### options.platforms
Type: `String`
Valid value: `'ios'` `'android'` `'blackberry10'` `'wp7'` `'wp8'`
Required for Commands: `'platform'`
Not Applicable for Commands: `'plugin'`
Optional for other commands

Specify the platform type


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
