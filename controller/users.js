const ErrorBuilder = require('./../utils/customError')
const asyncHandler = require('./../middleware/asyncHandler')
const Sequelize = require("sequelize")
const Op = Sequelize.Op

exports.getUsers = asyncHandler(async(req, res, next) => {

    const user = await req.db.user.findAll({
        attributes: {
            exclude: ['password']
        }
    });

    res.status(200).json({
        status: 200,
        success: true,
        data: user
    })
})

exports.getUser = asyncHandler(async(req, res, next) => {

    const user = await req.db.user.findAll({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        }
    });

    if(user.length === 0) throw new ErrorBuilder(`${req.params.id} ID - тай хэрэглэгчийн мэдээлэл олдсонгүй!`, 404, false)

    res.status(200).json({
        status: 200, 
        success: true,
        data: user
    })
})

exports.createUser = asyncHandler(async(req, res, next) => {

    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.password) throw new ErrorBuilder(`Хэрэглэгч үүсгэхэд шаардагдах үндсэн өгөгдөлүүдийг бүрэн бөглөнө үү?`, 404, false)
    
    const user = await req.db.user.create(req.body);


    res.status(200).json({
        status: 200,
        success: true,
        token: user.getJsonWebToken()
    })
})

exports.updateUser = asyncHandler(async(req, res, next) => {

    let user = await req.db.user.findAll({
        where: {
            id: req.params.id
        }
    });

    if(user.length === 0) throw new ErrorBuilder(`${req.params.id} ID - тай хэрэглэгчийн мэдээлэл олдсонгүй!`, 404, false)

    await req.db.user.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    user = await req.db.user.findAll({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        }
    })


    res.status(200).json({
        status: 200,
        success: true,
        data: user
    })
})

exports.deleteUser = asyncHandler(async(req, res, next) => {

    let user = await req.db.user.findAll({
        where: {
            id: req.params.id
        }
    });

    if(user.length === 0) throw new ErrorBuilder(`${req.params.id} ID - тай хэрэглэгчийн мэдээлэл олдсонгүй!`, 404, false)

    await req.db.user.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({
        status: 200,
        success: true,
        data: `${req.params.id} Id тай хэрэглэгчийн мэдээллийг серверээс амжилттай устгалаа!`
    })
})

exports.loginUser = asyncHandler(async(req, res, next) => {

    if(!req.body.email || !req.body.password) throw new ErrorBuilder(`Имэйл, нууц үг дамжуулна уу?`, 404, false)

    const {email, password} = req.body

    
    let user = await req.db.user.findOne({
        where: {
            [Op.or]: [{email: email}, {phone: email}]
        }
    });

    
    if(!user) throw new ErrorBuilder(`Имэйл, нууц үг буруу байна!`, 404, false)
    const matching  = await user.checkPassword(password)
    if(!matching) throw new ErrorBuilder(`Имэйл, нууц үг буруу байна!`, 404, false)

    if(!user.isActive) throw new ErrorBuilder(`Тухайн хэрэглэгч хандах эрхгүй байна. Хэрэглэгчийн төвд хандана уу?`, 404, false)

    user = await req.db.user.findOne({
        where: {
            [Op.or]: [{email: email}, {phone: email}]
        },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });
    

    res.status(200).json({
        status: 200,
        success: true,
        message: 'Та системд амжилттай нэвтэрлээ!',
        token: user.getJsonWebToken(),
        user
    })
})
