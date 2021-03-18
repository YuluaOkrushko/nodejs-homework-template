const path = require("path");
const fs = require("fs");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "../db/contacts.json");

const dataArray = JSON.parse(fs.readFileSync(contactsPath));

const listContacts = () => {
  return dataArray;
};

const getContactById = (contactId) => {
  const id = String(contactId);
  return dataArray.find((item) => String(item.id) === id);
};

const addContact = (name, email, phone) => {
  const id = shortid.generate();
  const newContact = { id, name, email, phone };
  const editedList = [...dataArray, newContact];

  fs.writeFile(contactsPath, JSON.stringify(editedList), (err, data) => {
    if (err) throw err;
  });
  return editedList;
};

const removeContact = (contactId) => {
  const id = String(contactId);

  if (getContactById(id)) {
    const editedList = dataArray.filter((item) => String(item.id) !== id);

    fs.writeFile(contactsPath, JSON.stringify(editedList), (err) => {
      if (err) throw err;
    });
    return true;
  } else return false;
};

const updateContact = (contactId, reqBody) => {
  const id = String(contactId);

  const targetContact = dataArray.findIndex((item) => String(item.id) === id);

  if (targetContact === -1) {
    return false;
  }
  dataArray[targetContact] = {
    ...dataArray[targetContact],
    ...reqBody,
  };

  fs.writeFile(contactsPath, JSON.stringify(dataArray), function (err) {
    if (err) throw err;
  });
  return dataArray[targetContact];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
