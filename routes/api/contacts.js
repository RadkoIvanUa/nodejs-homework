const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/bodySchema");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getContactById);
router.post("/", validateBody(schemas.bodySchema), ctrl.addContact);
router.delete("/:contactId", ctrl.deleteContactById);
router.put(
  "/:contactId",
  validateBody(schemas.bodySchema),
  ctrl.updateCotnactById
);

module.exports = router;
