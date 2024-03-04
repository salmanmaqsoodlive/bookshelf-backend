const mongoose = require("mongoose");



const genreSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Genre is required"],
            unique: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true
    },

)

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;