const express = require("express");
const router = new express.Router();

router.get("/", require("../controllers/index").buildIndex);

router.use("/", require("./swagger"));
router.use("/contacts", require("./contacts"));

module.exports = router;
