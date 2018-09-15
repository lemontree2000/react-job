const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Chat = require('./model').getModel('chat');

const app = express();
const Server = require('http').Server(app)
const io = require('socket.io')(Server);


io.on('connection', (socket) => {
    socket.on('sendmsg', (data) => {
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_')
        Chat.create({ chatid, from, to, content: msg }, (err, d) => {
            if (!err) {
                io.emit('recvmsg', Object.assign({}, d._doc))
            }
        })
    })
})

// 中间件
app.use(cookieParser());
app.use(bodyParser.json());
// 路由
app.use('/user', userRouter);

Server.listen(8081, function () {
    console.log('server run at prot 8081');
})
