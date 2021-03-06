const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const citySchema = new Schema({
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    area: {
        type: String,
    },
    population: {
        type: String
    }
});
const City = mongoose.model('City', citySchema);
module.exports = City;