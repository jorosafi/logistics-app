const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function (req, res) {
  res.json({
    message: "router working!",
  });
});

router.get("/view-items", controller.getAllItems);

module.exports = router;
