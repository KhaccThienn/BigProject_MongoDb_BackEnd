const User = require('../models/User')
const Book = require('../models/Book')
const userSchema = new User();
const wishListController = {
    addToWishlist: async (req, res) => {
        const user = await User.findById(req.body.userId);
        const isAdded = user.addToWishlist(req.body.payload);
        console.log(isAdded);
        return res.json(isAdded)
    },
    removeFromWishlist: async (req, res) => {
        const user = await User.findById(req.body.userId);
        const isAdded = user.deleteFromWishlist(req.body.payload);
        console.log(isAdded);
        return res.json(isAdded)
    }
}
module.exports = wishListController;