const { HttpError, controllersWrapper } = require("../helpers");

const { Contact } = require("../schemas/contact");

const getAll = async (req, res, next) => {
  const data = await Contact.find();
  return res.json(data);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not Found!");
  }
  return res.json(contact);
};

const addContact = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  return res.status(201).json(contact);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateCotnactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not Found!");
  }
  res.json(updatedContact);
};

const updateFavoriteById = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found!");
  }
  res.json(updatedContact);
};

module.exports = {
  getAll: controllersWrapper(getAll),
  getContactById: controllersWrapper(getContactById),
  addContact: controllersWrapper(addContact),
  deleteContactById: controllersWrapper(deleteContactById),
  updateCotnactById: controllersWrapper(updateCotnactById),
  updateFavoriteById: controllersWrapper(updateFavoriteById),
};
