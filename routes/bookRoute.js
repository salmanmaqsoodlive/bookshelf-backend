const express = require('express')
const { createBook, updateBook, getBooks } = require('../controllers/bookController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, createBook)

router.put('/:id', auth, updateBook)

router.get('/', auth, getBooks)


module.exports = router