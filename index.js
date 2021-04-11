const express = require('express');
const path = require('path');
//port number on which server runs
const port = 8005;


//require mongoose
const db = require('./config/mongoose');
//accesing task through router
const Task = require('./models/todo');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

//using __dirname so that other person don't need to change the path again and again
app.set('views', path.join(__dirname, 'views'));

//middleware who encode url
app.use(express.urlencoded());

//accesing the static file
app.use(express.static('assets'));

//array of objects
var todoList = [
    {
        description: "keshav",
        category: "989898989",
        date: "07-04-2021"
    },
    {
        description: "ke",
        category: "989898988",
        date: "07-04-2021"
    },
    {
        description: "av",
        category: "989898977",
        date: "07-04-2021"
    }

]

// get the task through routing with get method (make a request and get response) and use controller for action
app.get('/', function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            console.log('Error in fetching task from db');
            return;
        }
        return res.render('home', {
            title: "My todo-list app",
            todo_List: tasks
        })
    })
})

//Create a new Task
app.post('/create-task', function(req,res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err, newContact){
        if(err){
            console.log("error in creating a task");
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });
});


// for deleting a task
app.post('/delete-task', function(req, res){
//find the contact in the database using key to delete
    Object.keys(req.body).forEach(function(key){
        Task.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting an list from database',err);
                return;
            }
            console.log('One list is deleted');
            
        });
    });
    return res.redirect('back');

});


// if gets  the error in running the server on port
app.listen(port, function(err){
    if(err){
        console.log('Error in running server', err);

    }
    console.log('Server is up and Running on port:', port);
})
