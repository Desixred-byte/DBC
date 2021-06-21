const mongoose = require('mongoose')

const warnSchema = new mongoose.Schema({
	user: { type: String, required: true },
	guild: { type: String, required: true },
	warns: { type: Object, required: true }
})

module.exports = mongoose.model('warn', warnSchema)
