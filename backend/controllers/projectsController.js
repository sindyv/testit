const Project = require('../models/projectModel')
const System = require('../models/systemModel')
const SystemCode = require('../models/systemCodeModel')
const SystemLocation = require('../models/systemLocationModel')
const User = require('../models/userModel')

const getProjects = async (req, res) => {
	const query = req?.query ?? {}
	console.log(query)
	try {
		const projects = await Project.find(query)
			.populate({
				path: 'systems',
				populate: { path: 'systemCode' },
			})
			.populate({
				path: 'systems',
				populate: { path: 'systemLocation' },
			})
			.populate({
				path: 'users',
			})
			.populate({
				path: 'owner',
			})
			.exec()
		if (!projects) {
			throw Error('Kunne ikke finne noen brukere i dette firmaet')
		}
		res.status(200).json({ projects })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
	// let projects = await Project.find().populate('users').exec()
	// res.status(200).json({ projects })
}

const addProject = async (req, res) => {
	const { projectObject } = req.body
	try {
		// Create a new project
		const newProject = await Project.createProject(projectObject)

		// Find owner and push the project to its project-list
		const owner = await User.findById({ _id: projectObject.owner })
		owner.projects.push(newProject._id)
		const updatedUser = await User.findOneAndUpdate(
			{ _id: projectObject.owner },
			owner
		)

		// Return project
		res.status(201).json({ newProject })
	} catch (error) {
		res.status(400).json({
			message: error.message || 'Vi klarte ikke å opprette prosjektet',
		})
	}
}

const updateProject = async (req, res) => {
	const { project } = req.body
	const { projectId } = req.params
	try {
		const beforeUpdate = await Project.findOneAndUpdate(
			{ _id: projectId },
			project
		)

		const newProject = await Project.findById(projectId)
		if (!newProject) {
			throw Error('Kunne ikke oppdatere prosjektet')
		}
		res.status(200).json({ newProject })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}

const addSystemLocationCode = async (req, res) => {
	const { projectId } = req.params
	const { systemLocation } = req.body
	try {
		const newSystemLocation = await SystemLocation.createSystemLocation({
			...systemLocation,
			projectId,
		})

		// Return project
		res.status(201).json({ newSystemLocation })
	} catch (error) {
		// console.log(error)
		res.status(400).json({
			message:
				error.message || 'Vi klarte ikke å opprette systemlokasjonen',
		})
	}
}

const addSystemSystemCode = async (req, res) => {
	const { projectId } = req.params
	const { systemCode } = req.body

	try {
		const newSystemCode = await SystemCode.createSystemCode({
			...systemCode,
			projectId,
		})

		// Return project
		res.status(201).json({ newSystemCode })
	} catch (error) {
		// console.log(error)
		res.status(400).json({
			message:
				error.message || 'Vi klarte ikke å opprette systemnummeret',
		})
	}
}

const addSystem = async (req, res) => {
	const { projectId } = req.params
	const system = req.body

	try {
		const newSystem = await System.createSystem({ ...system, projectId })
		// Find project
		const project = await Project.findById({ _id: projectId })

		if (!Array.isArray(project.systems)) {
			project.systems = []
		}
		// Push system location code to project
		project.systems.push(newSystem._id)

		// Save project
		await project.save()
		// Return project
		res.status(201).json({ project })
	} catch (error) {
		// console.log(error)
		console.log(error)
		res.status(400).json({
			message: error.message || 'Vi klarte ikke å opprette systemet',
		})
	}
}

const getSystemCodesAndLocations = async (req, res) => {
	const query = req?.query ?? {}
	const { projectId } = req.params
	try {
		const systemLocations = await SystemLocation.find(query)
		const systemCodes = await SystemCode.find(query)

		if (!systemLocations || !systemCodes) {
			throw Error(
				'Kunne ikke finne alle systemparameterne for dette prosjetket'
			)
		}
		res.status(200).json({ systemCodes, systemLocations })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message || 'Noe gikk galt' })
	}
}

module.exports = {
	getProjects,
	addProject,
	updateProject,
	addSystemLocationCode,
	addSystemSystemCode,
	addSystem,
	getSystemCodesAndLocations,
}
