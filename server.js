require('dotenv').config();
const express = require('express');
const { PollController, VoteController } = require('./controllers');

const app = express();
const port = 4000;

// use json
app.use(express.json());

app.get('/', (req, res) => res.send('Hello Pointman!'));

// Poll API routes
app.post('/polls', PollController.createPoll);
// Return polls for id
app.get('/polls/:id', PollController.findPollById);
// Return all polls
app.get('/polls/', PollController.getPolls);

// Vote API routes
// Vote for a PollOption (using PollOption id)
app.post('/vote', VoteController.makeVote);

// app.get('/polls', (req, res) => {
//     res.json(polls);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
