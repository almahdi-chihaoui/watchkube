'use strict';

const fs = require('fs');

const removeConfigData = (id, configData, dataFilePath) => {
  const configToDelete = configData.configs.find(svc => (svc.id === id));
  if (configToDelete) {
    const updatedConfigs = configData.configs.filter(svc => svc.id !== id);
    const updatedConfigData = {
      ...configData,
      configs: updatedConfigs,
    }

    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(updatedConfigData),
    );
  } else {
    console.log('Error: config not found');
  }
};

module.exports = {
  removeConfigData,
};
