const express = require("express");
const router = express.Router();

const {
  createCarType,
  getCarTypes,
  getOrderById,
  updateOrder,
  getCars,
  createCar,
} = require("../controller/carController");
const { upload } = require("../config/firebase");

router.route("/type").get(getCarTypes).post(createCarType);
router.route("/").get(getCars).post(upload.single("image"), createCar);

router.route("/:id").get(getOrderById).put(updateOrder);
// delete(deleteUser);

// router.route("/login").post(loginUser);

module.exports = router;
