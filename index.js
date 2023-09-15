const express = require('express');
const mogoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const port = 3030;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api', (req, res) => {
    res.send('POST request to the homepage');
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});