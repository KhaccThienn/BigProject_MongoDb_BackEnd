const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
.then((success) => {
    console.log(`Connected to ${process.env.MONGO_URL} with ${success.connection.name}`)
})
.catch((error) => {
    console.log(error);
});