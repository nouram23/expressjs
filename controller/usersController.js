const ErrorBuilder = require("../utils/customError");
const asyncHandler = require("../middleware/asyncHandler");
const db = require("../config/firebase");
const { collection, addDoc } = require("firebase/firestore");

exports.getUsers = asyncHandler(async (req, res, next) => {
  //   const user = await req.db.user.findAll({
  //     attributes: {
  //       exclude: ["password"],
  //     },
  //   });
  //   res.status(200).json({
  //     status: 200,
  //     success: true,
  //     data: user,
  //   });
});
exports.getMappedOrders = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await db.getOrderByUserId(userId);
  res.status(200).json({
    status: 200,
    success: true,
    data: user,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  //   const user = await req.db.user.findAll({
  //     where: {
  //       id: req.params.id,
  //     },
  //     attributes: {
  //       exclude: ["password"],
  //     },
  //   });
  //   if (user.length === 0)
  //     throw new ErrorBuilder(
  //       `${req.params.id} ID - тай хэрэглэгчийн мэдээлэл олдсонгүй!`,
  //       404,
  //       false
  //     );
  //   res.status(200).json({
  //     status: 200,
  //     success: true,
  //     data: user,
  //   });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phoneNumber ||
    !req.body.role ||
    !req.body.createdAt ||
    !req.body.modifiedAt
  )
    throw new ErrorBuilder(
      `Хэрэглэгч үүсгэхэд шаардагдах үндсэн өгөгдөлүүдийг бүрэн бөглөнө үү?`,
      404,
      false
    );
  let user;
  await db
    .createUserWithEmailAndPassword(db.auth, req.body.email, req.body.password)
    .then(async (data) => {
      req.body.uid = data.user.uid;
      user = await db.createUser(req.body);
    });

  res.status(200).json({
    status: 200,
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  //   let user = await req.db.user.findAll({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   if (user.length === 0)
  //     throw new ErrorBuilder(
  //       `${req.params.id} ID - тай хэрэглэгчийн мэдээлэл олдсонгүй!`,
  //       404,
  //       false
  //     );
  //   await req.db.user.update(req.body, {
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   user = await req.db.user.findAll({
  //     where: {
  //       id: req.params.id,
  //     },
  //     attributes: {
  //       exclude: ["password"],
  //     },
  //   });
  //   res.status(200).json({
  //     status: 200,
  //     success: true,
  //     data: user,
  //   });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  //   let user = await req.db.user.findAll({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   if (user.length === 0)
  //     throw new ErrorBuilder(
  //       `${req.params.id} ID - тай хэрэглэгчийн мэдээлэл олдсонгүй!`,
  //       404,
  //       false
  //     );
  //   await req.db.user.destroy({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   res.status(200).json({
  //     status: 200,
  //     success: true,
  //     data: `${req.params.id} Id тай хэрэглэгчийн мэдээллийг серверээс амжилттай устгалаа!`,
  //   });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const data = await db.signInWithEmailAndPassword(
    db.auth,
    req.body.email,
    req.body.password
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: "Та системд амжилттай нэвтэрлээ!",
    user: data?.user,
  });
});
