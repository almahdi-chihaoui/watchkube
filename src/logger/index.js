'use strict'

const {
  CONFIG_FILE_NAME,
} = require('../../settings')

const help = () => {
  const helpText =
  `  */ To start the watcher: "watchkube watch" 

  */ To configure the watcher, You need to specify the resource to confgiure and the action:
      "watchkube [resource] [action] [args]"

      **/ Resources:
        - config: the config resource is used to configure the watcher by specifying pod selectors,
            local paths to watch as well as remote path inside the container of the targeted pod.
              "watchkube config add [localDir] [remoteDir] -s [selector] -c [container] -n [namespace]" : add a new config.
                - [localDir] [remoteDir] -s [selector] are required.
                - if you don't specify a container, the first one will be selected.
                - if you don't specify a namespace, the default namespace will be selected.
              "watchkube config list" : list all configs.
              "watchkube config remove [id]" : remove a config.

        - ignore: the ignored paths resource is used to configure the watcher by specifying local paths to be ignored by the
            watcher (exp: "/**/node_modules/*").
              "watchkube ignore add [path]" : add a new ignored path.
              "watchkube ignore list" : list all ignored paths.
              "watchkube ignore remove [id]" : remove an ignored path.

  More info and demo: https://github.com/almahdi-chihaoui/watchkube#readme`;
  console.log(helpText);
}

const watchLog = (event, path) => {
  const messages = {
    change: `Changes detected: ${path}`,
    add: `File added: ${path}`,
    unlink: `File removed: ${path}`,
    addDir: `Folder added: ${path}`,
    unlinkDir: `Folder removed: ${path}`,
  }
  console.log(`\x1b[34m${messages[event]}`);
}

const statusLog = (status) => {
  const messages = {
    usingConfigFile: `Configuration file exist, using ${CONFIG_FILE_NAME.slice(1)} ...`,
    usingLocalFile: `Configuration file does not exist, using local configuration ...`,
    initializing: '\x1b[33mInitializing ...',
    updating: '\x1b[32mUpdating ... >_<',
    updated: '\x1b[32mUpdated     -_-',
    watching: '\x1b[32mWatching ... *_*',
  };
  console.log(`${messages[status]}`);
}

const errorsLog = (errorSide, detail) => {
  const messages = {
    watch: `Something went wrong :( error: ${detail}`,
    update: `Something went wrong :(\nChanges may not been applied!\nCode: ${detail}`,
    importFile: `${detail} does not exist! import aborted.`,
    validation: `Oops, something is wrong :/\n${detail}`,
  };
  console.log(`\x1b[31m${messages[errorSide]}`);
}

const importManagerLog = (op) => {
  const messages = {
    importFile: 'The file was imported successfully',
  };
  console.log(`${messages[op]}`);
}

const configManagerLog = (op) => {
  const messages = {
    create: 'The new config was added successfully',
    remove: 'The specified config was removed successfully',
    configNotFound: 'Error: config not found',
    noConfigs: 'No configs found, please use "watchkube config add" to add new config',
    createWrongArgs: 'Wrong arguments, please provide: [localDir] [remoteDir] -s [selector] -c [container] -n [namespace], where container and namepace are optionals',
    removeWrongArgs: 'Wrong arguments, please provide: id',
    invalidId: 'Please provide a valid id',
  };
  console.log(`${messages[op]}`);
}

const ignoredPathManagerLog = (op) => {
  const messages = {
    create: 'The new path was added successfully',
    remove: 'The specified path was removed successfully',
    pathNotFound: 'Error: path not found',
    noPaths: 'No paths found, please use "watchkube ignore add" to add new ignored path',
    createWrongArgs: 'Wrong arguments, please provide: path',
    removeWrongArgs: 'Wrong arguments, please provide: id',
    invalidId: 'Please provide a valid id',
  };
  console.log(`${messages[op]}`);
}

const unknownCmd = (cmd) => {
  const message = 
  `Error: unknown command "${cmd ? cmd : ''}"
  Please use "watchkube help" for usage.
  `
  console.log(message);
}

module.exports = {
  configManagerLog,
  help,
  ignoredPathManagerLog,
  importManagerLog,
  errorsLog,
  statusLog,
  unknownCmd,
  watchLog,
}