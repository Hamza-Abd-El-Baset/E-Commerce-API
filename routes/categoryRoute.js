const express =require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const validateMongoId = require('../utils/validators/validateMongoId')
const validateCategoryName = require('../utils/validators/validateCategoryName')

router.route('/')
.post(validateCategoryName, categoryController.createCategory)
.get(categoryController.getCategories)

router.route('/:id')
.all(validateMongoId)
.get(categoryController.getCategory)
.put(validateCategoryName, categoryController.updateCategory)
.delete(categoryController.deleteCategory)

module.exports = router