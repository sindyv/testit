const validator = require('validator')
const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
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
		website: {
			type: String,
		},
		organisationNumber: {
			type: Number,
			required: true,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				default: [],
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
		readOnly: {
			type: Boolean,
			default: false,
		},
	},
	{
		toJSON: true,
		toObject: true,
	}
)

companySchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

companySchema.pre('replaceOne', function (next) {
	this.updatedAt = Date.now()
	next()
})

companySchema.statics.createCompany = async function (companyDetails) {
	const {
		companyName,
		organisationNumber,
		email,
		address,
		city,
		postnu,
		readOnly,
	} = companyDetails

	if (!companyName || !organisationNumber || !email) {
		throw Error('Please fill all inn all fields')
	}

	if (!validator.isEmail(email)) {
		throw Error('Please use a valid email')
	}

	const company = this.create({
		companyName,
		organisationNumber,
		email,
		address,
		city,
		postnu,
		readOnly,
	})

	return company
}
module.exports = mongoose.model('Company', companySchema)
