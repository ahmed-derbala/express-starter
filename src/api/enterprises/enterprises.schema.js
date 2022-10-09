const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemas = require('../../helpers/schemas')





const schema = new mongoose.Schema({
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
        type: schemas.phone,
        select: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });

schema.plugin(uniqueValidator);

module.exports = mongoose.model('enterprises', schema);

