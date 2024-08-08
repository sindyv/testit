const Project = require('../models/projectModel')

const getProjects = async (req, res) => {
	let projects = await Project.find().populate('users').exec()
	res.status(200).json({ projects })
}

module.exports = { getProjects }
