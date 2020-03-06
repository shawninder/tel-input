const separators = require('./separators')
const errors = require('./errors')

const templates = {
  '11 digits': {
    input: '33_987_654_321',
    errCode: 5
  },
  '+11 digits': {
    input: '+33_987_654_321',
    errCode: 5
  },
  'letters': {
    input: '514_987_NEWS',
    errCode: 2
  },
  '7 digits': {
    input: '987_6543',
    errCode: 3
  },
  '8 digits': {
    input: '1_987_6543',
    errCode: 3
  },
  '9 digits': {
    input: '1_2_987_6543',
    errCode: 3
  },
  'wrong region': {
    input: '2_514_987-6543',
    errCode: 5
  },
  '+wrong region': {
    input: '+2_514_987-6543',
    errCode: 5
  },
  'extension': {
    input: '514_987_6543#1234',
    errCode: 4
  },
  'region+extension': {
    input: '1_514_987_6543#1234',
    errCode: 4
  },
  '+region+extension': {
    input: '+1_514_987_6543#1234',
    errCode: 4
  },
  'long': {
    input: '12_345_678_9012',
    errCode: 5
  },
  '+long': {
    input: '+12_345_678_9012',
    errCode: 5
  },
  'parens_mismatch': {
    input: '514)_987_6543',
    errCode: 1
  },
  'parens_mismatch_2': {
    input: '1_(514_987_6543',
    errCode: 1
  }
}

const rejected = Object.keys(templates).reduce((ret, key) => {
  const template = templates[key]
  Object.keys(separators).forEach((name) => {
    ret[`${key}_${name}`] = {
      input: template.input.replace(/_/g, separators[name]),
      errMsg: errors[template.errCode].en
    }
  })
  return ret
}, {})

module.exports = exports = rejected
