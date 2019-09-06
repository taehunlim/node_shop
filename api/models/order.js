const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
        // 생략은 가능하지만 생략햇을때 값이 1이 들어간다는 의미
    }



});




module.exports = mongoose.model('Order', orderSchema);