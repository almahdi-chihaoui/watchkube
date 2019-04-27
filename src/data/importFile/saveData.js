'use strict'

const fs = require('fs');

/**
 * Add configs and ignored path to the data.json file, it generate adn assign a new id for each config/ignored path then add them to the new config data object, finally, it writes those data to data.json file.
 * @param {Object[]} configs - The added configs.
 * @param {Object[]} ignoredPaths - The added ignored paths.
 * @param {Object} configData - The data file (data.json) content parsed in JSON object.
 * @param {string} dataFilePath - The path of the data file (data.json).
 */

const saveData = (
  configs,
  ignoredPaths,
  configData,
  dataFilePath,
) => {
  // Initialize...
  let newConfigData = Object.assign({}, configData);
  const newConfigs = newConfigData.configs.map(config => Object.assign({}, config));
  const newIgnoredPaths = newConfigData.ignoredPaths.map(ignoredPath => Object.assign({}, ignoredPath));

  // Handle configs
  if (configs) {
    // Generate a new id
    const newId = configData.configs.length > 0
      ? configData.configs.reduce((prev, curr) => {
        return curr.id > prev.id ? curr : prev;
      }).id + 1
      : 1;

    // Assign an id to each config based on the previously generated id 
    const iDedConfigs = configs.map((config, index) =>
      Object.assign({}, config, { id: newId + index })
    );

    // Add the new configs
    newConfigData = {
      ...newConfigData,
      configs: newConfigs.concat(iDedConfigs),
    }
  }

  // Handle ignoredPaths
  if (ignoredPaths) {
    // Generate a new id
    const newId = configData.ignoredPaths.length > 0
      ? configData.ignoredPaths.reduce((prev, curr) => {
        return curr.id > prev.id ? curr : prev;
      }).id + 1
      : 1;

    // Assign an id to each config based on the previously generated id 
    const iDedIgnoredPaths = ignoredPaths.map((ignoredPath, index) =>
      Object.assign({}, ignoredPath, { id: newId + index })
    );

    // Add the new ignoredPaths
    newConfigData = {
      ...newConfigData,
      ignoredPaths: newIgnoredPaths.concat(iDedIgnoredPaths),
    }
  }

  // Write the new data to data.json
  fs.writeFileSync(
    dataFilePath,
    JSON.stringify(newConfigData),
  );

}

module.exports = {
  saveData,
}