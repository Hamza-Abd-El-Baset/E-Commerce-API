const {check} = require('express-validator')
const validationMiddleware = require('../../middlewares/validationMiddleware')

module.exports = [
    check('name').notEmpty().withMessage("Brand name is required")
    .isLength({min: 3}).withMessage("Too short brand name")
    .isLength({max: 32}).withMessage("Too long brand name"),
    validationMiddleware
]