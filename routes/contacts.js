const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getContacts);
router.get("/:id", contactsController.getContactByID);

router.post("/", contactsController.createContact);

router.put("/:id", contactsController.updateContact);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;
