const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const enums=require('../../helpers/enums')








const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: string,
        enum: enums.categories.product,
    },
    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    enterprise: {
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

module.exports = mongoose.model('products', schema);

