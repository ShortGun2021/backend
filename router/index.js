const auth = require("./auth");
const createNFT = require("./createNFT");
const router = require("express").Router();
const controller = require("../controllers/controller");
const store = require("../middleware/multer");

router.get("/download", controller.download);

module.exports = (app) => {
  app.get("/", function (req, res) {
    req.session.name = "Shortgun NFT Marketplace";
    res.send("Session Set");
  });
  app.get("/session", function (req, res) {
    var name = req.session.name;
    res.send(name);
  });
  app.use("/auth", auth);
  app.use("/createNFT", createNFT);
  app.post("/upload", store.array("image", 2), controller.uploads);
  app.get("/download", controller.download);
};
