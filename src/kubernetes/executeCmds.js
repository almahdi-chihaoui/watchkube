'use strict'

const path = require('path');

const {
  MAIN_DIR,
} = require('../../settings');

const execScriptFileCmd = (os, scriptFile) => {
  const cmd = {
    unix: `sh ${scriptFile}`,
    windows: `${scriptFile}`,
  }
  return cmd[os];
};

const applyChanges = (platform, os, selector, localPath, remotePath, containerName) => {
  const scriptFile = {
    unix: 'applyChanges.sh',
    windows: 'applyChanges',
  }
  const targetContainer = containerName ? `-c ${containerName}` : '';
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]} ${localPath} ${selector} ${remotePath} ${targetContainer}`);
};

const deleteFile = (platform, os, selector, remotePath, containerName) => {
  const scriptFile = {
    unix: 'deleteFile.sh',
    windows: 'deleteFile',
  }
  const targetContainer = containerName ? `-c ${containerName}` : '';
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]} ${selector} ${remotePath} ${targetContainer}`);
};

const deleteFolder = (platform, os, selector, remotePath, containerName) => {
  const scriptFile = {
    unix: 'deleteFolder.sh',
    windows: 'deleteFolder',
  }
  const targetContainer = containerName ? `-c ${containerName}` : '';
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]} ${selector} ${remotePath} ${targetContainer}`);
};

module.exports = {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
}