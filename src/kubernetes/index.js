'use strict'

const { exec } = require('child_process');

const {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
} = require('./executeCmds');

const updateKube = (os, event, selector, localPath, remotePath, containerName, nameSpace, reload) => {
  const platform = 'kubernetes';
  const mapEventsToCmds = {
    change: () => execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath, containerName, nameSpace, reload)),
    add: () => execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath, containerName, nameSpace, reload)),
    unlink: () => execScriptFileCmd(os, deleteFile(platform, os, selector, remotePath, containerName, nameSpace, reload)),
    addDir: () => execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath, containerName, nameSpace, reload)),
    unlinkDir: () => execScriptFileCmd(os, deleteFolder(platform, os, selector, remotePath, containerName, nameSpace, reload)),
  };
  return exec(mapEventsToCmds[event]());
}

module.exports = {
  updateKube,
}