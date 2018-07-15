const express = require('express');
const mongoose = require('mongoose');

// 连接mongo  
const DB_URL = 'mongodb://localhost:27017/react-job';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
    console.log('mongo connect success');
})

// mongodb 里面的集合类似于mysql 的表, mongo 里有文档，字段的概念

const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: String, require: true}
}));


User.create({
    user: 'imooc',
    age: 11
},function(err,doc) {
    if(!err) {
        console.log(doc);
    } else {
        console.log(err);
    }
})

const app = express();

app.get('/', function (req, res) {
    res.send('<h1>Hello111 Express</h1>')
})
app.get('/data', function (req, res) {
    User.find({},function(err,doc) {
        res.json(doc);
    })
})

app.get('/remove', function (req, res) {
    User.remove({age: 11}, function(err,doc) {
        if(!err) {
            console.log(doc);
        }
    })
})
app.listen(8081, function () {
    console.log('server run at prot 8081');
})
