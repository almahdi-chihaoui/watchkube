'use strict';

const cTable = require('console.table');

const {
  configManagerLog,
} = require('../../logger');

/**
 * List all configs in the data.json file.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 */

const listConfigData = (configData) => {
  if (configData.configs.length > 0) {
    // Show configs in a table format
    console.log(cTable.getTable(configData.configs));
  } else {
    // Show no configs message
    configManagerLog('noConfigs');
  }
}
 
module.exports = {
  listConfigData,
 }