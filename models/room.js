const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            // required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },

    },
    {
        timestamps: true
    }
);


const Room = mongoose.model('Room',roomSchema) 
module.exports = Room