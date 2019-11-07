const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const checkDateSchema = new Schema({
    idClass: {
        type: String,
        required: true
    },
    dateList: [
        {
            date: {
                type: String,
                required: true
            }
        }
    ]
});
checkDateSchema.set('timestamps', true);
const CheckDate = mongoose.model('CheckDate', checkDateSchema);
module.exports = CheckDate;