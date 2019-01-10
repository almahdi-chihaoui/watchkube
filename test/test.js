const assert = require('assert');

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
  configData,
  dataFilePath,
} = require('./configurations');

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