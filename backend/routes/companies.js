const express = require("express")
const router = express.Router()
const Company = require("../models/company")

router.get("/", async (req, res) => {
	let companies = await Company.find().populate("company").exec()
	res.status(200).json({ companies })
})

router.post("/new", async (req, res) => {
	console.log(req.body)
	const company = new Company({
		name: req.body.name,
		users: [],
	})
	try {
		const newCompany = await company.save()
		res.status(201).json({
			message: "Hello, this will contain all the users",
			company: newCompany,
		})
	} catch (error) {
		res.status(500).json({ message: "Could not create company", error: error })
	}
})

module.exports = router
