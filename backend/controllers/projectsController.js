const Project = require("../models/projectModel")
const User = require("../models/userModel")

const getProjects = async (req, res) => {
	const query = req?.query ?? {}
	console.log(query)
	try {
		const projects = await Project.find(query).populate("users").exec()
		if (!projects) {
			throw Error("Kunne ikke finne noen brukere i dette firmaet")
		}
		res.status(200).json({ projects })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message || "Noe gikk galt" })
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
			message: error.message || "Vi klarte ikke å opprette prosjektet",
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
			throw Error("Kunne ikke oppdatere prosjektet")
		}
		res.status(200).json({ newProject })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message || "Noe gikk galt" })
	}
}

const addSystemLocationCode = async (req, res) => {
	const { projectId } = req.params
	const { systemLocation } = req.body
	console.log(systemLocation)

	try {
		// Find project
		const project = await Project.findById(projectId)

		// Push system location code to project
		project.systemLocations.push({
			name: systemLocation.locCode,
			description: systemLocation.description,
		})

		// Save project
		await project.save()

		// Return project
		res.status(201).json({ project })
	} catch (error) {
		res.status(400).json({
			message: error.message || "Vi klarte ikke å opprette systemlokasjonen",
		})
	}
}

module.exports = {
	getProjects,
	addProject,
	updateProject,
	addSystemLocationCode,
}
