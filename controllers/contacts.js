const { HttpError, controllersWrapper } = require("../helpers");

const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const data = await contacts.listContacts();
  return res.json(data);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not Found!");
  }
  return res.json(contact);
};

const addContact = async (req, res, next) => {
  const contact = await contacts.addContact(req.body);
  return res.status(201).json(contact);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateCotnactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contacts.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not Found!");
  }
  res.json(updatedContact);
};

module.exports = {
  getAll: controllersWrapper(getAll),
  getContactById: controllersWrapper(getContactById),
  addContact: controllersWrapper(addContact),
  deleteContactById: controllersWrapper(deleteContactById),
  updateCotnactById: controllersWrapper(updateCotnactById),
};
