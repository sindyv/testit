const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
	{
		projectName: {
			type: String,
			required: true,
		},
		projectDescription: {
			type: String,
		},
		address: {
			type: String,
		},
		postnu: {
			type: Number,
		},
		city: {
			type: String,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Company",
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		webhotel: {
			type: String,
		},
		owner: {
			type: String,
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		started: {
			type: Boolean,
			default: false,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
			required: true,
		},
		deactivated: {
			type: Boolean,
			default: false,
			required: true,
		},
		systemLocations: {
			type: [{ name: String, description: String }],
		},
		systemCodes: {
			type: [{ name: String }],
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
	},
	{
		toJSON: true,
		toObject: true,
	}
)
projectSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

projectSchema.statics.createProject = async function (projectObject) {
	const {
		projectName,
		projectDescription,
		address,
		city,
		postnu,
		owner,
		endDate,
		webhotel,
		company,
		createdBy,
		users,
	} = projectObject
	console.log(projectObject)
	if (!projectName || !projectDescription || !endDate) {
		throw Error("Vennligst fyll ut nødvendige felter")
	}

	const project = this.create({
		projectName,
		projectDescription,
		address,
		city,
		postnu,
		owner,
		endDate,
		webhotel,
		company,
		createdBy,
		users,
	})

	return project
}
module.exports = mongoose.model("Project", projectSchema)
