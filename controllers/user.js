const User = require("../models/User");
const verifyToken = require("../verifyToken");

//GET USER
const getUser = async (req, res, next) => {
    // const userId = req.user
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        
    }
};

//GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error)
    }
};

//UPDATE USER
const updateUser = async (req, res, next) => {
    const admin = await User.findById(req.user.id);
    console.log(admin)
    if(req.params.id === req.user.id || admin.isAdmin){
        try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    }else{  
        res.status(405).json("you can only update your account")
    }
};

//DELETE USER
const deleteUser = async (req, res, next) => {
    const isAdmin = await User.findById(req.user.id);
    if(isAdmin.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted success")
        } catch (error) {
            res.status(400).json(error)
        }
    }else{
        res.status(405).json("you can only delete your account")
    }
};

module.exports = {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}