const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/test", function (req, res) {
  res.json({
    message: "router working!",
  });
});

router.get("/view-items", controller.getAllItems);

router.post("/add-item", controller.addItem);

router.post("/delete-item", controller.deleteItem);

router.post("/edit-item", controller.editItem);

module.exports = router;
