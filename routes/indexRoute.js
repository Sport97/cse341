const express = require("express");
const router = new express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.buildIndex);

module.exports = router;
