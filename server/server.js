const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// // 中间件
app.use(cookieParser('userid'));
app.use(bodyParser.json());

// 路由
app.use('/user', userRouter);

app.listen(8081, function () {
    console.log('server run at prot 8081');
})
