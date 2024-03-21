const {check} = require('express-validator')
const validationMiddleware = require("../../middlewares/validationMiddleware");

module.exports = [
    check('name')
    .notEmpty().withMessage('Sub-category name is required')
    .isLength({min: 3}).withMessage('Too short sub-category name')
    .isLength({max: 32}).withMessage('Too long sub-category name'),
    validationMiddleware
]