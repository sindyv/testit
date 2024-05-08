const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Company",
		},
		inputFields: [
			{
				fieldType: {
					type: String,
					required: true,
				},
				fieldLabel: {
					type: String,
					required: true,
				},
				fieldPlaceholder: {
					type: String,
				},
				fieldSelects: [
					{
						value: String,
						text: String,
					},
				],
				enabled: {
					type: Boolean,
					default: true,
				},
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
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

templateSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = mongoose.model("Template", templateSchema)
