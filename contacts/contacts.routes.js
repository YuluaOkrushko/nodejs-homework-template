const express = require("express");
const router = express.Router();
const contactsController = require("./contact.controller");

router.get("/", contactsController.listContacts);
router.get("/:contactId", contactsController.findContacts);
router.post("/", contactsController.addContacts);
router.delete("/:contactId", contactsController.deleteContacts);
router.patch("/:contactId", contactsController.patchContact);

module.exports = router;
