const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    messageID: String,
    channelID: String,
    productName: String,
    productFeatures: String,
    productPayee: String,
    productPrice: Number,
})

module.exports = mongoose.model('Packages', packageSchema, 'packages');