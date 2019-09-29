const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const classesSchema = new Schema({

});
const Classes = mongoose.model('Classes', classesSchema);
module.exports = Classes;