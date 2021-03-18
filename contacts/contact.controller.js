const contactsFunctions = require("./contacts.model.js");
const { validation } = require("./contact.validation.js");

exports.listContacts = (req, res) => {
  const contacts = contactsFunctions.listContacts();
  return res.status(200).json(contacts);
};

exports.findContacts = (req, res) => {
  let id = req.params.contactId;
  const contact = contactsFunctions.getContactById(id);

  if (contact.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

exports.addContacts = (req, res) => {
  const { name, email, phone } = req.body;
  const { error } = validation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const newContact = contactsFunctions.addContacts(name, email, phone);

  return res.status(201).json(newContact);
};

exports.deleteContacts = (req, res) => {
  let id = req.params.contactId;
  const contacts = contactsFunctions.removeContact(id);
  if (contacts) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
};

exports.patchContact = (req, res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  let id = req.params.contactId;
  const contact = contactsFunctions.updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};
