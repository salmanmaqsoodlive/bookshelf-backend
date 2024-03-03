const mongoose = require("mongoose");
const validator = require('validator');
const Book = require("./bookModel");


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
    },
    {
        timestamps: true
    },

)

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await Book.deleteMany({ user: this._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;