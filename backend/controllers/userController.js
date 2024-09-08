const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

function createToken(_id) {
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const signupUser = async (req, res) => {
	const { email, firstName, lastName, password, mobile } = req.body
	console.log(req.body)
	try {
		const user = await User.signup(
			email,
			firstName,
			lastName,
			password,
			mobile
		)

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

const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.login(email, password)

		const token = createToken(user._id)

		res.status(200).json({
			id: user._id,
			name: user.firstName + ' ' + user.lastName,
			email,
			company: user?.company ?? null,
			token,
		})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const assignUser = async (req, res) => {
	const { email, role, company } = req.body

	if (!email || !role || !company) {
		return res.status(400).json({ message: 'Fyll ut alle feltene' })
	}

	try {
		// find a user with the email
		const user = await User.findOne({ email })

		if (!user) {
			throw Error('User not found')
		}

		// Find the user by ID and update the fields
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{
				company,
				role,
			},
			{ new: true } // Return the updated user object
		)

		res.status(200).json({
			message: 'User updated successfully',
			user: updatedUser,
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error updating user',
			error: err.message,
		})

		console.log(err)
	}
}

module.exports = { signupUser, loginUser, assignUser }
