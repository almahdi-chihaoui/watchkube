'use strict';

const fs = require('fs');

const {
  configManagerLog,
} = require('../../logger');

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
    configManagerLog('remove');
  } else {
    configManagerLog('configNotFound');
  }
};

module.exports = {
  removeConfigData,
};
