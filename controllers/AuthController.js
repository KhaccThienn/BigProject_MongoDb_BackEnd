const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const User = require('../models/User')

const authController = {
    register: async (req, res) => {
        req.body.profileImg = "http://" + req.get('host') + `/images/${req.file.filename}`;
        try {
            const isExisting = await User.findOne({ email: req.body.email })

            if (isExisting) {
                return res.status(400).json("Email is already taken by another user")
            }

            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            req.body.password = hashedPassword;

            const data = new User(req.body)
            const result = await data.save();
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json("Failed to login")
            }

            const comparePass = await bcrypt.compareSync(req.body.password, user.password)
            if (!comparePass) {
                return res.status(400).json("Failed to login")
            }

            const { password, ...userData } = user._doc
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' })

            return res.status(200).json({ userData, token })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = authController;