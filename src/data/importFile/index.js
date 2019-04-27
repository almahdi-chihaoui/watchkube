'use strict'

const {
  dataFilePath,
  getConfigData,
} = require('../configurations');

const {
  saveData
} = require('./saveData');

/**
 * Import configs and ignored paths from a file.
 * @param {string} filePath 
 */

const importFile = (filePath) => {
  // Get configData
  const configData = getConfigData();

  // Get new configData from the file's path
  const newConfigData = getConfigData(filePath);

  // Validate

  // Save
  saveData(
    newConfigData.configs,
    newConfigData.ignoredPaths,
    configData,
    dataFilePath,
  );
}

module.exports = {
  importFile,
}