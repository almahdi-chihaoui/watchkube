'use strict'

const { exec } = require('child_process');

const {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
} = require('./executeCmds');

const updateKube = (os, event, selector, localPath, remotePath) => {
  const platform = 'kubernetes';
  const mapEventsToCmds = {
    change: execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath)),
    add: execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath)),
    unlink: execScriptFileCmd(os, deleteFile(platform, os, selector, remotePath)),
    addDir: execScriptFileCmd(os, applyChanges(platform, os, selector, localPath, remotePath)),
    unlinkDir: execScriptFileCmd(os, deleteFolder(platform, os, selector, remotePath)),
  };
  
  return exec(mapEventsToCmds[event])
}

module.exports = {
  updateKube,
}