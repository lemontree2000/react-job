const express = require('express');
const Router = express.Router();
const utils = require('utility');

const User = require('./model').getModel('user');

Router.get('/info', (req, res) => {
    return res.json({ code: 1 });
})

Router.get('/list', (req, res) => {
    // User.remove({},() =>{});
    User.find({}, (err, doc) => {
        return res.json(doc);
    })
});

Router.post('/register', (req, res) => {
    console.log(req.body);
    const { user, pwd, type } = req.body;
    User.findOne({ user: user }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        User.create({ user, pwd: md5Pwd(pwd), type }, (e, d) => {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' });
            }
            return res.json({ code: 0 })
        });
    })
});

Router.post('/login', (req, res) => {
    console.log(req.body);
    const { pwd, user } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0 },(e, doc) => {
        if(!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' });
        }
        res.cookie('userId', doc._id)
        return res.json({ code: 0, data: doc });
    })
});



function md5Pwd(pwd) {
    const salt = 'react_job_edward';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;