'use strict'

const fs = require('fs');
const path = require('path');

const {
  MAIN_DIR,
} = require('../settings');

const dataFilePath = path.join(MAIN_DIR, '/test/data/data.json');
const configData = () =>
  (JSON.parse(fs.readFileSync(dataFilePath)));



module.exports = {
  dataFilePath,
  configData,
};