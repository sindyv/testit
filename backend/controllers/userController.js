const User = require('../models/userModel')
const Company = require('../models/companyModel')
const jwt = require('jsonwebtoken')

function createToken(user) {
	return jwt.sign(
		{
			_id: user._id,
			enabled: user.enabled,
			role: user?.role ?? 'not found',
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '3d',
		}
	)
}

const signupUser = async (req, res) => {
	const {
		email,
		firstName,
		lastName,
		password,
		mobile,
		company: fetchedCompany,
		readOnly,
	} = req.body

	try {
		// check if compant exists.
		let company = await Company.findOne({
			organisationNumber: fetchedCompany.organisasjonsnummer,
		})

		// If it does not exist, create it.
		const companyDoesNotExist = !company
		if (!company) {
			const companyDetails = {
				companyName: fetchedCompany?.navn,
				organisationNumber: fetchedCompany?.organisasjonsnummer,
				email: email,
				address: fetchedCompany?.forretningsadresse?.adresse[0],
				city: fetchedCompany?.forretningsadresse?.poststed,
				postnu: fetchedCompany?.forretningsadresse?.postnummer,
				readOnly: readOnly,
			}
			company = await Company.createCompany(companyDetails)
		}

		// When company is created, create user
		const user = await User.signup(
			email,
			firstName,
			lastName,
			password,
			mobile,
			company._id,
			companyDoesNotExist
		)

		// When user is created, add user to company
		company.users.push(user._id)
		// If the company does not exist, define the createdBy as this user.
		if (companyDoesNotExist) {
			company.createdBy = user._id
		}
		// Update database with user information
		company = await Company.findOneAndReplace({ _id: company._id }, company)
		const token = createToken(user)

		res.status(200).json({
			user: {
				id: user._id,
				name: user.firstName + ' ' + user.lastName,
				email,
				company: user?.company ?? null,
				token,
			},
		})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.login(email, password)

		const token = createToken(user)

		res.status(200).json({
			user: {
				id: user._id,
				name: user.firstName + ' ' + user.lastName,
				email,
				company: user?.company ?? null,
				token,
			},
			enabled: user.enabled,
		})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const fetchUsersFromCompany = async (req, res) => {
	const query = req?.query ?? {}
	try {
		const users = await User.find(query)
		if (!users) {
			throw Error('Kunne ikke finne noen brukere i dette firmaet')
		}
		res.status(200).json({ users })
	} catch (error) {
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}

const updateUser = async (req, res) => {
	const { user } = req.body
	try {
		const beforeUpdate = await User.findOneAndUpdate(
			{ _id: user._id },
			user
		)

		const newUser = await User.findById(user._id)
		if (!newUser) {
			throw Error('Kunne ikke oppdatere brukeren')
		}
		res.status(200).json({ newUser })
	} catch (error) {
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}
module.exports = {
	signupUser,
	loginUser,
	fetchUsersFromCompany,
	updateUser,
}
