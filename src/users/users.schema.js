const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const usersConfig = require(`../../configs/users.config`)




const profileSchema = new mongoose.Schema({
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
}, { _id: false })

const phoneSchema = new mongoose.Schema({
    fullNumber: { type: String, required: false },
    countryCode: { type: String, required: false },
    shortNumber: { type: String, required: false }
}, { _id: false, timestamps: true })


const userSchema = new mongoose.Schema({
    profile: {
        type: profileSchema,
        select: false
    },
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: false//true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: phoneSchema,
        select: false
    },
    role: {
        type: Object,
        enum: usersConfig.roles,
        default: usersConfig.roles[0]
    },
    type: {
        type: Object,
        enum: usersConfig.types,
        default: usersConfig.types[0]
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', userSchema);

