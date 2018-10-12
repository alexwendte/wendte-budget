import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import AmountInput from 'components/AmountInput'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)
  const utils = render(<AmountInput {...props} />)
  const input = utils.getByLabelText('amount')
  return {
    props,
    ...utils,
    input,
  }
}

describe('render', () => {
  it('should not be invalid at the start', () => {
    const { input } = setup()
    expect(input.value).toEqual('')
    expect(input.classList).not.toContain('invalid')
  })
})

describe('interaction', () => {
  it('should allow valid input', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '1' } })
    expect(input.value).toEqual('$1')
    fireEvent.change(input, { target: { value: '$1.' } })
    expect(input.value).toBe('$1.')
    fireEvent.change(input, { target: { value: '$1.0' } })
    expect(input.value).toBe('$1.0')
    fireEvent.change(input, { target: { value: '$0.5' } })
    expect(input.value).toBe('$0.5')
    fireEvent.change(input, { target: { value: '$0.' } })
    expect(input.value).toBe('$0.')
  })
  it('should allow valid input when inTable', () => {
    const { input } = setup({ inTable: true })
    fireEvent.change(input, { target: { value: '-$3.00' } })
    expect(input.value).toBe('-$3.00')
    fireEvent.change(input, { target: { value: '-' } })
    expect(input.value).toBe('-')
  })
  it('should not allow invalid input when inTable', () => {
    const { input } = setup({ inTable: true })
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: '-$3.00-' } })
    expect(input.value).toBe('')
  })
  it('does not allow user to enter invalid input', () => {
    const { input } = setup()
    expect(input.value).toEqual('')
    fireEvent.change(input, { target: { value: 'f' } })
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: '3.00.0' } })
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: '-3.00' } })
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: '-3.00' } })
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: '$3.00$' } })
    expect(input.value).toBe('')
  })
  it('keeps a $ in front of user input', async () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '1' } })
    expect(input.value).toBe('$1')
  })
  it('should have a class of invalid if wrong input is entered', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'f' } })
    expect(input.classList).toContain('invalid')
  })
  it('should delete the dollar sign onBlur if there is nothing else in the input', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '$' } })
    fireEvent.blur(input)
    expect(input.value).toBe('')
  })
  it('should lose the invalid class onBlur and the content is valid', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'f' } })
    expect(input.classList).toContain('invalid')
    fireEvent.blur(input)
    expect(input.classList).not.toContain('invalid')
  })
  it('should format the number to have 2 decimal places onBlur', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '$3.000000' } })
    fireEvent.blur(input)
    expect(input.value).toBe('$3.00')
    fireEvent.change(input, { target: { value: '$3' } })
    fireEvent.blur(input)
    expect(input.value).toBe('$3.00')
  })
})
