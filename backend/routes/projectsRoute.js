const express = require('express')
const router = express.Router()
const Project = require('../models/projectModel')
const {
	getProjects,
	addProject,
	updateProject,
} = require('../controllers/projectsController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/', getProjects)

// Create a new project
router.post('/', addProject)

// Update existing project
router.put('/:projectId', updateProject)

module.exports = router
