'use strict'

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
  return `/usr/local/lib/node_modules/watchkube/src/${platform}/${os}/${scriptFile[os]} ${localPath} ${selector} ${remotePath}`;
};

const deleteFile = (platform, os, selector, remotePath) => {
  const scriptFile = {
    unix: 'deleteFile.sh',
    windows: 'deleteFile',
  }
  return `/usr/local/lib/node_modules/watchkube/src/${platform}/${os}/${scriptFile[os]} ${selector} ${remotePath}`;
};

const deleteFolder = (platform, os, selector, remotePath) => {
  const scriptFile = {
    unix: 'deleteFolder.sh',
    windows: 'deleteFolder',
  }
  return `/usr/local/lib/node_modules/watchkube/src/${platform}/${os}/${scriptFile[os]} ${selector} ${remotePath}`;
};

module.exports = {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
}