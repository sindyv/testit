const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const requireAuth = require('../middleware/requireAuth')
const {
	signupUser,
	loginUser,
	fetchUsersFromCompany,
} = require('../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.use(requireAuth)

router.get('/:companyId', fetchUsersFromCompany)

router.get('/', async (req, res) => {
	let users = await User.find().populate('company').exec()
	res.status(200).json({ users })
})

module.exports = router
