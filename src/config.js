'use strict'

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
  return actions[action](args);
}

module.exports = {
  config,
};