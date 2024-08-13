const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		streetName: {
			type: String,
		},
		streetNumber: {
			type: String,
		},
		postalCode: {
			type: Number,
		},
		city: {
			type: String,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Company',
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		webHotel: {
			type: String,
		},
		owner: {
			type: String,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
projectSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})
module.exports = mongoose.model('Project', projectSchema)
