'use strict'

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  CONFIG_FILE_NAME,
  LOCAL_CONFIG_FOLDER,
} = require('../../settings');

const dataFilePath = path.join(os.homedir(), LOCAL_CONFIG_FOLDER, CONFIG_FILE_NAME);

/**
 * Get the data file content parsed in JSON object.
 */

const getConfigData = (path = dataFilePath) =>
  (JSON.parse(fs.readFileSync(path)));


module.exports = {
  dataFilePath,
  getConfigData,
};