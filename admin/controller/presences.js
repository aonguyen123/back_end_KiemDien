const moment = require('moment'); 
const Classes = require('./../../model/classes');
const User = require('./../../model/user');
const Presences = require('./../../model/presences');

exports.getClassPresences = async (req, res) => {
    const lops = await Classes.find({managed: true});
    if(lops.length !== 0)
    {
        lops.map(async item => {
            if(moment(item.thoigianketthuc).isBefore(moment().toISOString()) && item.status)
            {
                const updated = await Classes.findByIdAndUpdate(item._id, {status: false});
                if(!updated) return ;
            }
        });
    }
    const classes = await Classes.find({managed: true}).sort({_id: 'desc'});
    if(classes.length !== 0)
    {
        for (let i = 0; i < classes.length; i++) {
            const user = await User.findById(classes[i].idUser);
            if(user)
            {
                classes[i].set('tenUser', user.name, {strict: false}); 
            }
            const checkDate = await Presences.findOne({idClass: classes[i]._id});
            if(checkDate) 
            {
                classes[i].set('checkDate', checkDate.updatedAt, {strict: false});
            }
        }
    }    
    return res.json(classes);
};