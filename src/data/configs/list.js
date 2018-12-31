'use strict';

const cTable = require('console.table');

const {
  configManagerLog,
} = require('../../logger');

const listConfigData = (configData) => {
  if (configData.configs.length > 0) {
    console.log(cTable.getTable(configData.configs));
  } else {
    configManagerLog('noConfigs');
  }
}
 
module.exports = {
  listConfigData,
 }