const ErrorBuilder = require("../utils/customError");
const asyncHandler = require("../middleware/asyncHandler");
const db = require("../config/firebase");

exports.createOrder = asyncHandler(async (req, res, next) => {
  if (
    !req.body.orderDate ||
    !req.body.orderTime ||
    !req.body.carType ||
    !req.body.price ||
    !req.body.email ||
    !req.body.phoneNumber ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.note ||
    !req.body.latitude ||
    !req.body.longitude ||
    !req.body.createdAt ||
    !req.body.modifiedAt
  ) {
    throw new ErrorBuilder(
      "Захиалга үүсгэхэд шаардагдах үндсэн өгөгдөлүүдийг бүрэн бөглөнө үү?",
      404,
      false
    );
  }

  const response = await db.createOrder(req.body);
  res.status(200).json({
    status: 200,
    success: true,
    data: response,
  });
});
exports.getOrders = asyncHandler(async (req, res, next) => {
  const data = await db.getOrders();
  res.status(200).json({
    status: 200,
    success: true,
    data: data,
  });
});
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const documentSnapshot = await db.getOrderById(id);
  if (!documentSnapshot.exists()) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Order not found",
    });
  }
  const orderData = documentSnapshot.data();
  res.status(200).json({
    status: 200,
    success: true,
    data: { id: documentSnapshot.id, ...orderData },
  });
});
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status === undefined) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Status is required",
    });
  }

  const response = await db.updateOrder(id, status);
  res.status(200).json({
    status: 200,
    success: true,
  });
});
