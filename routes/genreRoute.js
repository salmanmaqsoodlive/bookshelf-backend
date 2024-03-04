const express = require('express')
const { createGenre, updateGenre, getGenres, deleteGenre } = require('../controllers/genreController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, createGenre)

router.put('/:id', auth, updateGenre)

router.get('/', auth, getGenres)

router.delete('/:id', auth, deleteGenre)



module.exports = router