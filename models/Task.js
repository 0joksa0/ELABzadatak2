const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const TaskSchema = new Schema({
    date: Date,
    time: String,
    name: String,
    description: String
});

const Task = mogoose.model('Task', TaskSchema);
module.exports = Task;