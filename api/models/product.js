const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    price : String
});


module.exports = mongoose.model("Product", productSchema);