const express = require('express')
const { signup, signin, deleteUser } = require('../controllers/userController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', signup)

router.post('/signin', signin)

router.get('/', auth, deleteUser)



module.exports = router