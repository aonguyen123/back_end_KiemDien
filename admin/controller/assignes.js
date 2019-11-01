const moment = require('moment');
const Classes = require('./../../model/classes');
const User = require('./../../model/user');

exports.getClassAssignes = async (req, res) => {
    const lops = await Classes.find({status: true});
    if(lops.length !== 0)
    {
        lops.map(async item => {
            if(moment(item.thoigianketthuc).isBefore(moment().toISOString()))
            {
                const updated = await Classes.findByIdAndUpdate(item._id, {status: false});
                if(!updated) return ;
            }
        });
    }
    const classes = await Classes.find({status: true}).sort({_id: 'desc'});
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].idUser)
        {
            const user = await User.findById(classes[i].idUser);
            if(user)
            {
                classes[i].set('tenUser', user.name, {strict:false}); 
            }
        }
    }
    return res.json(classes);
};