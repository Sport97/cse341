const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contacts");
const utilities = require("../utilities/");
const validate = require("../utilities/validate");

router.get("/", utilities.handleErrors(contactsController.getContacts));
router.get("/:id", utilities.handleErrors(contactsController.getContactByID));

router.post(
  "/",
  validate.contactRules(),
  validate.checkContactData,
  utilities.handleErrors(contactsController.createContact)
);

router.put(
  "/:id",
  validate.contactRules(),
  validate.checkContactData,
  utilities.handleErrors(contactsController.updateContact)
);

router.delete("/:id", utilities.handleErrors(contactsController.deleteContact));

module.exports = router;
