const mongoose = require("mongoose")
const Book = require("../models/Book")
const CategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Category", CategorySchema)