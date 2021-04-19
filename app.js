const ejs = require('ejs');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var items = [];

app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    var today = new Date();
    var CurrentDay = today.getDay();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options);

    res.render('list', {whatDay: day, newTasks : items});
});

app.post("/", function(req, res){
    var addTask = req.body.task
    items.push(addTask)

    res.redirect("/")
})


app.listen(3000, function(){
    console.log("The server is running")
});