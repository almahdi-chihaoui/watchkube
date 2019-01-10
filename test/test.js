const assert = require('assert');
const os = require('os');

const {
  configData,
  dataFilePath,
} = require('./configurations');

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
execScriptFileCmd,
} = require('../src/kubernetes/executeCmds')
describe('config', function() {
  describe('add', function() {
    it('config should be added', function() {
      const data = configData();
      const initialLength = data.configs.length;
      createConfigData('app=test', '/local/test/path/', '/remote/test/path/', data, dataFilePath);
      const newData = configData();
      assert.equal(newData.configs.length, initialLength + 1);
    });
  });
  describe('remove', function() {
    it('config should be removed', function() {
      const data = configData();
      const initialLength = data.configs.length;
      removeConfigData(1, data, dataFilePath);
      const newData = configData();
      assert.equal(newData.configs.length, initialLength - 1);
    });
  });
});

describe('ignore', function() {
  describe('add', function() {
    it('ignored path should be added', function() {
      const data = configData();
      const initialLength = data.ignoredPaths.length;
      createIgnoredPathData('/ignored/path/', data, dataFilePath);
      const newData = configData();
      assert.equal(newData.ignoredPaths.length, initialLength + 1);
    });
  });
  describe('remove', function() {
    it('ignored path should be removed', function() {
      const data = configData();
      const initialLength = data.ignoredPaths.length;
      removeIgnoredPathData(1, data, dataFilePath);
      const newData = configData();
      assert.equal(newData.ignoredPaths.length, initialLength - 1);
    });
  });
});

describe('kubernetes', function() {
  const osType = os.platform() !== 'win32' ? 'unix' : 'windows';
  describe('execScriptFileCmd', function() {
    it('it should return the command for running a script/batch file', function(done) {
      const cmd = execScriptFileCmd(osType, 'scriptFile')
      if (
        osType === 'unix' && cmd === 'sh scriptFile'
        ||
        osType === 'windows' && 'scriptFile'
      )
      {
        done();
      } else {
        done(error);
      }
    });
  });
});