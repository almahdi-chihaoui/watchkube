'use strict'

const fs = require('fs');

const dataFilePath = 'src/configData/data/data.json'
const dataFile = fs.readFileSync(dataFilePath);
const configData = JSON.parse(dataFile);


module.exports = {
  dataFilePath,
  configData,
};