const mongoose = require("mongoose");



const STATUSES = ["plan to read", "reading", "completed"]

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        status: {
            type: String,
            enum: { values: STATUSES, message: "Status is either: plan to read, reading or completed" },
            default: "plan to read",
            trim: true,
            lowercase: true
        },
        author: {
            type: String,
        },
        publicationHouse: {
            type: String
        },
        publicationDate: {
            type: Date
        },
        publicationYear: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;