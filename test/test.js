const assert = require('assert');
const os = require('os');
const path = require('path');

const {
  configData,
  dataFilePath,
} = require('./configurations');

const {
  MAIN_DIR,
} = require('../settings')

const {
  createConfigData,
} = require('../src/data/configs/create');
const {
  removeConfigData,
} = require('../src/data/configs/remove');

const {
  createIgnoredPathData,
} = require('../src/data/ignoredPaths/create');
const {
  removeIgnoredPathData,
} = require('../src/data/ignoredPaths/remove');

const {
  saveData,
} = require('../src/data/importFile/saveData')

const {
  importFile,
} = require('../src/data/importFile')

const {
  applyChanges,
  execScriptFileCmd,
  deleteFile,
  deleteFolder,
} = require('../src/kubernetes/executeCmds')
describe('config', function () {
  describe('add', function () {
    it('config should be added', function () {
      const data = configData();
      const initialLength = data.configs.length;
      createConfigData('app=test', '/local/test/path/', '/remote/test/path/', data, dataFilePath, 'container', 'namespace');
      const newData = configData();
      assert.equal(newData.configs.length, initialLength + 1);
      assert.equal(newData.configs[initialLength].localDir, '/local/test/path/');
      assert.equal(newData.configs[initialLength].remoteDir, '/remote/test/path/');
      assert.equal(newData.configs[initialLength].selector, 'app=test');
      assert.equal(newData.configs[initialLength].containerName, 'container');
      assert.equal(newData.configs[initialLength].nameSpace, 'namespace');
    });
  });
  describe('remove', function () {
    it('config should be removed', function () {
      const data = configData();
      const initialLength = data.configs.length;
      removeConfigData(1, data, dataFilePath);
      const newData = configData();
      assert.equal(newData.configs.length, initialLength - 1);
    });
  });
});

describe('ignore', function () {
  describe('add', function () {
    it('ignored path should be added', function () {
      const data = configData();
      const initialLength = data.ignoredPaths.length;
      createIgnoredPathData('/ignored/path/', data, dataFilePath);
      const newData = configData();
      assert.equal(newData.ignoredPaths.length, initialLength + 1);
    });
  });
  describe('remove', function () {
    it('ignored path should be removed', function () {
      const data = configData();
      const initialLength = data.ignoredPaths.length;
      removeIgnoredPathData(1, data, dataFilePath);
      const newData = configData();
      assert.equal(newData.ignoredPaths.length, initialLength - 1);
    });
  });
});

describe('importFile', function () {
  describe('saveData', function () {
    it('configs should be added to data file', function () {
      const data = configData();
      const initialIgnoredPathsLength = data.ignoredPaths.length;
      const initialConfigsLength = data.configs.length;
      const addedConfigs = [
        {
          selector: "app=svc",
          localDir: "/home/user/git/app",
          remoteDir: "/app",
          containerName: "c1",
          nameSpace: "ns",
        }
      ];
      const addedIgnoredPath = [
        {
          path: "/**/node_modules/*",
        },
      ];

      saveData(addedConfigs, addedIgnoredPath, data, dataFilePath);

      const newData = configData();

      assert.equal(newData.ignoredPaths.length, initialIgnoredPathsLength + 1);
      assert.equal(newData.configs.length, initialConfigsLength + 1);
      assert.equal(newData.configs[newData.configs.length - 1].selector, addedConfigs[0].selector);
      assert.equal(newData.configs[newData.configs.length - 1].localDir, addedConfigs[0].localDir);
      assert.equal(newData.configs[newData.configs.length - 1].remoteDir, addedConfigs[0].remoteDir);
      assert.equal(newData.configs[newData.configs.length - 1].containerName, addedConfigs[0].containerName);
      assert.equal(newData.configs[newData.configs.length - 1].nameSpace, addedConfigs[0].nameSpace);
      assert.equal(newData.ignoredPaths[newData.ignoredPaths.length - 1].path, addedIgnoredPath[0].path);
    });
  });
});

describe('kubernetes', function () {
  const osType = os.platform() !== 'win32' ? 'unix' : 'windows';
  const platform = 'kubernetes';
  describe('execScriptFileCmd', function () {
    it('it should return the command for running a script/batch file', function (done) {
      const cmd = execScriptFileCmd(osType, 'scriptFile')
      if (
        osType === 'unix' && cmd === 'sh scriptFile'
        ||
        osType === 'windows' && cmd === 'scriptFile'
      ) {
        done();
      } else {
        done(error);
      }
    });
  });
  describe('apply changes', function () {
    it('it should return the command for applying changes', function (done) {
      const cmd = applyChanges(platform, osType, 'app=test', '/local/path/', '/remote/path', 'c1', 'ns');
      if (
        osType === 'unix'
        && cmd === `${MAIN_DIR}/src/kubernetes/unix/cp.sh -ldir /local/path/ -s app=test -rdir /remote/path -c c1 -n ns`
        ||
        osType === 'windows'
        && cmd === `${MAIN_DIR}\\src\\kubernetes\\windows\\cp -ldir /local/path/ -s app=test -rdir /remote/path -c c1 -n ns`
      ) {
        done();
      } else {
        done(error);
      }
    });
  });
  describe('delete file', function () {
    it('it should return the command for deleting a file', function (done) {
      const cmd = deleteFile(platform, osType, 'app=test', '/remote/path', 'c1', 'ns');
      if (
        osType === 'unix'
        && cmd === `${MAIN_DIR}/src/kubernetes/unix/rm.sh -s app=test -rdir /remote/path -c c1 -n ns`
        ||
        osType === 'windows'
        && cmd === `${MAIN_DIR}\\src\\kubernetes\\windows\\rm -s app=test -rdir /remote/path -c c1 -n ns`
      ) {
        done();
      } else {
        done(error);
      }
    });
  });
  describe('delete folder', function () {
    it('it should return the command for deleting a folder', function (done) {
      const cmd = deleteFolder(platform, osType, 'app=test', '/remote/path', 'c1', 'ns');
      if (
        osType === 'unix'
        && cmd === `${MAIN_DIR}/src/kubernetes/unix/rm.sh -s app=test -rdir /remote/path -c c1 -n ns -rmdir`
        ||
        osType === 'windows'
        && cmd === `${MAIN_DIR}\\src\\kubernetes\\windows\\rm -s app=test -rdir /remote/path -c c1 -n ns -rmdir`
      ) {
        done();
      } else {
        done(error);
      }
    });
  });
});