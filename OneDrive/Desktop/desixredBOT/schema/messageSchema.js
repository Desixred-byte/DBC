const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    guild: { type: String, required: true },
    messageCount: { type: Number, required: true },
})

module.exports = mongoose.model('message', messageSchema)