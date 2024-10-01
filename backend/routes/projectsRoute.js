const express = require("express")
const router = express.Router()
const Project = require("../models/projectModel")
const {
	getProjects,
	addProject,
	updateProject,
	addSystemLocationCode,
	addSystemSystemCode,
} = require("../controllers/projectsController")
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

router.get("/", getProjects)

// Create a new project
router.post("/", addProject)

// Update existing project
router.put("/:projectId", updateProject)

// Add systemLocation
router.post("/:projectId/systems/locations", addSystemLocationCode)

// Add systemNumber
router.post("/:projectId/systems/codes", addSystemSystemCode)

module.exports = router
