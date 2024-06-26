const express = require("express")
const router = express.Router()
const Company = require("../models/company")

// Fetch all companies in database
router.get("/", async (req, res) => {
	let companies = await Company.find().populate("users").exec()
	res.status(200).json({ companies })
})

// Create a new company
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

// Update existing company
router.put("/:id", async (req, res) => {
	let company = {}
	console.log("Adduser Status: " + req.query.adduser)

	try {
		company = await Company.findById(req.params.id)
		if (req.body.company?.user?.id != null || req.body.company?.users != null) {
			if (req.query.adduser) {
				company.users = [...company.users, req.body.company.user.id]
			} else {
				company.users = [...req.body.company.users]
			}
		}

		if (req.body.company.name != null) {
			company.name = req.body.company.name
		}

		if (req.body.company.enabled != null) {
			company.enabled = req.body.company.enabled
		}

		await company.save()

		res.status(200).json({
			message: "Company updated",
			company: company,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Could not update company", error: error })
	}
})
module.exports = router
