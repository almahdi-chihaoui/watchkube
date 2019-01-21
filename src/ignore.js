'use strict'

const {
  unknownCmd,
} = require('./logger');
const {
  createIgnoredPath,
  listIgnoredPaths,
  removeIgnoredPath,
} = require('./data/ignoredPaths'); 

/**
 * Create, list or remove ignored paths data based on the given action.
 * @param {string} action - The given action: add, list or remove
 * @param {string[]} args - The list of arguments
 */

const ignore = (action, args) => {
  const actions = {
    add: createIgnoredPath,
    list: listIgnoredPaths,
    remove: removeIgnoredPath,
  }
  if (Object.keys(actions).includes(action)) {
    // Execute the appropriate function
    return actions[action](args);
  } else {
    // Show unknown command error if the given action is not found in the actions object
    unknownCmd(action);
    return;
  }
}

module.exports = {
  ignore,
};