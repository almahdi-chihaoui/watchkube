'use strict';

const fs = require('fs');

const createIgnoredPathData = (path, configData, dataFilePath) => {
  const newId = configData.ignoredPaths.length > 0
    ? configData.ignoredPaths.reduce((prev, curr) => {
      return curr.id > prev.id ? curr : prev;
    }).id + 1
    : 1;
  const newIgnoredPath = {
    id: newId,
    path,
  }

  const newIgnoredPaths = [...configData.ignoredPaths, newIgnoredPath];
  const newConfigData = {
    ...configData,
    ignoredPaths: newIgnoredPaths,
  }

  fs.writeFileSync(
    dataFilePath,
    JSON.stringify(newConfigData),
  );
  console.log('The new path was added successfully')
}

module.exports = {
  createIgnoredPathData,
}




