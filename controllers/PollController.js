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
    include: [PollOption],
  })
    .then((poll) => res.json(poll));
};

// Return all polls
const getPolls = (req, res) => {
  Poll.findAll({
    include: [PollOption],
  })
    .then((polls) => res.json(polls));
};

module.exports.createPoll = createPoll;
module.exports.findPollById = findPollById;
module.exports.getPolls = getPolls;
