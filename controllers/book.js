const Book = require("../models/Book");
const User = require("../models/User");

// ADD A BOOK
const addBook = async (req, res) => {
  const { isAdmin } = await User.findById(req.user.id);
  const newBook = new Book({ ...req.body });
  console.log("check form book controller", isAdmin);

  try {
    if (isAdmin) {
      try {
        const savedBook = await newBook.save();
        res.status(201).json({ savedBook });
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(405).json("You don't have the permission to proceed");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET ALL BOOKS
// const getAllBooks = async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.status(200).json(books)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// };

const getAllBooks = async (req, res) => {
  const qGenre = req.query.genre;
  const qCategory = req.query.category;
  try {
    let books;
    if (qGenre) {
      books = await Book.find({
        genre: {
          $in: [qGenre],
        },
      });
    } else if (qCategory) {
      books = await Book.find({
        category: {
          $in: qCategory,
        },
      });
    } else {
      books = await Book.find();
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET A BOOK
const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
};
//UPDATE
const updateBook = async (req, res) => {
  const isAdmin = await User.findById(req.user.id);
  if (isAdmin.isAdmin) {
    try {
      const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(405).json("You don't have the permission to proceed");
  }
};

//DELETE
const delBook = async (req, res) => {
  const isAdmin = await User.findById(req.user.id);
  if (isAdmin.isAdmin) {
    try {
      const deleteBook = await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Book deleted successful");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(405).json("You don't have the permission to proceed");
  }
};

//*Search Book

// const search = async (req, res) => {
//   const query = req.params.key;

//   try {
//     const books = await Book.find({
//       $or: [
//         { title: { $regex: query, $options: "i" } },
//         { genre: { $regex: query, $options: "i" } },
//         { category: { $regex: query, $options: "i" } },
//         { price: { $regex: query, $options: "i" } },
//       ],
//     });
//     res.json(books);
//   } catch (error) {
//     console.log(error);
//   }
// };
//*Lama and mine updated way of search
const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const posts = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    }).limit(10);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
//* Get Books by Tags
const tags = async (req, res, next) => {
  const query = req.query.t.split(",");
  try {
    const posts = await Book.find({ $in: tags }).limit(5);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  delBook,
  search,
  tags,
};
