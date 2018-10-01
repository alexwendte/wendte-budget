import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import AmountInput from '../AmountInput'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<AmountInput {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('render', () => {
  it('should not be invalid at the start', () => {
    const { getByLabelText } = setup()
    const amountInput = getByLabelText('amount')
    expect(amountInput.value).toEqual('')
    expect(amountInput.classList).not.toContain('invalid')
  })
})

describe('interaction', () => {
  it('does not allow user to enter letters', () => {
    const { getByLabelText } = setup()
    const amountInput = getByLabelText('amount')
    expect(amountInput.value).toEqual('')
    fireEvent.change(amountInput, { target: { value: 'f' } })
    expect(amountInput.value).toBe('')
  })
  it('keeps a $ in front of user input', async() => {
    const { getByLabelText } = setup()
    const amountInput = getByLabelText('amount')
    fireEvent.change(amountInput, { target: { value: '1' } })
    expect(amountInput.value).toBe('$1')
  })
  it('should have a class of invalid if wrong input is entered', () => {
    const { getByLabelText } = setup()
    const amountInput = getByLabelText('amount')
    expect(amountInput.value).toEqual('')
    fireEvent.change(amountInput, { target: { value: 'f' } })
    expect(amountInput.classList).toContain('invalid')
  })
  it('should delete the dollar sign on blur if there is nothing else in the input', () => {
    const { getByLabelText } = setup()
    const amountInput = getByLabelText('amount')
    fireEvent.change(amountInput, { target: { value: '$' } })
    fireEvent.blur(amountInput)
    expect(amountInput.value).toBe('')
  })
  it('should lose the invalid class on blur and the content is valid', () => {
    const { getByLabelText } = setup()
    const amountInput = getByLabelText('amount')
    amountInput.value = '$3.00'
    fireEvent.change(amountInput, { target: { value: 'f' } })
    expect(amountInput.classList).toContain('invalid')
    fireEvent.blur(amountInput)
    expect(amountInput.classList).not.toContain('invalid')
  })
})
