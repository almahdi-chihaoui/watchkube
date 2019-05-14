'use strict'

/**
 * This post install script is used to initialize a local json file in a folder under the user's home
 * folder, it checks if that file already exist, if it is not, it initialize and create a new one. 
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  CONFIG_FILE_NAME,
  LOCAL_CONFIG_FOLDER,
} = require('../settings');

const localConfigFolderPath = path.join(os.homedir(), LOCAL_CONFIG_FOLDER);
const localConfigFilePath = path.join(localConfigFolderPath, CONFIG_FILE_NAME);

// Check if the local config file does not exist
if (!fs.existsSync(localConfigFilePath)) {
  // Initialize data
  const initialConfigData = {
    configs: [],
    ignoredPaths: [],
  };

  // Make new folder under the user's home folder
  fs.mkdirSync(localConfigFolderPath);

  // Write data to the local config file
  fs.writeFileSync(
    localConfigFilePath,
    JSON.stringify(initialConfigData),
  );
}