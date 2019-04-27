'use strict'

const fs = require('fs');

const {
  dataFilePath,
  getConfigData,
} = require('../configurations');

const {
  saveData
} = require('./saveData');

const {
  errorsLog,
  importManagerLog,
} = require('../../logger')

/**
 * Import configs and ignored paths from a file.
 * @param {string} filePath 
 */

const importFile = (filePath) => {
  // Check if the file exist

  if (fs.existsSync(filePath)) {
    // Get new configData from the file's path
    const newConfigData = getConfigData(filePath);
    // Get configData
    const configData = getConfigData();
    // Validate

    // Save
    saveData(
      newConfigData.configs,
      newConfigData.ignoredPaths,
      configData,
      dataFilePath,
    );
    importManagerLog('importFile');
  } else {
    errorsLog('importFile', filePath);
  }
}

module.exports = {
  importFile,
}