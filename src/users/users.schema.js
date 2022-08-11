const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
const usersConfig = require(`../../configs/users.config`)

const schema = new mongoose.Schema({
    profile: {
        type: {
            firstname: {
                type: String,
                required: true,
            },
            middlename: {
                type: String,
                required: false,
            },
            lastname: {
                type: String,
                required: true,
            },
            displayname: {
                type: String,
                required: true,
            },
            birthdate: {
                type: Date,
                required: false,
            },
        },
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
    phones: {
        type: [
            {
                fullNumber: { type: String, required: false },
                countryCode: { type: String, required: false },
                shortNumber: { type: String, required: false }
            }//phone[0] is the primary phone
        ],
        select: false
    },
    role: {
        type: Object,
        enum: usersConfig.roles,
        default: usersConfig.roles[0]
    },
    type: {
        type: Object,
        enum: usersConfig.types,
        default: usersConfig.types[0]
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('users', schema);

