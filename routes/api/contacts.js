const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/contact");

router.get("/", authenticate, ctrl.getAll);
router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);
router.post(
  "/",
  authenticate,
  validateBody(schemas.bodySchema),
  ctrl.addContact
);
router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.bodySchema),
  ctrl.updateCotnactById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
