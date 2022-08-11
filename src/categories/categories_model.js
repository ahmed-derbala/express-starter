const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
const categoriesConstant=require(`./categories.constant`)

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: Object,
        enum: categoriesConstant.types,
        default: categoriesConstant.types[0]
    },
    isActive:{
        type:Boolean,
        default:true
    }


},
    { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

mongoose.model('Categories', schema);

