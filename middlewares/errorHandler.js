module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500  
    if(process.env.NODE_ENV === 'development') {
        sendErrorInDev(err, res)
    } else {
        sendErrorInProd(err, res)
    }
}

sendErrorInDev = (err, res) => {
    res.status(err.statusCode).json({
        error: err,
        message: err.message,
        stack: err.stack
    })
}

sendErrorInProd = (err, res) => {
    res.status(err.statusCode).json({
        message: err.message
    })
}