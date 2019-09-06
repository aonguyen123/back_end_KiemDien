const dbAccount = {
    user: 'admin',
    pass: 'admin123'
}
module.exports = {
    DB: `mongodb://${dbAccount.user}:${dbAccount.pass}@ds261114.mlab.com:61114/login-auth`
}