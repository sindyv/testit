const fs = require('fs')
const path = require('path')
const multer = require('multer')

// Configure multer for file upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const { companyId } = req.body
		if (!companyId || typeof companyId !== 'string') {
			throw Error('Ingen lagringslokasjon ble gitt')
		}
		const dir = path.join(__dirname, '../uploads', companyId)
		fs.mkdirSync(dir, { recursive: true })
		cb(null, dir)
	},
	filename: function (req, file, cb) {
		cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`)
	},
})

module.exports = multer({ storage: storage })
