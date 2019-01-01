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

const applyChanges = (platform, os, selector, localPath, remotePath) => {
  const scriptFile = {
    unix: 'applyChanges.sh',
    windows: 'applyChanges',
  }
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]} ${localPath} ${selector} ${remotePath}`);
};

const deleteFile = (platform, os, selector, remotePath) => {
  const scriptFile = {
    unix: 'deleteFile.sh',
    windows: 'deleteFile',
  }
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]} ${selector} ${remotePath}`);
};

const deleteFolder = (platform, os, selector, remotePath) => {
  const scriptFile = {
    unix: 'deleteFolder.sh',
    windows: 'deleteFolder',
  }
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]} ${selector} ${remotePath}`);
};

module.exports = {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
}