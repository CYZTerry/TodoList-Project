const ejs = require('ejs');
const express = require('express');
const bodyparser = require('body-parser');
// const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");
const _ = require("lodash")

const app = express();
mongoose.connect('mongodb://localhost:27017/todoList', {useNewUrlParser: true, useUnifiedTopology: true});

const dailyItemschema = new mongoose.Schema({
    name: String,
})
let workTasks = [];

const dailyItem = mongoose.model("dailyItem", dailyItemschema)


const homeWork = new dailyItem({
    name: "Homework"
})

const workout = new dailyItem({
    name: "Workout"
})

const appointment = new dailyItem({
    name:"Appointment"
})

const defaultTasks = [homeWork, workout, appointment];

app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"))

app.get("/", function(req, res){
    dailyItem.find({},function(err, tasksList){
        if (tasksList.length === 0){
            dailyItem.insertMany(defaultTasks, function(err){
                if (err){
                    console.log(err);
                }else{
                    console.log("Success");
                }
            })
            res.redirect("/");
        }
        else{
            res.render('list', {Title: "Today", newTasks : tasksList});
        }

    })

});

app.post("/", function(req, res){
    let taskName = req.body.task
    let listName = req.body.list
    const newTasks = new dailyItem({
        name: taskName
    })

    
    if (listName === "Today"){
        newTasks.save()
        res.redirect("/")
    }else{
        customList.findOne({name: listName}, function(err, what){
            if (!what){
                console.log("not such item");
            }else{
                what.todoList.push(newTasks);
                what.save();
                res.redirect("/"+listName)
            }
        })
    }})

app.post("/delete", function(req,res){
    const selected = req.body.checkbox
    const listName = req.body.listName
    if (listName === "Today"){
        dailyItem.deleteOne({_id : selected}, function(err){
            if (!err){
                console.log("Successfully delete")
                res.redirect('/')
            }
        })
    }else{
        customList.findOneAndUpdate({name: listName}, {$pull: {todoList: {_id: selected}}}, function(err, doc){
            if (!err){
                res.redirect("/" + listName)
            }else{
                console.log("error");
            }
        })
    }
})

app.get("/about", function(req,res){
    res.render("about")
})

app.get("/work", function(req, res){
    res.render("list", {Title: "Work", newTasks : workTasks})
})

const customlistSchema = new mongoose.Schema({
    name: String,
    todoList: [dailyItemschema]
})

const customList = mongoose.model("customList", customlistSchema);

app.get("/:listName", function(req, res){
    const singleListname = _.capitalize(req.params.listName);
    customList.findOne({name: singleListname}, function(err, lists){
        if (!err){
            if (!lists){
                const lists = new customList({
                    name: singleListname,
                    todoList: defaultTasks
                })
                lists.save()
                res.redirect("/")
                // Monday.save()
                // 
            }else{
                res.render('list', {Title: lists.name, newTasks : lists.todoList})
            }
        }
        
    })
})


app.listen(3000, function(){
    console.log("The server is running")
});