const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const enums=require('../../helpers/enums')
const schemas =require('../../helpers/schemas')


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
    phone: {
        type: schemas.phone,
        select: false
    },
    category: {
        type: string,
        enum: enums.categories.shops,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enterprises',
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });

schema.plugin(uniqueValidator);

module.exports = mongoose.model('shops', schema);

