const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;
const PollModel = require('../Poll');

describe('models/Poll', () => {
  const Model = PollModel(sequelize, dataTypes);
  const instance = new Model();
  checkModelName(Model)('Poll');
  context('properties', () => {
    ['name', 'urlId', 'endtime'].forEach(checkPropertyExists(instance));
  });

  context('associations', () => {
    const PollOption = 'dummy option';

    before(() => {
      Model.associate(PollOption);
    });

    it('defined a hasMany association with PollOptions', () => {
      expect(Model.hasMany).to.have.been.calledWith(PollOption);
    });
  });
});
