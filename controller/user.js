const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginValid = require('./../validation/login');
const registerValid = require('./../validation/register');

const User = require('./../model/user');

exports.register = async (req, res) => {
    const { errors, isValid } = registerValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if(user)
    {
        return res.status(400).json({
            email: 'Email đã tồn tại'
        });
    }
    else
    {
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
                console.log('Loi', err);
            }
            else
            {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err)
                    {
                        console.log('hash loi', err);
                    }
                    else
                    {
                        newUser.password = hash;
                        newUser.save().then(user => {
                            res.json(user);
                        });
                    }
                });
            }
        });
    }
}
exports.login = async (req, res) => {
    const { errors, isValid } = loginValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user)
    {
        errors.email = 'User không tồn tại';
        return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch)
        {
            const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                email: user.email
            }
            jwt.sign(payload, 'secret', {
                expiresIn: 3600
            }, (err, token) => {
                if(err)
                {
                    console.log('Loi in Token', err);
                }
                else
                {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    });
                }
            });
        }
        else
        {
            errors.password = 'Mật khẩu không đúng'
            return res.status(400).json(errors);
        }
    });
}
exports.getMe = async (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    });
}