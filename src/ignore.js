'use strict'

const {
  unknownCmd,
} = require('./logger');
const {
  createIgnoredPath,
  listIgnoredPaths,
  removeIgnoredPath,
} = require('./data/ignoredPaths'); 

const ignore = (action, args) => {
  const actions = {
    add: createIgnoredPath,
    list: listIgnoredPaths,
    remove: removeIgnoredPath,
  }
  if (Object.keys(actions).includes(action)) {
    return actions[action](args);
  } else {
    unknownCmd(action);
    return;
  }
}

module.exports = {
  ignore,
};