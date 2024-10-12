const mongoose = require('mongoose')

const filesSchema = new mongoose.Schema(
	{
		fileName: {
			type: String,
			required: true,
		},
		originalName: {
			type: String,
			required: true,
		},
		fileRelation: {
			type: String,
			required: true,
		},
		approved: {
			type: Boolean,
			default: false,
		},
		system: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'System',
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
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

filesSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

filesSchema.pre('replaceOne', function (next) {
	this.updatedAt = Date.now()
	next()
})

filesSchema.statics.createFile = async function (fileObject) {
	const {
		fileName,
		originalName,
		systemId,
		companyId,
		projectId,
		userId,
		fileRelation,
	} = fileObject

	if (!fileName || !originalName || !companyId || !userId || !fileRelation) {
		throw Error('Please fill all inn all fields')
	}

	const savedFile = this.create({
		fileName,
		originalName,
		fileRelation,
		system: systemId,
		company: companyId,
		project: projectId,
		createdBy: userId,
	})

	return savedFile
}
module.exports = mongoose.model('Files', filesSchema)
