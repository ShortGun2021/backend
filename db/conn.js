const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.connect(DB).then((result) => {
    console.log('Connected Successfully');
}).catch((err) => {
    console.log('Not Connected');
    console.log(err);
});;