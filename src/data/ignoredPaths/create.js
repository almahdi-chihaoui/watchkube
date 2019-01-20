'use strict';

const fs = require('fs');

const {
  ignoredPathManagerLog,
} = require('../../logger');

/**
 * Add an ignored path to data.json file, it generate new id, create an ignored path object from its paramaters then add it to ignoredPaths array in the configData object and write the new object in the data file.
 * @param {string} path - The path to be ignored.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 * @param {string} dataFilePath - The path of the data file (data.json).
 */

const createIgnoredPathData = (
  path,
  configData,
  dataFilePath,
) => {
  // Generate a new id
  const newId = configData.ignoredPaths.length > 0
    ? configData.ignoredPaths.reduce((prev, curr) => {
      return curr.id > prev.id ? curr : prev;
    }).id + 1
    : 1;

  // New ignored path object  
  const newIgnoredPath = {
    id: newId,
    path,
  }

  // Add the new ignored path
  const newIgnoredPaths = [
    ...configData.ignoredPaths,
    newIgnoredPath,
  ];
  const newConfigData = {
    ...configData,
    ignoredPaths: newIgnoredPaths,
  }

  // Write the new data to data.json
  fs.writeFileSync(
    dataFilePath,
    JSON.stringify(newConfigData),
  );

  // Show confirmation message
  ignoredPathManagerLog('create');
}

module.exports = {
  createIgnoredPathData,
}




