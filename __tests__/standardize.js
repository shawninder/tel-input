const standardize = require('../standardize')
const accepted = require('../accepted')
const rejected = require('../rejected')

Object.keys(accepted).forEach((name) => {
  const useCase = accepted[name]
  test(name, () => {
    expect(standardize(useCase.input)).toBe(useCase.expected)
  })
})

Object.keys(rejected).forEach((name) => {
  const useCase = rejected[name]
  test(name, () => {
    expect(() => { standardize(useCase.input) }).toThrowError(new Error(useCase.errMsg))
  })
})
