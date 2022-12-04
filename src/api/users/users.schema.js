const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const  conf  = require(`../../utils/loadConf`)
const schemas = require('../../helpers/schemas')
const enums = require('../../helpers/enums')


const schema = new mongoose.Schema({
    profile: {
        type: schemas.profile,
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
    phone: {
        type: schemas.phone,
        select: false
    },
    role: {
        type: Object,
        enum: conf().users.roles,
        default: conf().users.roles[0]
    },
    type: {
        type: Object,
        enum: conf().users.types,
        default: conf().users.types[0]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    jobs: [
        {
            name: {
                type: String,
                enum: enums.jobs.names
            },
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'shops',
            },
        }
    ],
    address: {
        type: schemas.address,
        select: false
    },
},
    { timestamps: true });

schema.plugin(uniqueValidator);

module.exports = mongoose.model('users', schema);

