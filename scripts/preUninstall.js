'use strict'

/**
 * This pre-uninstall script is used as cleanup script to remove watchkube's folder under the user's home
 * folder.
 */

const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const {
  LOCAL_CONFIG_FOLDER,
} = require('../settings');

const localConfigFolderPath = path.join(os.homedir(), LOCAL_CONFIG_FOLDER);

// rm -rf the local config folder.
rimraf.sync(localConfigFolderPath);
