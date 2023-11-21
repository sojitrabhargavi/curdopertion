const express = require('express');

const port = 8001;

const path=require('path');

const app = express();

const fs = require('fs')

// const db = require('./config/mongoos')

const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://sojitrabhargavi7:02072004@cluster0.rbmwts1.mongodb.net/bhargavi", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log(err));

const student = require('./models/Student')

app.use(express.urlencoded())

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use("/",require("./routes"))

// app.use("/post",require("./routes/post"))

app.listen(port,function(err){
    if(err)
    {
        console.log(err)
    }
    console.log(`sever running in port,${port}`)
})