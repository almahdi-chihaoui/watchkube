'use strict'

const chokidar = require('chokidar');
const os = require('os');

const { configData } = require('./data/configurations');
const { updateKube } = require('./kubernetes');
const {
  configManagerLog,
  errorsLog,
  statusLog,
  watchLog,
} = require('./logger');

const startWatching = () => {
  const osType = os.platform() !== 'win32' ? 'unix' : 'windows';

  const watchedPaths = configData.configs
    .map(cfg => cfg.localDir);

  if (watchedPaths.length === 0) {
    configManagerLog('noConfigs');
    return;
  }

  const ignoredPaths = configData.ignoredPaths
    .map(ip => ip.path);

  const ignored = [/(^|[\/\\])\../, ...ignoredPaths];
  
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

      const targetPodconfig = configData.configs
        .find(cfg => path.startsWith(cfg.localDir));
      const subPath = path.replace(targetPodconfig.localDir, '');
      const remotePath = `${targetPodconfig.remoteDir}${subPath}`;

      statusLog('updating');
      updateKube(osType, event, targetPodconfig.selector, path, remotePath)
        .on('close', (code) => {
          if (!code) {
            statusLog('updated');
            statusLog('watching');
          } else {
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
