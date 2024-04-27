const ErrorBuilder = require('./../utils/customError');
const asyncHandler = require('./../middleware/asyncHandler');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getItems = asyncHandler(async (req, res, next) => {
    const items = await req.db.item.findAll({
        include: [{ model: req.db.category, attributes: ['categoryName'] }],
        attributes: { exclude: ['categoryId'] }
    });

    res.status(200).json({
        status: 200,
        success: true,
        data: items
    });
});

exports.getItem = asyncHandler(async (req, res, next) => {
    const item = await req.db.item.findByPk(req.params.id, {
        include: [{ model: req.db.category, attributes: ['name'] }],
        attributes: { exclude: ['categoryId'] }
    });

    if (!item) {
        throw new ErrorBuilder(`${req.params.id} ID - тай барааны мэдээлэл олдсонгүй!`, 404, false);
    }

    res.status(200).json({
        status: 200,
        success: true,
        data: item
    });
});

exports.createItem = asyncHandler(async (req, res, next) => {
    const item = await req.db.item.create(req.body);

    res.status(200).json({
        status: 200,
        success: true,
        data: item
    });
});

exports.updateItem = asyncHandler(async (req, res, next) => {
    const item = await req.db.item.findByPk(req.params.id);

    if (!item) {
        throw new ErrorBuilder(`${req.params.id} ID - тай барааны мэдээлэл олдсонгүй!`, 404, false);
    }

    await req.db.item.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({
        status: 200,
        success: true,
        data: await req.db.item.findByPk(req.params.id)
    });
});

exports.deleteItem = asyncHandler(async (req, res, next) => {
    const item = await req.db.item.findByPk(req.params.id);

    if (!item) {
        throw new ErrorBuilder(`${req.params.id} ID - тай барааны мэдээлэл олдсонгүй!`, 404, false);
    }

    await req.db.item.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({
        status: 200,
        success: true,
        data: `${req.params.id} ID тай барааг амжилттай устгалаа!`
    });
});
