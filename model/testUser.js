const mongoose = require('mongoose');

const Scheme = mongoose.Schema;
const svSchema = new Scheme({
    mssv: {
        type: String,
        required: true
    },
    ten: {
        type: String,
        required: true
    }
});
const SV = mongoose.model('SV', svSchema);
module.exports = SV;