const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    maGV: {
        type: String,
        required: true
    },
    fisrtName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ngaysinh: {
        type: Date,
        required: true,
    },
    avatar: {
        type: String
    },
    gioitinh: {
        type: Date,
        default: Date.now,
    },
    sdt: {
        type: Number,
        required: true
    },
    ngaydangki: {
        type: Date,
        default: Date.now
    }
});
UserSchema.set('timestamps', true);
const User = mongoose.model('Users', UserSchema);
module.exports = User;