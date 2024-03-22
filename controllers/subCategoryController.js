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

/**
 * @desc    Get list of sub-categories
 * @route   /api/v1/sub-categories
 * @method  GET
 * @access  public
 */
module.exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

/**
 * @desc    Get a specific sub-category
 * @route   /api/v1/sub-categories/:id
 * @method  GET
 * @access  public
 */
module.exports.getSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new CustomError(`No sub-category for this id: ${id}`, 404);
  }
  res.status(200).json({ data: subCategory });
});

/**
 * @desc    Update a specific sub-category
 * @route   /api/v1/sub-categories/:id
 * @method  PUT
 * @access  private
 */
module.exports.updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      category,
    },
    {
      new: true,
    }
  );
  if (!subCategory) {
    throw new CustomError(`No sub-category for this id: ${id}`, 404);
  }
  res.status(200).json({ data: subCategory });
});

/**
 * @desc    Delete a specific sub-category
 * @route   /api/v1/sub-categories/:id
 * @method  DELETE
 * @access  private
 */
module.exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    throw new CustomError(`No sub-category for this id: ${id}`, 404);
  }
  res.status(204).json();
});
