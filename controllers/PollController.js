const shortid = require('shortid');
const { Poll, PollOption } = require('../models');

const createPoll = (req, res) => {
  Poll.create({
    name: req.body.name,
    urlId: shortid.generate(),
    endtime: Date.now() + (req.body.endtime * 1000),
    PollOptions: req.body.options,
  }, {
    include: [PollOption],
  })
    .then((poll) => res.json(poll));
};

// Return polls for id
const findPollById = (req, res) => {
  Poll.findOne({
    where: { urlId: req.params.id },
    attributes: ['id', 'name', 'urlId'],
    include: [{ model: PollOption, attributes: ['id', 'name', 'votes'] }],
  })
    .then((poll) => {
      PollOption.sum('votes', { where: { PollId: poll.id } }).then((sum) => {
        const jsonObj = JSON.parse(JSON.stringify(poll));
        jsonObj.totalVotes = sum;
        res.setHeader('content-type', 'application/json');
        return res.send(jsonObj);
      });
    })
    .catch((err) => res.json(err.message));
};

// Return all polls
const getPolls = (req, res) => {
  Poll.findAll({
    attributes: ['id', 'name', 'urlId'],
  })
    .then((polls) => res.json(polls))
    .catch((err) => res.json(err.message));
};

module.exports.createPoll = createPoll;
module.exports.findPollById = findPollById;
module.exports.getPolls = getPolls;
