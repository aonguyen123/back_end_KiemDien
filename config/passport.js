const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        Admin.findById(jwt_payload._id).then(admin => {
            if(admin)
            {
                return done(null, admin);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
    }));
}