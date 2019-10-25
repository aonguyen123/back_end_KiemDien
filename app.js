const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const config = require('./config/db');

const adminRouter = require('./admin/routes/admin');
const cityRouter = require('./admin/routes/city');
const accountRouter = require('./admin/routes/account');
const usersRouter = require('./admin/routes/users');
const classesRouter = require('./admin/routes/classes');

const userRouter_user = require('./user/routes/user');
const classRouter_user = require('./user/routes/class');
const kiemdienRouter_user = require('./user/routes/kiemdien');

mongoose.connect(config.DB,{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {
    console.log('database has connected');
},
err => {
    console.log('can not connect to mongodb' + err);
});

const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);
require('./config/passportUser')(passport);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listened port ${PORT}`);
})
app.use('/api/admin', [adminRouter, cityRouter, accountRouter, usersRouter, classesRouter]);
app.use('/api/user', [userRouter_user, classRouter_user, kiemdienRouter_user]);