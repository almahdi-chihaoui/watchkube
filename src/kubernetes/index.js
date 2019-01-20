'use strict'

const { exec } = require('child_process');

const {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
} = require('./executeCmds');

const updateKube = (
  os,
  event,
  selector,
  localPath,
  remotePath,
  containerName,
  nameSpace,
) => {
  const platform = 'kubernetes';
  const mapEventsToCmds = {
    change: () => execScriptFileCmd(
      os,
      applyChanges(
        platform,
        os,
        selector,
        localPath,
        remotePath,
        containerName,
        nameSpace,
      )),
    add: () => execScriptFileCmd(
      os,
      applyChanges(
        platform,
        os,
        selector,
        ocalPath,
        remotePath,
        containerName,
        nameSpace,
      )),
    unlink: () => execScriptFileCmd(
      os,
      deleteFile(
        platform,
        os,
        selector,
        remotePath,
        containerName,
        nameSpace,
      )),
    addDir: () => execScriptFileCmd(
      os,
      applyChanges(platform,
        os, selector,
        ocalPath,
        remotePath,
        containerName,
        nameSpace,
      )),
    unlinkDir: () => execScriptFileCmd(
      os,
      deleteFolder(
        platform,
        os,
        selector,
        remotePath,
        containerName,
        nameSpace,
      )),
  };
  return exec(mapEventsToCmds[event]());
}

module.exports = {
  updateKube,
}