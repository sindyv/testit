const mongoose = require('mongoose')

const systemCodeSchema = new mongoose.Schema({
	name: {
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

systemCodeSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

systemCodeSchema.statics.createSystemCode = async function (systemCodeObject) {
	const { name, projectId, userId } = systemCodeObject
	console.log(systemCodeObject)
	if (!name || !projectId || !userId) {
		throw Error('Vennligst fyll ut nødvendige felter')
	}

	const systemCode = this.create({
		name,
		projectId,
		userId,
	})

	return systemCode
}

module.exports = mongoose.model('SystemCode', systemCodeSchema)
