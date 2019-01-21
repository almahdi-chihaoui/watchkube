'use strict'

const path = require('path');

const {
  MAIN_DIR,
} = require('../../settings');

/**
 * Build a script argument with an option.
 * @param {string} opt - The argument's option.
 * @param {string} value - The argument's value.
 */

const buildArg = (opt, value) => {
  return value.length > 0 ? ` ${opt} ${value}` : '';
}

/**
 * Return the command for running the script file.
 * @param {string} os - The current OS.
 * @param {string} scriptFile - The script file path and its args.
 */

const execScriptFileCmd = (os, scriptFile) => {
  const cmd = {
    unix: `sh ${scriptFile}`,
    windows: `${scriptFile}`,
  }
  return cmd[os];
};

/**
 * Build the absolute path for the cp.sh script and join it with its args.
 * @param {string} platform - The targeted container orchestration platform.
 * @param {string} os - The current OS.
 * @param {string} selector - The pod selector.
 * @param {string} localPath - Local directory, which is the path of the sevice's project.
 * @param {string} remotePath - Remote directory, which is the path where the project is hosted in the cotainer.
 * @param {string} containerName - The name of the targeted container (for pod with multiple containers).
 * @param {string} nameSpace - The targeted namespace.
 */

const applyChanges = (
  platform,
  os,
  selector,
  localPath,
  remotePath,
  containerName,
  nameSpace,
) => {
  const scriptFile = {
    unix: 'cp.sh',
    windows: 'cp',
  }
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]}`)
    + buildArg('-ldir', localPath)
    + buildArg('-s', selector)
    + buildArg('-rdir', remotePath)
    + buildArg('-c', containerName)
    + buildArg('-n', nameSpace);
};

/**
 * Build the absolute path for the rm.sh script and join it with its args.
 * @param {string} platform - The targeted container orchestration platform.
 * @param {string} os - The current OS.
 * @param {string} selector - The pod selector.
 * @param {string} remotePath - Remote directory, which is the path where the project is hosted in the cotainer.
 * @param {string} containerName - The name of the targeted container (for pod with multiple containers).
 * @param {string} nameSpace - The targeted namespace.
 */

const deleteFile = (
  platform,
  os,
  selector,
  remotePath,
  containerName,
  nameSpace,
) => {
  const scriptFile = {
    unix: 'rm.sh',
    windows: 'rm',
  }
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]}`)
    + buildArg('-s', selector)
    + buildArg('-rdir', remotePath)
    + buildArg('-c', containerName)
    + buildArg('-n', nameSpace);
};

/**
 * Build the absolute path for the rm.sh script and join it with its args, one of the joined args is
 * -rmdir which is used to tell the script that we are removing a folder.
 * @param {string} platform - The targeted container orchestration platform.
 * @param {string} os - The current OS.
 * @param {string} selector - The pod selector.
 * @param {string} remotePath - Remote directory, which is the path where the project is hosted in the cotainer.
 * @param {string} containerName - The name of the targeted container (for pod with multiple containers).
 * @param {string} nameSpace - The targeted namespace.
 */

const deleteFolder = (
  platform,
  os,
  selector,
  remotePath,
  containerName,
  nameSpace,
) => {
  const scriptFile = {
    unix: 'rm.sh',
    windows: 'rm',
  }
  return path.join(MAIN_DIR, `/src/${platform}/${os}/${scriptFile[os]}`)
    + buildArg('-s', selector)
    + buildArg('-rdir', remotePath)
    + buildArg('-c', containerName)
    + buildArg('-n', nameSpace)
    + ' -rmdir'
};

module.exports = {
  execScriptFileCmd,
  applyChanges,
  deleteFile,
  deleteFolder,
}