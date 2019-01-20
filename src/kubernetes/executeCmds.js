'use strict'

const path = require('path');

const {
  MAIN_DIR,
} = require('../../settings');

const buildArg = (opt, value) => {
  return value.length > 0 ? ` ${opt} ${value}` : '';
}

const execScriptFileCmd = (os, scriptFile) => {
  const cmd = {
    unix: `sh ${scriptFile}`,
    windows: `${scriptFile}`,
  }
  return cmd[os];
};

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

const deleteFolder = (
  platform,
  os,
  selector,
  remotePath,
  containerName,
  nameSpace,
) => {
  const scriptFile = {
    unix: 'rm.sh fldr',
    windows: 'rm fldr',
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