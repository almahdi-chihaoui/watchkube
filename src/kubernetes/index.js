'use strict'

const { exec } = require('child_process');

const {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
} = require('./executeCmds');

/**
 * It executes the builded command from execScriptFileCmd and applyChanges, deleteFile or deleteFolder functions based on the watcher's events.
 * @param {string} os - The current OS.
 * @param {string} event - The watcher event.
 * @param {string} selector - The pod selector.
 * @param {string} localPath - Local path of the modified file.
 * @param {string} remotePath - Remote path of the modified file.
 * @param {string} containerName - The name of the targeted container (for pod with multiple containers).
 * @param {string} nameSpace - The targeted namespace.
 */

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
        os,
        selector,
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