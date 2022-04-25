const router = require("express").Router();
const controller = require("../controllers/controller");
const store = require("../middleware/multer");

router.post("/upload", store.array("image", 2), controller.uploads);
router.get("/download", controller.download);

module.exports = router;
