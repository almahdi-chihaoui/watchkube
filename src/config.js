'use strict'

const {
  unknownCmd,
} = require('./logger');
const {
  createConfig,
  listConfigs,
  removeConfig,
} = require('./data/configs'); 

const config = (action, args) => {
  const actions = {
    create: createConfig,
    list: listConfigs,
    remove: removeConfig,
  }
  if (Object.keys(actions).includes(action)) {
    return actions[action](args);
  } else {
    unknownCmd(action);
    return;
  }
  
}

module.exports = {
  config,
};