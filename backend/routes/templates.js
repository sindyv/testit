const express = require("express")
const router = express.Router()
const Template = require("../models/template")

router.get("/", async (req, res) => {
	res
		.status(200)
		.json({ message: "Hello, this will contain all the templates" })
})

// Create a new template
router.post("/new", async (req, res) => {
	const template = new Template({
		...req.body.template,
	})
	try {
		const newTemplate = await template.save()
		res.status(201).json({
			message: "Template successfully created.",
			project: newTemplate,
		})
	} catch (error) {
		res.status(500).json({ message: "Could not create template", error: error })
	}
})

module.exports = router
