'use strict';

const cTable = require('console.table');

const listIgnoredPathsData = (configData) => {
  if (configData.ignoredPaths.length > 0) {
    console.log(cTable.getTable(configData.ignoredPaths));
  } else {
    console.log('No paths found');
  }
} 
 
module.exports = {
  listIgnoredPathsData,
 }