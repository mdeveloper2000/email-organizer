const mongoose = require("mongoose")

const Subscription = new mongoose.model('Subscription', new mongoose.Schema({
    email_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email',
        required: true
    },
    item: {
        type: String,
        required: true,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['RECOVERY', 'SUBSCRIPTION', 'OTHER'],
        required: true
    },
    extra: {
        type: String,
        required: false,
        maxlength: 200
    }
}))

module.exports = Subscription