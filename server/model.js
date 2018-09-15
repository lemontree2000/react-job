const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/react-chat';


// 连接mongo  
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
})
// mongodb 里面的集合类似于mysql 的表, mongo 里有文档，字段的概念

// const User = mongoose.model('user', new mongoose.Schema({
//     user: { type: String, require: true },
//     age: { type: String, require: true }
// }));


const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        // 头像
        'avatar': { type: String },
        // 简介
        'desc': { type: String },
        // 职位
        'title': { type: String },
        // boss 有以下两个字段
        'company': { type: String },
        'money': { type: String }
    },
    chat: {
        'chatid': { type: String, require: true },
        'from': { type: String, require: true },
        'to': { type: String, require: true },
        'content': { type: String, require: true, default: '' },
        'create_time': { type: Number, require: true, default: () => new Date().getTime() },
        'read': { type: Boolean, default: false }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}