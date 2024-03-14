const mongoose = require("mongoose")
const Category = require("../models/Category")

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    price: Number,
    description: String,
    category:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true })

module.exports = mongoose.model("Book", BookSchema)