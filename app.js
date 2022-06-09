const mountRoutes = require("./router/index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const path = require("path");

const DataTransferRoutes = require("./router/dTransfer");
//const downloadRoutes = require("./router/uplo.js");

dotenv.config({ path: "./config.env" });
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
require("./db/conn");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(require("./router/auth"));
app.use("/putdata", DataTransferRoutes);
app.use("/getdata", DataTransferRoutes);
const PORT = process.env.PORT;

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
