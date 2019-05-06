'use strict'

const chokidar = require('chokidar');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  getConfigData,
} = require('./data/configurations');
const {
  updateKube,
} = require('./kubernetes');
const {
  configManagerLog,
  errorsLog,
  statusLog,
  watchLog,
} = require('./logger');

const {
  CONFIG_FILE_NAME,
} = require('../settings');

/**
 * Initialize and start the watcher.
 */

const startWatching = (path) => {
  const osType = os.platform() !== 'win32' ? 'unix' : 'windows';

  // Initialize config file path & configData
  const configFilePath = path || process.cwd;
  const configData = {};


  // Check if there is watchkube.json file in current directory
  if (fs.existsSync(path.join(configFilePath, CONFIG_FILE_NAME))) {
    configData = getConfigData(path.join(configFilePath, CONFIG_FILE_NAME));
  } else {
    configData = getConfigData();
  }

  // Get the paths to be watched
  const watchedPaths = configData.configs
    .map(cfg => cfg.localDir);

  if (watchedPaths.length === 0) {
    configManagerLog('noConfigs');
    return;
  }

  // Get the paths to be ignored
  const ignoredPaths = configData.ignoredPaths
    .map(ip => ip.path);

  // By default, all dotfiles/folders are ignored
  const ignored = [/(^|[\/\\])\../, ...ignoredPaths];
  
  // Initialize and create a Chokidar watcher
  statusLog('initializing');
  const watcher = chokidar.watch(
    watchedPaths, {
      ignored,
      ignoreInitial: true,
      persistent: true
    });

  watcher
    .on('all', (event, path) => {
      watchLog(event, path);

      // Get the targeted pod config by comparing the path in which the changes
      // were detected and the stored local paths in the configs data
      const targetPodconfig = configData.configs
        .find(cfg => path.startsWith(cfg.localDir));

      // Get the subPath, which is the local path of the modified file in its project
      const subPath = path.replace(targetPodconfig.localDir, '');

      // Get the remote path of the modified file
      const remotePath = `${targetPodconfig.remoteDir}${subPath}`;

      // Execute updateKube function with the config of the targeted pod
      statusLog('updating');
      updateKube(
        osType,
        event,
        targetPodconfig.selector,
        path,
        remotePath,
        targetPodconfig.containerName,
        targetPodconfig.nameSpace,
        )
        .on('close', (code) => {
          if (!code) {
            // Show a confirmation message
            statusLog('updated');
            statusLog('watching');
          } else {
            // Show error exit code
            // TODO: Show script's error message
            errorsLog('update', code);
            statusLog('watching');
          }
        });
    })
    .on('ready', () => {
      statusLog('watching');
    })
    .on('error', error => errorsLog('watch', error));
}

module.exports = {
  startWatching,
}
