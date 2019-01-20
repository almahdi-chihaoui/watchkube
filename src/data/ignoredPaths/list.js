'use strict';

const cTable = require('console.table');

const {
  ignoredPathManagerLog,
} = require('../../logger');

/**
 * List all ignored paths in the data.json file.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 */

const listIgnoredPathsData = (configData) => {
  if (configData.ignoredPaths.length > 0) {
    // Show ignored paths in a table format
    console.log(cTable.getTable(configData.ignoredPaths));
  } else {
    // Show no ignored paths message
    ignoredPathManagerLog('noPaths');
  }
} 
 
module.exports = {
  listIgnoredPathsData,
 }