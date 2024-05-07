const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Company",
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
	},
	{
		toJSON: true,
		toObject: true,
	}
)

module.exports = mongoose.model("Project", projectSchema)
