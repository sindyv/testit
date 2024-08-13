const express = require('express')
const router = express.Router()
const Project = require('../models/projectModel')
const { getProjects } = require('../controllers/projectsController')

router.get('/', getProjects)

// Create a new project
router.post('/new', async (req, res) => {
	const {
		name,
		description,
		streetName,
		streetNumber,
		postalCode,
		city,
		company,
		users,
		owner,
		endDate,
	} = req.body

	const endDateFormatted = new Date(endDate)

	console.log(endDateFormatted)

	const project = new Project({
		name,
		description,
		streetName,
		streetNumber,
		postalCode,
		city,
		company,
		owner,
		endDate,
		users: [users],
	})

	console.log(req.body)
	try {
		const newProject = await project.save()
		res.status(201).json({
			message: 'Project successfully created.',
			project: newProject,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Could not create company',
			error: error,
		})

		console.log(error)
	}
})

// Update existing project
router.put('/:id', async (req, res) => {
	let project = {}

	try {
		project = await Project.findById(req.params.id)
		console.log(project)

		if (req.body.project.name != null) {
			project.name = req.body.project.name
		}

		if (req.body.project.description != null) {
			project.description = req.body.project.description
		}

		if (req.body.project.company != null) {
			project.company = req.body.project.company
		}

		if (req.body.project.users != null) {
			project.users = [...project.users, req.body.project.user.id]
		}

		await project.save()

		res.status(202).json({
			message: 'Project updated',
			project: project,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Could not update project',
			error: error,
		})
	}
})

module.exports = router
