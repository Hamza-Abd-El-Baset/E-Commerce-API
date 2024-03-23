const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        unique: [true, "Brand name must be unique"],
        minlength: [3, "Too short brand name"],
        maxlength: [32, "Too long brand name"],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, {
    timestamps: true
})

module.exports = mongoose.model("Brand", brandSchema)