const mongoose = require("mongoose");

// const DB =s process.env.DATABASE;
const DB =
  "mongodb+srv://shortgun:sXtNpAMtcgQMBNzq@cluster0.rsjtc.mongodb.net/shortgun?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then((result) => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log("Not Connected");
    console.log(err);
  });
