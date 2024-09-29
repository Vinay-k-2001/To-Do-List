// INCLUDING EXPRESS AND BODY-PARSER FRAMEWORKS
const express= require('express');
const bodyParser = require('body-parser');
const exp = require('constants');
const punycode = require('punycode');


// CALLING EXPRESS
var app = express();

// CALLING EJS
app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:true}));

// IMPORTING STATIC FILES TO EXPRESS FRAMEWORK
app.use(express.static('public'));

// INCLUDING MONGOOSE FRAMEWORK
const mongoose = require('mongoose');


// CONNECTION ESTABLISHMENT
const MONGO_URL = 'mongodb+srv://vicky:20011307@cluster0.jgfii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//mongodb+srv://vicky:20011307@cluster0.jgfii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// CREATING NEW SCHEMA TYPE COLLECTION WITH ARGS & RESPECTIVE DATATYPES
const  trySchema = new mongoose.Schema({
    name : String
})

// INCLUDING SCHEMA
const item = mongoose.model('task',trySchema);

// ELEMENTS
const todo1 = new item({
    name: 'Create some videos',
})

const todo2 = new item({
    name: 'Create some projects',
})

const todo3 = new item({
    name: 'Learn DSA',
})

const todo4 = new item({
    name: 'Learn REACT',
})

/*
// SAVING ELEMENT 
todo1
  .save({ wtimeout: 30000 })
  .then(() => {
    console.log("Element saved successfully!");
  })
  .catch((err) => {
    console.error(err);
  });

// INSERTING ELEMENTS INTO DB
item
  .insertMany([todo2,todo3,todo4])
  .then(() => {
    console.log("Elements INSERTED successfully!");
  })
  .catch((err) => {
    console.error(err);
  });
*/

// EXPRESS SERVER
app.listen('2000',function(){
    console.log('Server is Running!!');
})


// GET METHOD FOR GETTING HTML INPUT ELEMENTS WHICH IS TAKEN FROM MONGOOSE DB DEFUALT
app.get('/', function(req,res){
    item
        .find()
        .then((todo) => {
            res.render('list',{dayej : todo});
        })

        .catch((err)=>{
            console.log(err)
        })
});

// POST METHOD FOR HTML INPUT ELEMENTS TO ARRAY
app.post('/', function(req,res){

    // TAKING INPUT EL1 ELEMENT FROM WEBPAGE
    const itemName = req.body.el1;
    // INCLUDING ELEMENT IN DB
    const todo5 = new item({
        name: itemName
    })

    // SAVING ELEMENT 
    todo5
        .save({ wtimeout: 30000 })
        .then(() => {
        console.log("Element saved successfully!");
        })
        .catch((err) => {
        console.error(err);
        });
    
    // AFTER SAVING, REDIRECTING TO HOMEPAGE
    res.redirect('/');
})


app.post('/delete',function(req,res){
    const checked = req.body.checkbox1;

    item
        .findByIdAndRemove(checked)
        .then((todo)=> {
            console.log('Deleted!!')
            res.redirect('/');
          })
        
          .catch((err)=> {
            console.log(err)
          });
})