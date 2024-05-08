const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/", async (req, res) => {
	let users = await User.find().populate("company").exec()
	res.status(200).json({ users })
})

router.post("/new", async (req, res) => {
	console.log(req.body)
	const { firstName, lastName, password, role, company } = req.body
	const user = new User({
		firstName,
		lastName,
		password,
		role,
		company,
		projects: [],
	})
	try {
		const newUser = await user.save()
		res.status(201).json({
			message: "User created successfully",
			company: newUser,
		})
	} catch (error) {
		res.status(500).json({ message: "Could not create company", error: error })
	}
})

module.exports = router
