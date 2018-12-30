'use strict';

const fs = require('fs');

const removeIgnoredPathData = (id, configData, dataFilePath) => {
  const ignoredPathToDelete = configData.ignoredPaths.find(ip => (ip.id === id));
  if (ignoredPathToDelete) {
    const updatedIgnoredPaths = configData.ignoredPaths.filter(ip => ip.id !== id);
    const updatedConfigData = {
      ...configData,
      ignoredPaths: updatedIgnoredPaths,
    }

    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(updatedConfigData),
    );
  } else {
    console.log('Error: path not found');
  }
};

module.exports = {
  removeIgnoredPathData,
};
