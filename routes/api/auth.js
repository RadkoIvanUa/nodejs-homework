const express = require("express");

const upload = require("../../middlewares/uploads");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/user");

const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.authSchema), ctrl.register);
router.post("/login", validateBody(schemas.authSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/:userId/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscriptionById
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
