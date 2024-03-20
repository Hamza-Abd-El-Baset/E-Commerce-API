const validationMiddleware = require("../../middlewares/validationMiddleware");
const {check} = require('express-validator')

module.exports = [
    check("name")
    .notEmpty().withMessage('Category name is required')
    .isLength({min: 3}).withMessage('Too short category name')
    .isLength({max: 32}).withMessage('Too long category name'),
    validationMiddleware
]
