const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profileImg: String,
    role_id: Number
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)