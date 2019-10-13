const xoa_dau = require('./xoa_dau');

module.exports = str => {
    let arrStr = str.split(" ");
    let malop = arrStr.map(value => value[0]).join('');
    malop = malop.toUpperCase();
    const rs = xoa_dau(malop);
    return rs;
}