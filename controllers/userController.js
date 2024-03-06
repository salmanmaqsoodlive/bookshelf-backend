const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = asyncHandler(async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT))
        const user = await User.create({ ...req.body, password: hashedPassword })
        user.password = undefined

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

        res.status(201).send({ success: true, message: "User signup successfully", user, token })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})

const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).send({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).send({ message: "Invalid credentials" })
        }

        existingUser.password = undefined

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

        res.status(200).send({ success: true, message: "User signin successfully", user: existingUser, token })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})



const deleteUser = asyncHandler(async (req, res) => {

    try {
        const user = await User.findById(req.userId);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ success: true, message: 'User and associated books deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})

module.exports = {
    signup,
    signin,
    deleteUser
}