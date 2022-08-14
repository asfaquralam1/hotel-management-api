const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    uId: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    roomType: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })
const Order = mongoose.model('Order', orderSchema)
module.exports = Order