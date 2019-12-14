const { PollOption } = require('../models');

const makeVote = (req, res) => {
  PollOption.findByPk(req.body.optionId)
    .then((option) => option.increment('votes'))
    .then((option) => option.reload())
    .then((option) => res.json(`You voted for ${option.name}`))
    .catch((err) => res.status(400).json(err.message));
};

module.exports.makeVote = makeVote;
