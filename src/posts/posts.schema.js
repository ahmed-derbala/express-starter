const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        select: false
    },
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false,
        },
    ],
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

mongoose.model('Posts', schema);

