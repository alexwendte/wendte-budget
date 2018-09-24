const hasDSign = str => str.indexOf('$') > -1;
const isNumber = str => str.length === 0 || +str;

module.exports = { hasDSign, isNumber };
