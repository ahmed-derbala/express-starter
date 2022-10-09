const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: {
        type: String,
        select: false
    },
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });


module.exports = mongoose.model('posts', schema);

