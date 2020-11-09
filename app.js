const express = require("express");
const path = require("path");
const app = express();
const bodyparser=require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String
    
  });

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get("/",(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
});
app.get("/contact",(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
});
app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(4000).send("Item was not save to the databse")
    });
    //res.status(200).render('contact.pug');
});

app.listen(port ,()=>{
    console.log(`The application started successfully ${port}`)
});