const shortid = require('shortid');
const { Poll, PollOption, sequelize } = require('../models');

const createPoll = (req, res) => {
  // Create Poll and Options as transaction so that Poll and Option will only
  // be created if both pass validation
  sequelize.transaction((t) => (
    Poll.create({
      name: req.body.name,
      urlId: shortid.generate(),
      endtime: Date.now() + (req.body.endtime * 1000),
      PollOptions: req.body.options,
      // Stop users from being able to create public polls for now
      isPublic: false,
    }, {
      include: [PollOption],
      transaction: t,
    })
  ))
    .then((poll) => res.json(poll))
    .catch((err) => res.status(400).json(err));
};

// Return poll that has given urlId
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
    .catch((err) => res.status(404).send(err.message));
};

// Return all public polls
const getPolls = (req, res) => {
  Poll.findAll({
    attributes: ['id', 'name', 'urlId', 'isPublic'],
    where: {
      isPublic: true,
    },
  })
    .then((polls) => res.json(polls))
    .catch((err) => res.status(404).json(err.message));
};

module.exports.createPoll = createPoll;
module.exports.findPollById = findPollById;
module.exports.getPolls = getPolls;
