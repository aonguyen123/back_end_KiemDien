const checkSpecialCharacters = str => {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; 
    if(format.test(str))
    {
        return true;
    }
    return false;
};
module.exports = checkSpecialCharacters;