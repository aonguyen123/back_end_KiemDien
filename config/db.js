const dbAccount = {
    user: 'admin',
    pass: 'admin123456'
}
module.exports = {
    DB: `mongodb://${dbAccount.user}:${dbAccount.pass}@ds159188.mlab.com:59188/do_an_kiemdien`
}