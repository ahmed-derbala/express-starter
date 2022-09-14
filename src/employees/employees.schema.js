const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemas = require('../../helpers/schemas')





const schema = new mongoose.Schema({
    profile: {
        type: schemas.profile,
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
        type: schemas.phone,
        select: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shops',
    },
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enterprises',
    },
},
    { timestamps: true });

schema.plugin(uniqueValidator);

module.exports = mongoose.model('employees', schema);

