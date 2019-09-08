const registerValid = require('./../validation/register');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('./../model/user');

exports.getAllData = async (req, res) => {
    const listUser = await User.find();
    if(!listUser)
    {
        return res.status(400).json({
            success: false
        })
    }
    res.status(200).json({
        users: listUser
    })
}
exports.createUser = async (req, res) => {
    const { errors, isValid } = registerValid(req.body);
    if(!isValid)
    {
        return res.status(200).json({
            isSuccess: false,
            errors
        });
    }
    const user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(200).json({
            isSuccess: false,
            email: 'Email đã tồn tại'
        });
    }
    const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
    });
    bcrypt.genSalt(10, (err, salt) => {
        if(err)
        {
            console.log('loi bcrypt', err);
        }
        else
        {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err)
                {
                    console.log('loi hash', err);
                }
                else
                {
                    newUser.password = hash;
                    newUser.save().then(user => {
                        res.json({
                            isSuccess: true
                        });
                    });
                }
            });
        }
    });
}