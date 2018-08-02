const express = require('express');
const userRouter = require('./user');
const app = express();

app.use('/user', userRouter);




// app.get('/data', function (req, res) {
//     User.find({},function(err,doc) {
//         res.json(doc);
//     })
// })

// app.get('/remove', function (req, res) {
//     User.remove({age: 11}, function(err,doc) {
//         if(!err) {
//             console.log(doc);
//         }
//     })
// })
app.listen(8081, function () {
    console.log('server run at prot 8081');
})
