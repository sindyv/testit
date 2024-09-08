const ExternalCompany = require('../models/externalCompanyModel')
const User = require('../models/userModel')

const getExternalCompanies = async (req, res) => {
	let externalCompanies = await ExternalCompany.find({})

	res.status(200).json({ externalCompanies })
}

const addExternalCompany = async (req, res) => {
	const {
		companyName,
		orgNu,
		email,
		streetnu,
		streetname,
		website,
		city,
		postnu,
		user,
	} = req.body

	console.log(req.body)

	try {
		const externalCompany = await ExternalCompany.addExternalCompany(
			companyName,
			orgNu,
			email,
			streetnu,
			streetname,
			website,
			city,
			postnu,
			user
		)
		res.status(200).json({ externalCompany })
	} catch (error) {
		res.status(400).json({ error: error.message })

		console.log(error)
	}
}

module.exports = { getExternalCompanies, addExternalCompany }
