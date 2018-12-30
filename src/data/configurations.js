'use strict'

const fs = require('fs');

const dataFilePath = 'src/data/data/data.json'
const dataFile = fs.readFileSync(dataFilePath);
const configData = JSON.parse(dataFile);


module.exports = {
  dataFilePath,
  configData,
};