const { makeMockModels } = require('sequelize-test-helpers');
const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const { mockRequest, mockResponse } = require('mock-req-res');
const { match, stub } = require('sinon');

chai.use(require('sinon-chai'));

const Poll = { findOne: stub(), findAll: stub(), create: stub() };
const PollOption = {
  findOne: stub(), findAll: stub(), create: stub(), sum: stub(),
};
const mockModels = makeMockModels({ Poll, PollOption });
const { expect } = chai;

const controller = proxyquire('../PollController', {
  '../models': mockModels,
});

let res = mockResponse();
let req = mockRequest();


describe('controllers/PollController', () => {
  context('findPollById', () => {
    before(() => {
      PollOption.sum.resolves(21);
      req = mockRequest({
        params: {
          id: 1,
        },
      });
    });

    after(() => {
      PollOption.sum.reset();
      req = mockRequest();
      res = mockResponse();
    });

    context('poll exists', () => {
      const mockData = { id: 1, name: 'Test Poll', urlId: 'fsf_sfs12' };
      before(async () => {
        Poll.findOne.resolves(mockData);
        controller.findPollById(req, res);
      });

      after(() => {
        res.send.resetHistory();
        Poll.findOne.reset();
      });

      it('calls findOne function', () => {
        expect(Poll.findOne).to.have.been.called;
      });

      it('returns Poll', () => {
        expect(res.send).to.have.been.calledWith(match({ ...mockData, totalVotes: 21 }));
      });
    });

    context('poll does not exist', () => {
      before(async () => {
        Poll.findOne.resolves(undefined);
        controller.findPollById(req, res);
      });

      after(() => {
        res.send.resetHistory();
        res.status.resetHistory();
        Poll.findOne.reset();
      });

      it('calls findOne function', () => {
        expect(Poll.findOne).to.have.been.called;
      });

      it('sends response with 404 code', () => {
        expect(res.status).to.have.been.calledWith(match(404));
      });

      it('returns error msg', async () => {
        expect(res.send).to.have.been.calledWith(match('Cannot read property \'id\' of undefined'));
      });
    });
  });

  context('getPolls', () => {
    context('polls exist', () => {
      const mockData = { test: 'testy mctestface' };
      before(async () => {
        Poll.findAll.resolves(mockData);
        controller.getPolls(req, res);
      });

      after(() => {
        res.json.resetHistory();
        Poll.findAll.reset();
      });

      it('calls findAll function', () => {
        expect(Poll.findAll).to.have.been.called;
      });

      it('returns Poll', () => {
        expect(res.json).to.have.been.calledWith(match(mockData));
      });
    });

    context('polls do not exist', () => {
      before(async () => {
        Poll.findAll.resolves(undefined);
        controller.getPolls(req, res);
      });

      after(() => {
        res.status.resetHistory();
        res.json.resetHistory();
        Poll.findAll.reset();
      });

      it('calls findAll function', () => {
        expect(Poll.findAll).to.have.been.called;
      });

      it('sends empty array', () => {
        expect(res.json).to.have.been.calledWith(undefined);
      });
    });
  });

  // createModel cannot be tested right now as sequelize-test-helpers lacks support for
  // mocking transactions. Consider making an issue + PR for this on sth's github.
});
