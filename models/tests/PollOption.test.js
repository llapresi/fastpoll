const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const PollOptionModel = require('../PollOption');

describe('models/PollOption', () => {
  const Model = PollOptionModel(sequelize, dataTypes);
  const instance = new Model();
  checkModelName(Model)('PollOption');
  context('properties', () => {
    ['name', 'votes'].forEach(checkPropertyExists(instance));
  });
});
