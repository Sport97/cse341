const express = require("express");
const router = new express.Router();

router.get("/", require("../controllers/index").buildIndex);

module.exports = router;
