const express = require("express");
const { getUser, getAllUsers, updateUser, deleteUser } = require("../controllers/user");
const verifyToken = require("../verifyToken");
const router = express.Router();

router.get("/", getAllUsers)
router.get("/find/:id", verifyToken, getUser)
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)

module.exports = router;