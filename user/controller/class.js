const Classes = require('./../../model/classes');

exports.getClassByIdUser = async (req, res) => {
    const { id } = req.query;
    const classes = await Classes.find({idUser: id});
    return res.json({
        isSuccess: true,
        classes
    });
};