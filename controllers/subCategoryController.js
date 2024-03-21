const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const CustomError = require("../utils/CustomError");

/**
 * @desc    Create a new sub-category
 * @route   /api/v1/subcategories
 * @method  POST
 * @access  private
 */
module.exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
