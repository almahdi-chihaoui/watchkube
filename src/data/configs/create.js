'use strict';

const fs = require('fs');

const createConfigData = (selector, localDir, remoteDir, configData, dataFilePath) => {
  const newId = configData.configs.length > 0
    ? configData.configs.reduce((prev, curr) => {
      return curr.id > prev.id ? curr : prev;
    }).id + 1
    : 1;
  const newConfig = {
    id: newId,
    selector,
    localDir,
    remoteDir,
  }

  const newConfigs = [...configData.configs, newConfig];
  const newConfigData = {
    ...configData,
    configs: newConfigs,
  }

  fs.writeFileSync(
    dataFilePath,
    JSON.stringify(newConfigData),
  );
  console.log('The new config was added successfully')
}

module.exports = {
  createConfigData,
}




