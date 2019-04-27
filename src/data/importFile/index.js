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
  validate,
} = require('../validation');

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

    // Validate
    const validationResult = validate(newConfigData);

    if (validationResult.error === null) {
      // Get configData
      const configData = getConfigData();

      // Save
      saveData(
        newConfigData.configs,
        newConfigData.ignoredPaths,
        configData,
        dataFilePath,
      );

      // Log success message
      importManagerLog('importFile');
    } else {
      // Log error message
      errorsLog('validation', validationResult.error);
    }

  } else {
    // Log error message
    errorsLog('importFile', filePath);
  }
}

module.exports = {
  importFile,
}