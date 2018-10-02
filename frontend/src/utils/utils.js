const hasDSign = str => str.indexOf('$') > -1
// eslint-disable-next-line
const isNumber = str => !isNaN(hasDSign(str) ? str.slice(1) : str)

module.exports = { hasDSign, isNumber }
