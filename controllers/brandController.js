const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const Brand = require('../models/brandModel')
const CustomError = require('../utils/CustomError')

/**
 * @desc    Create new brand
 * @route   /api/v1/brands
 * @method  POST
 * @access  private
 */
module.exports.createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body
    const brand = await Brand.create({
        name,
        slug: slugify(name)
    })
    res.status(201).json({data: brand})
})

/**
 * @desc    Get list of brands
 * @route   /api/v1/brands
 * @method  GET
 * @access  public
 */
module.exports.getBrands = asyncHandler(async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 5
    const skip = (page - 1) * limit
    const brands = await Brand.find({}).skip(skip).limit(limit)
    res.status(200).json({results: brands.length, page, data: brands})
})

/**
 * @desc    Get a specific brand
 * @route   /api/v1/brands/:id
 * @method  GET
 * @access  public
 */
module.exports.getBrand = asyncHandler(async (req, res) => {
    const {id} = req.params
    const brand = await Brand.findById(id)
    if(!id) {
        throw new CustomError(`No brand found for this id: ${id}`, 404)
    }
    res.status(200).json({data: brand})
})

/**
 * @desc    Update a specific brand
 * @route   /api/v1/brands/:id
 * @method  PUT
 * @access  private
 */
module.exports.updateBrand = asyncHandler(async (req, res) => {
    const {name} = req.body
    const {id} = req.params
    const brand = await Brand.findByIdAndUpdate(id, {
        name,
        slug: slugify(name)
    }, {
        new: true
    })
    if(!id) {
        throw new CustomError(`No brand found for this id: ${id}`, 404)
    }
    res.status(200).json({data: brand})
})

/**
 * @desc    Delete a specific brand
 * @route   /api/v1/brands/:id
 * @method  DELETE
 * @access  private
 */
module.exports.deleteBrand = asyncHandler(async (req, res) => {
    const {id} = req.params
    const brand = await Brand.findByIdAndDelete(id)
    if(!id) {
        throw new CustomError(`No brand found for this id: ${id}`)
    }
    res.status(204).json({data: brand})
})