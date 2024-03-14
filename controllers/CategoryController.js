const Category = require('../models/Category')
const Book = require('../models/Book')
const { default: mongoose } = require('mongoose')

const categoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.aggregate([
                {
                    $lookup: {
                        from: 'books', // Name of the book collection
                        localField: '_id',
                        foreignField: 'category',
                        as: 'books'
                    }
                },
                { $sort: { updatedAt: -1 } }
            ])

            return res.status(200).json(categories)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    getOne: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const data = await Category.aggregate([
                {
                    $lookup: {
                        from: 'books', // Name of the book collection
                        localField: '_id',
                        foreignField: 'category',
                        as: 'books'
                    }
                },
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(categoryId)
                    }
                }
            ]);
            if (!data) throw new Error("No such category")
            return res.status(200).json(data[0])
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        try {
            const data = new Category(req.body)
            const result = await data.save();
            return res.status(201).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    update: async (req, res) => {
        try {
            const data = await Category.findById(req.params.id)
            if (!data) {
                throw new Error("No such category")
            } else {
                const updatedData = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                return res.status(200).json(updatedData)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    deleted: async (req, res) => {
        try {
            const data = await Category.findById(req.params.id)
            if (!data) {
                throw new Error("No such data")
            } else {
                var result = await Category.findByIdAndDelete(req.params.id)
                return res.status(200).json(result)
            }


        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },

}

module.exports = categoryController;