'use strict'

const fs = require('fs');

const dataFilePath = '/usr/local/lib/node_modules/watchkube/src/data/data/data.json'
const dataFile = fs.readFileSync(dataFilePath);
const configData = JSON.parse(dataFile);


module.exports = {
  dataFilePath,
  configData,
};