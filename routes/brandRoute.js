const router = require('express').Router()
const brandController = require('../controllers/brandController')
const validateMongoId = require('../utils/validators/validateMongoId')
const validateBrand = require('../utils/validators/validateBrand')

router.route('/')
.post(validateBrand, brandController.createBrand)
.get(brandController.getBrands)

router.route('/:id')
.all(validateMongoId)
.get(brandController.getBrand)
.put(validateBrand, brandController.updateBrand)
.delete(brandController.deleteBrand)

module.exports = router