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

var fs = require("fs");
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
app.set("view engine", "ejs");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dirName = "./public/uploads/";

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    cb(null, dirName);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
const PORT = process.env.PORT;

var imgModel = require("./model/nftCreateSchema");
app.get("/imgData", (req, res) => {
  imgModel.find({}, (err, items) => {
    //console.log(...items);
    res.status(200).json(...items);

    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    }
    //  else {
    //   res.render("imagesPage", { items: items });
    // }
  });
});

//Uploading Route:
app.post("/putData", upload.single("image"), (req, res, next) => {
  console.log(req.file.destination); // image url
  // console.log(imgModel);
  //console.log(req.body);

  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + `/public/uploads/` + req.file.originalname)
      ),
      contentType: "image/png",
    },
  };

  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/");
    }
  });
  res.status(200).json(obj);
});
mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
