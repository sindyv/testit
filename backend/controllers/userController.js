const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

function createToken(_id) {
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const signupUser = async (req, res) => {
	const { email, firstName, lastName, password, role, company } = req.body

	try {
		const user = await User.signup(
			email,
			firstName,
			lastName,
			password,
			role,
			company
		)

		const token = createToken(user._id)

		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.login(email, password)

		const token = createToken(user._id)

		res.status(200).json({
			id: user._id,
			email,
			company: user.company,
			token,
		})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { signupUser, loginUser }
