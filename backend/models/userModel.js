const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			required: false,
		},
		lastName: {
			type: String,
			required: true,
			required: false,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: false,
		},
		role: {
			type: String,
			required: false,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Company',
		},
		projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
		createdAt: {
			type: Date,
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
			default: false,
		},
	},
	{
		toJSON: true,
		toObject: true,
	}
)

userSchema.statics.signup = async function (
	email,
	firstName,
	lastName,
	password,
	mobile,
	company,
	enabled
) {
	const exists = await this.findOne({ email })

	if (!email || !password || !firstName || !lastName || !mobile) {
		throw Error('Vennligst fyll inn alle feltene')
	}

	if (!validator.isEmail(email)) {
		throw Error('E-postadressen er i feil format')
	}

	if (!validator.isStrongPassword(password)) {
		throw Error(
			'Bruk et sikrere passord. Dette må innehold minst en stor bokstav, et tegn og tall, samt være minst 8 karakterer'
		)
	}

	if (exists) {
		throw Error(
			'E-postadressen du prøver å registrere er allerede registrert'
		)
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	let role = 'disabled'

	if (enabled) {
		role = 'Administrator'
	}

	const user = await this.create({
		email,
		password: hash,
		firstName,
		lastName,
		mobile,
		company,
		enabled,
		role,
	})

	return user
}

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error('Vennligst fyll inn alle feltene')
	}

	const user = await this.findOne({ email })

	if (!user) {
		throw Error('Feil brukernavn eller passord')
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw Error('Feil brukernavn eller passord')
	}

	return user
}

userSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

userSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`
})

module.exports = mongoose.model('User', userSchema)
