const File = require('../models/filesModel')
const path = require('path')
const getFiles = async (req, res) => {
	const query = req?.query ?? {}
	try {
		const files = await File.find(query)
			.populate({
				path: 'system',
				populate: { path: 'systemCode' },
			})
			.populate({
				path: 'system',
				populate: { path: 'systemLocation' },
			})
			.exec()
		if (!files) {
			throw Error('Kunne ikke finne noen filer i dette søket')
		}
		res.status(200).json({ files })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}

const fileDownload = async (req, res) => {
	const { companyId, fileId } = req.params
	try {
		const [file] = await File.find({ _id: fileId, company: companyId })
			.populate({
				path: 'company',
			})
			.exec()
		if (!file) {
			throw Error('Fant ikke fil')
		}

		const company = file.company._id.toHexString()

		const filePath = path.join(
			__dirname,
			'../uploads',
			company,
			file.fileName
		)
		res.download(filePath, file.originalName)
	} catch (error) {
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}

const fileUpdate = async (req, res) => {
	const { companyId, fileId } = req.params
	const { file } = req.body

	console.log(file)
	try {
		const fileBeforeUpdate = await File.findOneAndUpdate(
			{ _id: fileId, company: companyId },
			file
		)

		// console.log(fileBeforeUpdate)

		const updateFile = await File.findOne({
			_id: fileId,
			company: companyId,
		})

		res.status(200).json({ updateFile })
	} catch (error) {
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}

const uploadFunctionDescription = async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No file uploaded.')
	}

	console.log(req.body)

	try {
		// Save file information to database
		const fileObject = {
			...req.body,
			fileName: req.file.filename,
			originalName: req.file.originalname,
		}
		const newFile = await File.createFile(fileObject)

		res.status(200).json({
			message: `Fil lastet opp: ${req?.file?.originalname}`,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Error saving file information',
			error,
		})
	}
}

module.exports = {
	uploadFunctionDescription,
	getFiles,
	fileDownload,
	fileUpdate,
}
