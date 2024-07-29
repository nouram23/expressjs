const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
} = require("../controller/orderController");

router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrderById).put(updateOrder);
// delete(deleteUser);

// router.route("/login").post(loginUser);

module.exports = router;
