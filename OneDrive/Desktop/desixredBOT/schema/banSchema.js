const mongoose = require('mongoose')

const banSchema = new mongoose.Schema({
    user: { type: String, required: true },
    guild: { type: String, required: true },
    admin: { type: String, required: true },
    id: { type: Number, required: true },
    duration: { type: String, required: true },
    reason: { type: String, required: true },
    expiresFrom: { type: Date, required: false },
    expiresOn: { type: Date, required: false }
})

module.exports = mongoose.model('ban', banSchema)