const express = require('express')

const router = express.Router()
const subCategoryController = require('../controllers/subCategoryController')
const validateSubCategoryName = require('../utils/validators/validateSubCategoryName')

router.route('/')
.post(validateSubCategoryName, subCategoryController.createSubCategory)

module.exports = router