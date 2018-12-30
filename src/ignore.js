'use strict'

const {
  createIgnoredPath,
  listIgnoredPaths,
  removeIgnoredPath,
} = require('./data/ignoredPaths'); 

const ignore = (action, args) => {
  const actions = {
    create: createIgnoredPath,
    list: listIgnoredPaths,
    remove: removeIgnoredPath,
  }
  return actions[action](args);
}

module.exports = {
  ignore,
};