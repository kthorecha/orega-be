'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema
// const ObjectId = Schema.ObjectId;

let User = new Schema({
    name: {
        type: String
    },
    noOfOrders: {
        type: Number,
        default: 0
    }
})

module.exports = Mongoose.model('Users',User)