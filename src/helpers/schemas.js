const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



exports.phone = new mongoose.Schema({
    fullNumber: { type: String, required: false },
    countryCode: { type: String, required: false },
    shortNumber: { type: String, required: false }
}, { _id: false, timestamps: true })

let photo = exports.photo = new mongoose.Schema({
    url: { type: String, required: false },
}, { _id: false, timestamps: true })



exports.profile = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: true,
    },
    displayname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: false,
    },
    photo
}, { _id: false, timestamps: true })


exports.price = new mongoose.Schema({
    tnd: { type: Number, required: false },
    eur: { type: Number, required: false },
    usd: { type: Number, required: false }
}, { _id: false, timestamps: true })


let location = exports.location = new mongoose.Schema({
    lat: { type: String, required: false },
    lon: { type: String, required: false },
    alt: { type: String, required: false },

}, { _id: false, timestamps: true })


exports.address = new mongoose.Schema({
    text: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    street: { type: String, required: false },
    location

}, { _id: false, timestamps: true })

