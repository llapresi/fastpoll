const { makeMockModels } = require('sequelize-test-helpers');
const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const { mockRequest, mockResponse } = require('mock-req-res');
const { match, stub } = require('sinon');

chai.use(require('sinon-chai'));

const PollOption = {
  findByPk: stub(),
};
const mockModels = makeMockModels({ PollOption });
const { expect } = chai;

const controller = proxyquire('../VoteController', {
  '../models': mockModels,
});

const res = mockResponse();
const req = mockRequest();

describe('controllers/VoteController', () => {
  context('makeVote', () => {
    context('good request', () => {
      const testOption = {
        name: 'test response',
        increment: stub(),
        reload: stub(),
      };

      before(async () => {
        testOption.increment.resolves(testOption);
        testOption.reload.resolves(testOption);
        PollOption.findByPk.resolves(testOption);
        controller.makeVote(req, res);
      });

      after(() => {
        testOption.increment.reset();
        testOption.reload.reset();
        PollOption.findByPk.reset();
        res.json.resetHistory();
        PollOption.findByPk.resetHistory();
      });


      it('calls findByPk function', () => {
        expect(PollOption.findByPk).to.have.been.called;
      });

      it('sends json', () => {
        expect(res.json).to.have.been.calledWith(match(`You voted for ${testOption.name}`));
      });
    });

    context('bad request', () => {
      before(async () => {
        PollOption.findByPk.resolves(undefined);
        controller.makeVote(req, res);
      });

      after(() => {
        PollOption.findByPk.reset();
        res.status.resetHistory();
      });

      after(() => {
        PollOption.findByPk.resetHistory();
      });

      it('calls findByPk function', () => {
        expect(PollOption.findByPk).to.have.been.called;
      });

      it('sends error with 400 code', () => {
        expect(res.status).to.have.been.calledWith(match(400));
      });
    });
  });
});
