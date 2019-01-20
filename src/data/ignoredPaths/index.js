'use strict'

const path = require('path');

const {
  configData,
  dataFilePath,
} = require('../configurations');

const {
  createIgnoredPathData,
} = require('./create');
const {
  listIgnoredPathsData,
} = require('./list');
const {
  removeIgnoredPathData,
} = require('./remove');

const {
  ignoredPathManagerLog,
} = require('../../logger');

/**
 * Add a new ignored path, it get the ignored path's data from the arguments of the cli command (wtachkube ignore add) and execute the createIgnoredPathData function with the extracted data.
 * @param {string[]} args - The arguments from the cli command (wtachkube ignore add).
 */

const createIgnoredPath = (args) => {
  if (
    args.length === 1
    && args[0]
  ) {
    // When the dot is used, get the local path via process.cwd(),
    // which return the current working directory and join
    // it with the provided path after removing the dot
    const ignoredPath = args[0].startsWith('.')
      ? path.join(process.cwd(), args[0].slice(1))
      : args[0];

    // Add the new ignored path  
    createIgnoredPathData(
      ignoredPath,
      configData,
      dataFilePath,
    );
  } else {
    // Show wrong args message if some mandatory args are missing, or args are misplaced
    ignoredPathManagerLog('createWrongArgs');
  }
}

/**
 * Remove an ignored path by id, it get the id from the arguments of the cli command (wtachkube ignore remove) and execute the removeIgnoredPathData with the extracted id.
 * @param {string[]} args - The arguments of the cli command (wtachkube ignore remove).
 */

const removeIgnoredPath = (args) => {
  if (args.length === 1) {
    const id = Number(args[0]);
    if (!isNaN(id)) {
      removeIgnoredPathData(id, configData, dataFilePath);
    } else {
      ignoredPathManagerLog('invalidId');
    }
  } else {
    ignoredPathManagerLog('removeWrongArgs');
  }
}

/**
 * List all configs.
 */

const listIgnoredPaths = () => {
  listIgnoredPathsData(configData);
}

module.exports = {
  createIgnoredPath,
  listIgnoredPaths,
  removeIgnoredPath,
}