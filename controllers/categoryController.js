const Category = require("../models/categoryModel")
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const CustomError = require("../utils/CustomError")

/**
 * @desc create category
 * @route /api/v1/categories
 * @method POST
 * @access private
 */
module.exports.createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body
    const category = await Category.create({name, slug: slugify(name)})
    res.status(201).json({data: category})  
})

/**
 * @desc Get all categories
 * @route /api/v1/categories
 * @method Get
 * @access public
 */
module.exports.getCategories = asyncHandler(async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 5
    const skip = (page - 1) * limit
    const categories = await Category.find({}).skip(skip).limit(limit)
    res.status(200).json({results: categories.length, page, data: categories})
})

/**
 * @desc Get a specific category by id
 * @route /api/v1/categories/:id
 * @method Get
 * @access public
 */
module.exports.getCategory = asyncHandler(async (req, res) => {
    const {id} = req.params
    const category = await Category.findById(id)

    if(!category) {
        throw new CustomError(`No category for this id: ${id}`, 404)
    }

    res.status(200).json({data: category})
})

/**
 * @desc Update a specific category by id
 * @route /api/v1/categories/:id
 * @method PUT
 * @access private
 */
module.exports.updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {name} = req.body 
    const category = await Category.findByIdAndUpdate(id,{
        name,
        slug: slugify(name)
    }, {
        new: true
    })

    if(!category) {
        throw new CustomError(`No category for this id: ${id}`, 404)
    }
    
    res.status(200).json({data: category})
})

/**
 * @desc Delete a specific category by id
 * @route /api/v1/categories/:id
 * @method DELETE
 * @access private
 */
module.exports.deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params 
    const category = await Category.findByIdAndDelete(id)

    if(!category) {
        throw new CustomError(`No category for this id: ${id}`, 404)
    }

    res.status(204).json()
})