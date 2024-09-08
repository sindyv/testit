const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const requireAuth = require('../middleware/requireAuth')
const {
	signupUser,
	loginUser,
	assignUser,
} = require('../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.post('/assignUSer', assignUser)

router.use(requireAuth)

router.get('/', async (req, res) => {
	let users = await User.find().populate('company').exec()
	res.status(200).json({ users })
})

module.exports = router
