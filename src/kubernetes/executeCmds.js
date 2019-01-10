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

const applyChanges = (platform, os, selector, localPath, remotePath, containerName, nameSpace) => {
  const scriptFile = {
    unix: 'cp.sh',
    windows: 'cp',
  }
  return `${path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]}`)} ${localPath} ${selector} ${remotePath} ${containerName} ${nameSpace}`;
};

const deleteFile = (platform, os, selector, remotePath, containerName, nameSpace) => {
  const scriptFile = {
    unix: 'rm.sh file',
    windows: 'rm file',
  }
  return `${path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]}`)} ${selector} ${remotePath} ${containerName} ${nameSpace}`;
};

const deleteFolder = (platform, os, selector, remotePath, containerName, nameSpace) => {
  const scriptFile = {
    unix: 'rm.sh fldr',
    windows: 'rm fldr',
  }
  return `${path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]}`)} ${selector} ${remotePath} ${containerName} ${nameSpace}`;
};

module.exports = {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
}