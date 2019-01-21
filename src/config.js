'use strict'

const {
  unknownCmd,
} = require('./logger');
const {
  createConfig,
  listConfigs,
  removeConfig,
} = require('./data/configs'); 

/**
 * Create, list or remove configs data based on the given action.
 * @param {string} action - The given action: add, list or remove
 * @param {string[]} args - The list of arguments
 */

const config = (action, args) => {
  const actions = {
    add: createConfig,
    list: listConfigs,
    remove: removeConfig,
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
  config,
};