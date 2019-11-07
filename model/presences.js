const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const presencesSchema = new Schema({
    idClass: {
        type: String,
        required: true
    },  
    presenceList: [
        {
            memberCode: {
                type: String,
                required: true
            },
            checkDate: {
                type: String,
                required: true
            }
        }
    ]
});
presencesSchema.set('timestamps', true);
const Presences = mongoose.model('Presences', presencesSchema);
module.exports = Presences;