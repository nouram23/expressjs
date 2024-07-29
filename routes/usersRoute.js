const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getMappedOrders,
} = require("../controller/usersController");

router.route("/").get(getUsers).post(createUser);
router.route("/orders/:id").get(getMappedOrders);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.route("/login").post(loginUser);

module.exports = router;
