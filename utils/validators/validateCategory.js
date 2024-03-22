const {check} = require('express-validator')
const validationMiddleware = require("../../middlewares/validationMiddleware");

module.exports = [
    check("name")
    .notEmpty().withMessage('Category name is required')
    .isLength({min: 3}).withMessage('Too short category name')
    .isLength({max: 32}).withMessage('Too long category name'),
    validationMiddleware
]
