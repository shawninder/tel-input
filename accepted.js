const separators = require('./separators')

const expected = '+1 (514) 987-6543'
const templates = {
  '10 digits': '514_987_6543',
  '11 digits': '1_514_987_6543',
  '+11 digits': '+1_514_987_6543',
  '10 digits_parens': '(514)_987_6543',
  '11 digits_parens': '1_(514)_987_6543',
  '+11 digits_parens': '+1_(514)_987_6543',
  '10 digits_mixed': '(514) 987_6543',
  '11 digits_mixed': '1 (514) 987_6543',
  '+11 digits_mixed': '+1 (514) 987_6543'
}

const accepted = Object.keys(templates).reduce((ret, key) => {
  const template = templates[key]
  Object.keys(separators).forEach((name) => {
    ret[`${key}_${name}`] = {
      input: template.replace(/_/g, separators[name]),
      expected
    }
  })
  return ret
}, {})

module.exports = exports = accepted
