const {check} = require('express-validator')
const validationMiddleware = require('../../middlewares/validationMiddleware')

module.exports = [
    check('id').isMongoId().withMessage('Invalid mongo id'),
    validationMiddleware
]