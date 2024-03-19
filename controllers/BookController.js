const Book = require('../models/Book');
const fs = require('fs');

const bookController = {
    getAll: async (req, res) => {
        try {
            const data = await Book.find({}).populate("category").sort({ updatedAt: -1 });
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    getAllByLimit: async (req, res) => {
        try {
            const data = await Book.find({}).populate("category").sort({ updatedAt: -1 }).limit(8);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    searching: async (req, res) => {
        const searchStr = req.params.name;
        console.log(searchStr);
        try {
            const data = await Book.find({ title: new RegExp(searchStr, 'i') }).populate("category");
            if (data.length === 0) throw new Error("No such category");
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await Book.findById(req.params.id).populate("category");
            if (!data) throw new Error("No such book found")
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        try {
            req.body.image = "http://" + req.get('host') + `/images/${req.file.filename}`;
            const data = new Book(req.body)
            const result = await data.save();
            return res.status(201).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    update: async (req, res) => {
        try {
            const data = await Book.findById(req.params.id)
            if (!data) {
                throw new Error("No such book found")
            } else {
                if (req.file != null) {
                    req.body.image = "http://" + req.get('host') + `/${req.file.filename}`;
                    const old_file_path = "./public/images/" + data.image.replace(`http://${req.get('host')}/images/`, "");
                    console.log(old_file_path);
                    fs.unlink(old_file_path, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('File was deleted');
                    });
                } else {
                    req.body.image = data.image;
                }
                const updatedData = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate("category")
                return res.status(200).json(updatedData)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    deleted: async (req, res) => {
        try {
            const data = await Book.findById(req.params.id)
            if (!data) {
                throw new Error("No such data")
            } else {
                const old_file_path = "./public/images/" + data.image.replace(`http://${req.get('host')}/images/`, "");
                console.log(old_file_path);
                fs.unlink(old_file_path, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('File was deleted');
                });
                var result = await Book.findByIdAndDelete(req.params.id)
                return res.status(200).json(result)
            }


        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },

}

module.exports = bookController;