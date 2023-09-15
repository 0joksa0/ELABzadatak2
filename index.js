const express = require('express');
const mogoose = require('mongoose');
const Task = require('./models/Task');

const dbUrl = 'mongodb+srv://chessGame:chess123@nodecc.9ciscng.mongodb.net/toDoList?retryWrites=true&w=majority'

mogoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to db');
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
        
    });
}).catch((err) => {
    console.log(err);
});

const app = express();
const port = 3030;



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
    Task.find().then((result) => {
        res.send(result);
    });
});

app.post('/api', (req, res) => {
    var task = new Task(req.body);
    task.save();
    res.send('POST request to the homepage');
});
