const express = require("express");
const router = new express.Router();
contactController = require("../controllers/contacts");

router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContactByID);

module.exports = router;
