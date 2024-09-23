const validator = require('validator')
const mongoose = require('mongoose')

const externalCompanyuSchema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		streetName: {
			type: String,
		},
		streetNumber: {
			type: String,
		},
		orgNu: {
			type: Number,
		},
		postalCode: {
			type: Number,
		},
		city: {
			type: String,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		website: {
			type: String,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		attachedCompany: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company',
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
externalCompanyuSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

externalCompanyuSchema.statics.addExternalCompany = async function (
	companyName,
	orgNu,
	email,
	streetnu,
	streetname,
	website,
	city,
	postnu,
	user
) {
	if (!companyName || !orgNu || !email) {
		throw Error('Please fill all inn all fields')
	}

	if (!validator.isEmail(email)) {
		throw Error('Please use a valid email')
	}

	const externalCompany = this.create({
		companyName,
		orgNu,
		email,
		streetnu,
		streetname,
		website,
		city,
		postnu,
		createdBy: user.id,
		attachedCompany: user.company,
	})

	return externalCompany
}
module.exports = mongoose.model('ExternalCompany', externalCompanyuSchema)
