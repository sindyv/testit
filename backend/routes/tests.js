const express = require("express")
const router = express.Router()
const Test = require("../models/test")
router.get("/", async (req, res) => {
	let tests = await Test.find().populate("createdBy").populate("project").exec()
	res.status(200).json({ tests })
})

// Create a new test
router.post("/new", async (req, res) => {
	const test = new Test({
		...req.body.test,
	})
	try {
		const newTest = await test.save()
		res.status(201).json({
			message: "Test successfully created.",
			project: newTest,
		})
	} catch (error) {
		res.status(500).json({ message: "Could not create test", error: error })
	}
})

module.exports = router
