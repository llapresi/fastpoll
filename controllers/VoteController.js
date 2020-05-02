const { PollOption } = require('../models');
const Pusher = require('../pusher');

const makeVote = (req, res) => {
  PollOption.findByPk(req.body.optionId)
    .then((option) => option.increment('votes'))
    .then((option) => option.reload())
    .then((option) => {
      Pusher.trigger(req.body.pollId, 'voted', { option: req.body.optionId });
      return res.json(`You voted for ${option.name}`);
    })
    .catch((err) => res.status(400).json(err.message));
};

module.exports.makeVote = makeVote;
