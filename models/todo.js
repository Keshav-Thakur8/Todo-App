const mongoose = require("mongoose");
//make schema using new keyword
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})


const Task = mongoose.model('Task', taskSchema);
//export the task
module.exports = Task;