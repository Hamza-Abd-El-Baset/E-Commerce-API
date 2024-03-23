const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Too short category name"],
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

module.exports = mongoose.model("Category", categorySchema);
