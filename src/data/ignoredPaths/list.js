'use strict';

const cTable = require('console.table');

const {
  ignoredPathManagerLog,
} = require('../../logger');

const listIgnoredPathsData = (configData) => {
  if (configData.ignoredPaths.length > 0) {
    console.log(cTable.getTable(configData.ignoredPaths));
  } else {
    ignoredPathManagerLog('noPaths');
  }
} 
 
module.exports = {
  listIgnoredPathsData,
 }