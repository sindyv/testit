const mongoose = require('mongoose')

const systemSchema = new mongoose.Schema({
	systemLocation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SystemLocation',
	},

	systemCode: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SystemCode',
	},
	systemNumber: {
		type: String,
	},
	description: {
		type: String,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
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

systemSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

systemSchema.statics.createSystem = async function (systemObject) {
	const {
		systemLocation,
		systemCode,
		projectId,
		userId,
		description,
		systemNumber,
	} = systemObject
	console.log(projectObject)
	if (
		!systemLocation ||
		!systemCode ||
		!projectId ||
		!userId ||
		!description ||
		!systemNumber
	) {
		throw Error('Vennligst fyll ut nødvendige felter')
	}

	const system = this.create({
		systemLocation,
		systemCode,
		projectId,
		userId,
		description,
		systemNumber,
	})

	return system
}

module.exports = mongoose.model('System', systemSchema)
