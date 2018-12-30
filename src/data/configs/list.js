'use strict';

const cTable = require('console.table');

const listConfigData = (configData) => {
  if (configData.configs.length > 0) {
    console.log(cTable.getTable(configData.configs));
  } else {
    console.log('No configs found');
  }
}
 
module.exports = {
  listConfigData,
 }