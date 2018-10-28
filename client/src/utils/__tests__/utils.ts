import { isNotNumber, isNumber } from '../utils'

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber('1')).toBeTruthy()
    expect(isNumber('-1')).toBeTruthy()
    expect(isNumber('1.00')).toBeTruthy()
    expect(isNumber('-1.00')).toBeTruthy()
    expect(isNumber('')).toBeTruthy()
  })
  it('should false for non-numbers', () => {
    expect(isNumber('$1')).toBeFalsy()
    expect(isNumber('$')).toBeFalsy()
    expect(isNumber('$1.00')).toBeFalsy()
    expect(isNumber('-1.0-0')).toBeFalsy()
    expect(isNumber('1..0')).toBeFalsy()
  })
})
describe('isNotNumber', () => {
  it('should return true for numbers', () => {
    expect(isNotNumber('1')).toBeFalsy()
    expect(isNotNumber('-1')).toBeFalsy()
    expect(isNotNumber('1.00')).toBeFalsy()
    expect(isNotNumber('-1.00')).toBeFalsy()
    expect(isNotNumber('')).toBeFalsy()
  })
  it('should false for non-numbers', () => {
    expect(isNotNumber('$1')).toBeTruthy()
    expect(isNotNumber('$')).toBeTruthy()
    expect(isNotNumber('$1.00')).toBeTruthy()
    expect(isNotNumber('-1.0-0')).toBeTruthy()
    expect(isNotNumber('1..0')).toBeTruthy()
  })
})
