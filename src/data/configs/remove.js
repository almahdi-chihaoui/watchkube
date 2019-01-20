'use strict';

const fs = require('fs');

const {
  configManagerLog,
} = require('../../logger');

/**
 * Remove a config by id.
 * @param {number} id - The id of the config to be removed.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 * @param {string} dataFilePath - The path of the data file (data.json).
 */

const removeConfigData = (
  id,
  configData,
  dataFilePath,
) => {
  // Check if the provided id exist
  const configToDelete = configData.configs.find(svc => (svc.id === id));

  if (configToDelete) {
    // Get all configs except the one with the provided id
    const updatedConfigs = configData.configs.filter(svc => svc.id !== id);

    // Update the configData object
    const updatedConfigData = {
      ...configData,
      configs: updatedConfigs,
    }

    // Write the new data to data.json
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(updatedConfigData),
    );

    // Show confirmation message
    configManagerLog('remove');
  } else {
    configManagerLog('configNotFound');
  }
};

module.exports = {
  removeConfigData,
};
