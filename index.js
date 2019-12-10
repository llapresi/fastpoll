require('dotenv').config()
const express = require('express');
const shortid = require('shortid');
const { Poll, PollOption, PollVote } = require('./models');
const app = express();
const port = 3000;

// use json
app.use(express.json());

app.get('/', (req, res) => res.send('Hello Pointman!'))

app.post('/polls', (req, res) => {
    Poll.create({
        name: req.body.name,
        urlId: shortid.generate(),
        endtime: Date.now() + req.body.endtime,
        PollOptions: req.body.options
    },{
        include: [PollOption]
    });
    res.json('yeah');
});

app.get('/polls/:id', (req, res) => {
    Poll.findOne({
        where: {urlId : req.params.id},
        include: [PollOption]
    }).then(poll => {
        res.json(poll);
    })
});

// app.get('/polls', (req, res) => {
//     res.json(polls);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))