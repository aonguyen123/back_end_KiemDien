const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const config = require('./config/db');
const adminRouter = require('./admin/routes/admin');
const cityRouter = require('./admin/routes/city');
const userRouter = require('./user/routes/test');
const accountRouter = require('./admin/routes/account');

mongoose.connect(config.DB,{ useNewUrlParser: true, useFindAndModify: false }).then(() => {
    console.log('database has connected');
},
err => {
    console.log('can not connect to mongodb' + err);
});

const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listened port ${PORT}`);
})
app.use('/api/admin', [adminRouter, cityRouter, accountRouter]);
app.use('/api/user', userRouter);