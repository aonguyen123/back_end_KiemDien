const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        Users.findById(jwt_payload._id).then(user => {
            if(user)
            {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
    }));
}