const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer')

const upload = require('../middleware/uploadFile')
const {
	uploadFunctionDescription,
	getFiles,
	fileDownload,
	fileUpdate,
} = require('../controllers/filesController')

// all subsequent routes require authorization
router.use(requireAuth)

router.get('/', getFiles)
router.put('/:companyId/:fileId', fileUpdate)
router.get('/:companyId/:fileId', fileDownload)

router.post('/upload', upload.single('files'), uploadFunctionDescription)

module.exports = router
