const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "cz"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

categorySchema.virtual("sub-categories", {
    ref: "SubCategory",
    foreignField: "category",
    localField: "_id"
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
