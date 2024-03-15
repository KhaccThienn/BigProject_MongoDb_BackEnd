const mongoose = require("mongoose")
const Book = require("../models/Book")

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profileImg: String,
    role_id: Number,
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
}, { timestamps: true })

UserSchema.methods.addToWishlist = function (book) {
    let wishlist = this.wishList;
    console.log(wishlist);
    if (wishlist.length === 0) {
        wishlist.push(book);
        this.save()
        return "Saved to wishlist"
    } else {
        const isExisting = wishlist.find(objItem => objItem._id == book._id);
        console.log(isExisting);
        if (isExisting) {
            wishlist.remove(isExisting);
            this.save()
            return "Removed from wishlist"

        } else {
            wishlist.push(book);
            this.save()
            return "Saved to wishlist"
        }
    }
}

UserSchema.methods.deleteFromWishlist = function (book_id) {
    let wishlist = this.wishList;
    console.log(wishlist);

    const isExisting = wishlist.find(objItem => objItem._id == book_id);
    console.log(isExisting);
    if (isExisting) {
        wishlist.remove(isExisting);
        this.save()
        return "Removed from wishlist"
    }
}


module.exports = mongoose.model("User", UserSchema)