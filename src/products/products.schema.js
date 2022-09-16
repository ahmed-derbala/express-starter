const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const enums = require('../../helpers/enums')
const schemas = require('../../helpers/schemas')


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: string,
        enum: enums.categories.products,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shops',
    },
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enterprises',
    },
    isActive: {
        type: Boolean,
        default: true
    },
    price: {
        type: schemas.price,
    },
},
    { timestamps: true });

schema.plugin(uniqueValidator);

module.exports = mongoose.model('products', schema);

