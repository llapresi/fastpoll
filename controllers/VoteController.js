const { PollOption } = require('../models');

const makeVote = (req, res) => {
  PollOption.findByPk(req.body.optionId)
    .then((option) => option.increment('votes'))
    .then((option) => option.reload())
    .then((option) => res.json(option));
};

module.exports.makeVote = makeVote;
