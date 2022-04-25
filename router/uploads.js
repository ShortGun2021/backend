const route = require("express").Router();
const controller = require("../controllers/controller");
const store = require("../middleware/multer");

route.post("/uploadmultiple", store.array("image", 2), controller.uploads);

module.exports = route;
