const mongoose = require("mongoose")

const companySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		createdAt: {
			type: Date,
			required: true,
			immutable: true,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		enabled: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		toJSON: true,
		toObject: true,
	}
)

companySchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})
module.exports = mongoose.model("Company", companySchema)
