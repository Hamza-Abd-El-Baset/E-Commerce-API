const express = require("express");

const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");
const validateSubCategory = require("../utils/validators/validateSubCategory");
const validateMongoId = require("../utils/validators/validateMongoId");

router
  .route("/")
  .post(validateSubCategory, subCategoryController.createSubCategory)
  .get(subCategoryController.getSubCategories);

router.route('/:id')
.all(validateMongoId)
.get(subCategoryController.getSubCategory)
.put(subCategoryController.updateSubCategory)
.delete(subCategoryController.deleteSubCategory)

module.exports = router;
