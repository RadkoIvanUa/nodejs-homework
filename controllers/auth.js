const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const resizeAvatar = require("../helpers/resizeUserAvatar");

require("dotenv").config();

const { HttpError, controllersWrapper } = require("../helpers");

const { User } = require("../schemas/user");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comapredPassword = bcrypt.compare(password, user.password);

  if (!comapredPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateSubscriptionById = async (req, res) => {
  const { userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!updatedUser) {
    throw HttpError(404, "Not found!");
  }
  res.json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  resizeAvatar(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });

  console.log("ok");
};

module.exports = {
  register: controllersWrapper(register),
  login: controllersWrapper(login),
  getCurrent: controllersWrapper(getCurrent),
  logout: controllersWrapper(logout),
  updateSubscriptionById: controllersWrapper(updateSubscriptionById),
  updateAvatar: controllersWrapper(updateAvatar),
};
