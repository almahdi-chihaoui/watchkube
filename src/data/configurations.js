'use strict'

const fs = require('fs');
const path = require('path');

const {
  MAIN_DIR,
} = require('../../settings');

const dataFilePath = path.join(MAIN_DIR, '/src/data/data/data.json');

/**
 * Get the data file (data.json) content parsed in JSON object.
 */

const getConfigData = (path = dataFilePath) =>
  (JSON.parse(fs.readFileSync(path)));


module.exports = {
  dataFilePath,
  getConfigData,
};