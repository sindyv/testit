const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Company",
		},
		projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
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

userSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

userSchema.virtual("fullName").get(function () {
	return `${this.firstName} ${this.lastName}`
})

module.exports = mongoose.model("User", userSchema)
