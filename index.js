const express = require('express');
const shortid = require('shortid');
const app = express();
const port = 3000;

// use json
app.use(express.json());

// Create in memory store for polls
let polls = [];

app.get('/', (req, res) => res.send('Hello Pointman!'))

app.post('/polls', (req, res) => {
    let newPoll = req.body;
    newPoll.id = shortid.generate();
    polls.push(newPoll);
    res.json(newPoll);
});

app.get('/polls/:id', (req, res) => {
    for(let i = 0; i < polls.length; i++) {
        if(polls[i].id === req.params.id) {
            return res.json(polls[i]);
        }
    };
    return res.json('no poll with this id');
});

app.get('/polls', (req, res) => {
    res.json(polls);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))