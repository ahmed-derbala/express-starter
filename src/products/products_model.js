const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
    isActive:{
        type:Boolean,
        default:true
    }


},
    { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

mongoose.model('Products', schema);

