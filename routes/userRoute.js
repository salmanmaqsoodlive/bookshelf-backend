const express = require('express')
const { signup, signin, deleteUser } = require('../controllers/userController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', signup)

router.post('/signin', signin)

router.delete('/', auth, deleteUser)



module.exports = router