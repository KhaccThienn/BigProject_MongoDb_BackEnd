const bcrypt = require('bcrypt')
const fs = require('fs');
const User = require('../models/User')

const usersController = {
    getAll: async (req, res) => {
        try {
            const users = await User.find({})
            return res.status(200).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    getOne: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select("-password")
            if (!user) throw new Error("No such user")
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        req.body.profileImg = "http://" + req.get('host') + `/images/${req.file.filename}`;
        try {
            const isExisting = await User.findOne({ email: req.body.email })

            if (isExisting) {
                throw new Error("Email is already taken by another user")
            }

            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            req.body.password = hashedPassword;

            const data = new User(req.body)
            const result = await data.save();
            return res.status(201).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    update: async (req, res) => {
        try {
            if (req.body._id != req.params.id) throw new Error("Id mismatch")
            const user = await User.findById(req.params.id)
            if (!user) {
                throw new Error("No such user")
            } else {
                if (req.file != null) {
                    req.body.image = req.get('host') + `/${req.file.filename}`;
                    const old_file_path = "./public/images/" + user.profileImg.replace(`http://${req.get('host')}/images/`, "");
                    console.log(old_file_path);
                    fs.unlink(old_file_path, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('File was deleted');
                    });
                } else {
                    req.body.profileImg = user.profileImg;
                }
                if (req.body.password) {
                    const newPassword = await bcrypt.hashSync(req.body.password, 10)
                    req.body.password = newPassword
                } else {
                    req.body.password = user.password
                }
                const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

                return res.status(200).json(updatedUser)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    deleted: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                throw new Error("No such user")
            } else {
                const old_file_path = "./public/images/" + user.profileImg.replace(`http://${req.get('host')}/images/`, "");
                console.log(old_file_path);
                fs.unlink(old_file_path, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('File was deleted');
                });

                var result = await User.findByIdAndDelete(req.params.id)

                return res.status(200).json(result)
            }


        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
}

module.exports = usersController;