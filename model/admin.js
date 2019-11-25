const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    sdt: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: ''
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;