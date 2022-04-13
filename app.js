const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser =  require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const cors = require('cors');  app.use(cors());
dotenv.config({path: './config.env'});
require('./db/conn');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT; 


app.listen(PORT, () =>{
    console.log(`Server is Running at port ${PORT}`)
})