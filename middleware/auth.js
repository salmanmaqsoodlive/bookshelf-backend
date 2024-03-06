const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const result = await User.findById(user.id)
            if (!result) {
                return res.status(401).send({ message: "Unauthorized User" })
            }
            req.userId = result._id
        } else {
            res.status(401).send({ message: "Unauthorized User" })
        }

        next()
    } catch (error) {
        res.status(401).send({ message: "Unauthorized User" })
    }
}


module.exports = auth