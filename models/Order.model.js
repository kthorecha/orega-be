'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

let Order = new Schema({
    userId: {
        type: ObjectId,
        ref: 'Users'
    },
    subtotal: {
        type: Number
    },
    date: {
        type: Date
    }
})

module.exports = Mongoose.model('Orders',Order)