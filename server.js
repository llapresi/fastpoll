require('dotenv').config();
const express = require('express');
const path = require('path');
const { PollController, VoteController } = require('./controllers');

const app = express();
const port = process.env.PORT;

// use json
app.use(express.json());

// use build directory
app.use(express.static(path.join(__dirname, 'client/build')));
// Poll API routes
app.post('/api/polls', PollController.createPoll);
// Return polls for id
app.get('/api/polls/:id', PollController.findPollById);
// Return all polls
app.get('/api/polls/', PollController.getPolls);

// Vote API routes
// Vote for a PollOption (using PollOption id)
app.post('/api/vote', VoteController.makeVote);

// Return our built client if given request that doesn't match any of the above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
