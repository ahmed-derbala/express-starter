const mongoose = require('mongoose');
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

schema.plugin(uniqueValidator);

module.exports = mongoose.model('sessions', schema);


