const Company = require('../models/companyModel')

const fetchCompany = async (req, res) => {
	const { id } = req.params

	try {
		const company = await Company.findById(id)
			.populate('users')
			.populate('createdBy')
			.exec()

		res.status(200).json({ company })
	} catch (error) {
		res.status(400).json({
			message:
				error.message || 'Vi fant ikke bedriften du leter etter :(',
		})
	}
}

const updateCompany = async (req, res) => {
	const { id } = req.params
	const { company } = req.body
	try {
		const updatedCompany = await Company.findOneAndReplace(
			{ _id: id },
			{ ...company }
		)
		res.status(201).json({ updatedCompany })
	} catch (error) {
		res.status(400).json({
			message: error.message || 'Vi klarte ikke å oppdatere bedriften',
		})
	}
}

module.exports = { fetchCompany, updateCompany }
