const createClassValid = require('./../../validation/admin/createClass');

exports.createClass = async (req, res) => {
    const { isValid, errors } = createClassValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    
};