const mongoose = require("mongoose")

const testSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Project",
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

testSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = mongoose.model("Test", testSchema)
