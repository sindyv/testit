const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			// required: true,
			required: false,
		},
		lastName: {
			type: String,
			// required: true,
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
		role: {
			type: String,
			// required: true,
			required: false,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
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
			default: true,
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
	role,
	company
) {
	const exists = await this.findOne({ email })

	if (!email || !password) {
		throw Error('Please fill inn all fields')
	}

	if (!validator.isEmail(email)) {
		throw Error('Please use a valid email')
	}

	if (!validator.isStrongPassword(password)) {
		throw Error('Please use a more secure password')
	}

	if (exists) {
		throw Error('User already exists')
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({
		email,
		password: hash,
		firstName,
		lastName,
		role,
		company,
	})

	return user
}

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error('Please fill inn all fields')
	}

	const user = await this.findOne({ email })

	if (!user) {
		throw Error('Wrong credentials')
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw Error('Wrong credentials (Password)')
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
