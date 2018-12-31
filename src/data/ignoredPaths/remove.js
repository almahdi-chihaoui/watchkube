'use strict';

const fs = require('fs');

const {
  ignoredPathManagerLog,
} = require('../../logger');

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
    ignoredPathManagerLog('remove');
  } else {
    ignoredPathManagerLog('pathNotFound');
  }
};

module.exports = {
  removeIgnoredPathData,
};
