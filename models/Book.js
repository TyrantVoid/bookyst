const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    oldprice: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: String,
    },
    image: {
      type: String,
      // required: true,
    },
    genre: {
      type: Array,
      required: true,
    },
    trending: {
      type: Boolean,
      // required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    discount: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Boolean,
      // required: true
    },
    paperBook: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// // Define a helper function to convert string values to lowercase
// function convertToLowerCase(obj) {
//   Object.keys(obj).forEach((key) => {
//     if (typeof obj[key] === "string") {
//       obj[key] = obj[key].toLowerCase();
//     }
//   });
// }

// // Pre-save middleware to convert all string fields to lowercase before saving
// BookSchema.pre("save", function (next) {
//   try {
//     // Convert all string fields in the document to lowercase
//     convertToLowerCase(this._doc);
//     next();
//   } catch (error) {
//     // Pass any errors to the next middleware
//     next(error);
//   }
// });

module.exports = mongoose.model("Book", BookSchema);
