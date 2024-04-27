const errorHandler = (err, req, res, next) => {
    // console.log(err.stack)
    if(err.message === 'Validation error') err.message = 'Өгөгдөл серверт давхардаж байна!'
    res.status(200).json({
        success: err.success || false,
        status: err.statusCode || 500,
        message: err.message || ''
    })
}

module.exports = errorHandler