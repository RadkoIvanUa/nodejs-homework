const { HttpError, controllersWrapper } = require("../helpers");

const { Contact } = require("../schemas/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  if (favorite === "true") {
    const data = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    });
    return res.json(data);
  }

  const data = await Contact.find({ owner }, "", { skip, limit });
  return res.json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not Found!");
  }
  return res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  return res.status(201).json(contact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateCotnactById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not Found!");
  }
  res.json(updatedContact);
};

const updateFavoriteById = async (req, res) => {
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
