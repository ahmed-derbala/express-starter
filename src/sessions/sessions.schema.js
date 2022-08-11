const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        ref: 'Users',
        required: true,
    },
    headers: {
        type: Object,
        required: true,
    },
    ip: { type: String, required: true }

},
    { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('sessions', schema);


