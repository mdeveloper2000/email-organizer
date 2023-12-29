const mongoose = require("mongoose")

const Email = new mongoose.model("Email", new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 100
    }
}))

module.exports = Email