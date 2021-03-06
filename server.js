const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const Router = express.Router();

const app = express();
// app.use(cors());
var corsOptions = {
  origin: '*',
  methods: "GET, PUT, POST"
}
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb" }));
dotenv.config();

require("./db/conn");
// const User = require('./model/userSchema');
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World from the Server");
});


app.use("/user", require("./router/auth"));
app.use("/nft", require("./router/NFTs"));
// app.use("/nft", require("./router/dTransfer"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
