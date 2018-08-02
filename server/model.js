const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/react-job';


// 连接mongo  
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
})
// mongodb 里面的集合类似于mysql 的表, mongo 里有文档，字段的概念

const User = mongoose.model('user', new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: String, require: true }
}));

User.create({
    user: 'imooc',
    age: 11
}, function (err, doc) {
    if (!err) {
        console.log(doc);
    } else {
        console.log(err);
    }
})