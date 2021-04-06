const contactModel = require("./contacts.model.js");
const { validation } = require("./contact.validation.js");

async function listContacts(req, res, next) {
  try {
    const contact = await contactModel.find();
    return res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function findContacts(req, res, next) {
  const {
    params: { contactId },
  } = req;
  try {
    const contact = await contactModel.findById(contactId);
    if (contact === null || contact.length === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).send(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addContacts(req, res, next) {
  const { error } = validation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const contact = await contactModel.create(req.body);
    return res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteContacts(req, res, next) {
  const {
    params: { contactId },
  } = req;
  try {
    const contact = await contactModel.findByIdAndDelete(contactId);
    if (contact) {
      return res.status(200).json({ message: "contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function patchContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await contactModel.findByIdAndUpdate(
      contactId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listContacts,
  findContacts,
  addContacts,
  deleteContacts,
  patchContact,
};
