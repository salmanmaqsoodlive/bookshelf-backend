const asyncHandler = require('express-async-handler')
const Genre = require('../models/genreModel')


const createGenre = asyncHandler(async (req, res) => {
    try {
        const genre = await Genre.create(req.body)
        res.status(201).send({ success: true, message: "Genre created successfully", genre })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})
const updateGenre = asyncHandler(async (req, res) => {
    try {
        const condition = { _id: req.params.id }
            , update = req.body
            , options = { multi: true, new: true, runValidators: true };

        const genre = await Genre.findOneAndUpdate(condition, update, options);
        if (!genre) {
            return res.status(404).send({ message: "Genre not found" })
        }
        res.status(200).send({ success: true, message: "Genre updated successfully", genre })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})

const getGenres = asyncHandler(async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json({ success: true, genres });
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})


const deleteGenre = asyncHandler(async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) {
            return res.status(404).send({ message: 'Genre not found' });
        }

        res.send({ success: true, message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

})


module.exports = {
    createGenre,
    updateGenre,
    getGenres,
    deleteGenre
}