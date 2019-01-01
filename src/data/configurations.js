'use strict'

const fs = require('fs');
const path = require('path');

const {
  MAIN_DIR,
} = require('../../settings');

const dataFilePath = path.join(MAIN_DIR, '/src/data/data/data.json');
const dataFile = fs.readFileSync(dataFilePath);
const configData = JSON.parse(dataFile);


module.exports = {
  dataFilePath,
  configData,
};