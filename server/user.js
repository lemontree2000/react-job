const express = require('express');
const Router = express.Router();
const utils = require('utility');

const User = require('./model').getModel('user');

Router.get('/info', (req, res) => {
    const { user } = req.cookies;
    if (!user) {
        return res.json({ code: 1 });
    }
    User.findOne({ _id: user }, { pwd: 0 }, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '服务器错误' });
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
        return res.json({ code: 1, msg: '重新登陆' })
    })
})

Router.get('/list', (req, res) => {
    // User.remove({},() =>{});
    const { type } = req.query;
    console.log(type);
    User.find(type ? { type } : {}, (err, doc) => {
        return res.json({
            code: 0,
            data: doc
        });
    })
});

// 注册
Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body;
    if (!user || !pwd || !type) {
        return res.json({ code: 1, msg: '请填写必要的参数' })
    }
    User.findOne({ user: user }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }

        const userModel = new User({ user, pwd: md5Pwd(pwd), type });

        userModel.save((e, d) => {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' });
            }
            const { user, type, _id } = d;
            res.cookie('user', _id);
            return res.json({ code: 0, data: { user, type, _id } });
        })
    })
});

// 登陆
Router.post('/login', (req, res) => {
    console.log(req.body);
    const { pwd, user } = req.body;
    if (!user || !pwd) return res.json({ code: 1, msg: '缺少必要参数' })
    User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0 }, (e, doc) => {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' });
        }
        res.cookie('user', doc._id)
        return res.json({ code: 0, data: doc });
    })
});

// 删除
Router.post('/delete', (req, res) => {
    const { _id } = req.body;
    if (!_id) return res.json({ code: 1, msg: '缺少必要参数' })
    User.remove({ _id: _id }, (err, doc) => {
        console.log(doc);
        if (err) {
            return res.json({ code: 1, msg: '服务器错误' });
        }
        if (!doc.n) {
            return res.json({ code: 1, msg: '用户不存在' })
        }
        return res.json({ code: 0 })
    })
})

// 更新
Router.post('/update', (req, res) => {
    const { pwd, _id } = req.body;
    if (!_id) return res.json({ code: 1, msg: '缺少必要参数' })
    const updateData = pwd ? { ...req.body, pwd: md5Pwd(pwd) } : req.body
    User.updateOne({ _id }, updateData, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '服务器错误' });
        }
        return res.json({ code: 0 })
    })
})

Router.post('/updateInfo', (req, res) => {
    const userId = req.cookies.user;
    if (!userId) {
        return res.json({ code: 1 })
    }
    const body = req.body;
    // const updateData = pwd ? { ...req.body, pwd: md5Pwd(pwd) } : req.body
    User.findByIdAndUpdate(userId, body, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '服务器错误' });
        }
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
})


function md5Pwd(pwd) {
    const salt = 'react_job_edward';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;