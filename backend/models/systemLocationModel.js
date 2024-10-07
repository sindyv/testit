const mongoose = require("mongoose")

const SystemLocationSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	deactivated: {
		type: Boolean,
		default: false,
		required: true,
	},
})

SystemLocationSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

SystemLocationSchema.statics.createSystemLocation = async function (
	systemLocationObject
) {
	const { name, projectId, userId, description } = systemLocationObject
	// console.log(systemLocationObject)
	if (!name || !projectId || !userId || !description) {
		throw Error("Vennligst fyll ut nødvendige felter")
	}

	const systemLocation = this.create({
		name,
		project: projectId,
		createdBy: userId,
		description,
	})

	return systemLocation
}

module.exports = mongoose.model("SystemLocation", SystemLocationSchema)
