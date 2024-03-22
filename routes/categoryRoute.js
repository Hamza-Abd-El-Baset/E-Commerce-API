const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");
const validateMongoId = require("../utils/validators/validateMongoId");
const validateCategory = require("../utils/validators/validateCategory");

router
  .route("/")
  .post(validateCategory, categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/:id")
  .all(validateMongoId)
  .get(categoryController.getCategory)
  .put(validateCategory, categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
