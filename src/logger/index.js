'use strict'

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
  };
  console.log(`\x1b[31m${messages[errorSide]}`);
}

configManagerLog = (op) => {
  const messages = {
    create: 'The new config was added successfully',
    remove: 'The specified config was removed successfully',
    configNotFound: 'Error: config not found',
    noConfigs: 'No configs found',
    createWrongArgs: 'Wrong arguments, please provide: selector localDir remoteDir',
    removeWrongArgs: 'Wrong arguments, please provide: id',
    invalidId: 'Please provide a valid id',
  };
  console.log(`${messages[op]}`);
}

ignoredPathManagerLog = (op) => {
  const messages = {
    create: 'The new path was added successfully',
    remove: 'The specified path was removed successfully',
    pathNotFound: 'Error: path not found',
    noPaths: 'No paths found',
    createWrongArgs: 'Wrong arguments, please provide: path',
    removeWrongArgs: 'Wrong arguments, please provide: id',
    invalidId: 'Please provide a valid id',
  };
  console.log(`${messages[op]}`);
}

module.exports = {
  configManagerLog,
  ignoredPathManagerLog,
  errorsLog,
  statusLog,
  watchLog,
}