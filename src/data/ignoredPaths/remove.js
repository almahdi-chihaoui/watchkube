'use strict';

const fs = require('fs');

const {
  ignoredPathManagerLog,
} = require('../../logger');

/**
 * Remove an ignored path by id.
 * @param {number} id - The id of the ignored path to be removed.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 * @param {string} dataFilePath - The path of the data file (data.json).
 */

const removeIgnoredPathData = (id, configData, dataFilePath) => {
  // Check if the provided id exist
  const ignoredPathToDelete = configData.ignoredPaths.find(ip => (ip.id === id));

  if (ignoredPathToDelete) {
    // Get all ignored paths except the one with the provided id
    const updatedIgnoredPaths = configData.ignoredPaths.filter(ip => ip.id !== id);

    // Update the configData object
    const updatedConfigData = {
      ...configData,
      ignoredPaths: updatedIgnoredPaths,
    }

    // Write the new data to data.json
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(updatedConfigData),
    );

    // Show confirmation message
    ignoredPathManagerLog('remove');
  } else {
    ignoredPathManagerLog('pathNotFound');
  }
};

module.exports = {
  removeIgnoredPathData,
};
