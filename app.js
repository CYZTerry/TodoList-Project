const ejs = require('ejs');
const express = require('express');
const bodyparser = require('body-parser');
const date = require(__dirname + "/date.js")

const app = express();

let items = [];
let workTasks = [];

app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"))

app.get("/", function(req, res){
    let day = date.getDate()
    res.render('list', {Title: day, newTasks : items});
});

app.post("/", function(req, res){
    let addTask = req.body.task
    if (req.body.list === "Work"){
        workTasks.push(addTask)
        res.redirect("/work")
    }else{
        items.push(addTask)

        res.redirect("/")
    }

})

app.get("/about", function(req,res){
    res.render("about")
})

app.get("/work", function(req, res){
    res.render("list", {Title: "Work", newTasks : workTasks})
})


app.listen(3000, function(){
    console.log("The server is running")
});