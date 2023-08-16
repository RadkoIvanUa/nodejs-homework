const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/contact");

router.get("/", ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.bodySchema), ctrl.addContact);
router.delete("/:contactId", isValidId, ctrl.deleteContactById);
router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.bodySchema),
  ctrl.updateCotnactById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
