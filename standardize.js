const errors = require('./errors')

const badDigits = /[^0-9+ \(\)-\.]/
const extension = /^(?:\+?1[ .-]?)?(?:([0-9]{3})|\(([0-9]{3})\))[ .-]?([0-9]{3})[ .-]?([0-9]{4})(?:#|ext.?)([0-9]+)$/
const ideal = /^(?:\+?1[ .-]?)?(?:([0-9]{3})|\(([0-9]{3})\))[ .-]?([0-9]{3})[ .-]?([0-9]{4})$/
const validNonNumerals = /\+|\.|-| |\(|\)/g

module.exports = exports = function standardize (str) {
  const extensionMatches = str.match(extension)
  if (extensionMatches) {
    throw new Error(errors[4].en)
  }
  const badDigitsMatches = str.match(badDigits)
  if (badDigitsMatches) {
    throw new Error(errors[2].en)
  }
  const onlyValid = str.replace(validNonNumerals, '')
  const expectedNbChars = (onlyValid[0] === '1' ? 11 : 10)
  if (onlyValid.length < expectedNbChars) {
    throw new Error(errors[3].en)
  }
  if (onlyValid.length > expectedNbChars) {
    throw new Error(errors[5].en)
  }

  const idealMatches = str.match(ideal)
  if (idealMatches) {
    const region = '+1'
    const area = idealMatches[1] || idealMatches[2]
    const prefix = idealMatches[3]
    const line = idealMatches[4]
    return `${region} (${area}) ${prefix}-${line}`
  }
  throw new Error(errors[1].en)
}
