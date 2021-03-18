const express = require("express");
const router = express.Router();

const {
  listContacts,
  findContacts,
  addContacts,
  deleteContacts,
  patchContact,
} = require("./contact.controller.js");

router.get("/", listContacts);
router.get("/:contactId", findContacts);
router.post("/", addContacts);
router.delete("/:contactId", deleteContacts);
router.patch("/:contactId", patchContact);

module.exports = router;
