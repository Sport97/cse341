const express = require("express");
const router = new express.Router();

router.get("/", require("../controllers").buildIndex);

// router.get("/", require("../database").main);
// router.get("/", require("../database").listDatabases);

module.exports = router;
