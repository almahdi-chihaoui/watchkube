'use strict'

const { exec } = require('child_process');

const {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
} = require('./executeCmds');

const updateKube = (os, event, selector, localPath, remotePath, containerName) => {
  const platform = 'kubernetes';
  const mapEventsToCmds = {
    change: () => execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath, containerName)),
    add: () => execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath, containerName)),
    unlink: () => execScriptFileCmd(os, deleteFile(platform, os, selector, remotePath, containerName)),
    addDir: () => execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath, containerName)),
    unlinkDir: () => execScriptFileCmd(os, deleteFolder(platform, os, selector, remotePath, containerName)),
  };
  return exec(mapEventsToCmds[event]());
}

module.exports = {
  updateKube,
}