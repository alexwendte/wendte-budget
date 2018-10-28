import AmountInput from 'components/AmountInput'
import * as React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'

afterEach(cleanup)

interface IProps {
  inTable: boolean
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)
  const utils = render(<AmountInput {...props} />)

  const amountInput = utils.getByLabelText('amount') as HTMLInputElement

  return {
    amountInput,
    props,
    ...utils,
    input,
  }
}

describe('render', () => {
  it('should not be invalid at the start', () => {
    const { amountInput } = setup()
    expect(amountInput.value).toEqual('')
    expect(amountInput.classList).not.toContain('invalid')
  })
})

describe('interaction', () => {
  it('should allow valid input', () => {
    const { amountInput } = setup()
    fireEvent.change(amountInput, { target: { value: '1' } })
    expect(amountInput.value).toEqual('$1')
    fireEvent.change(amountInput, { target: { value: '$1.' } })
    expect(amountInput.value).toBe('$1.')
    fireEvent.change(amountInput, { target: { value: '$1.0' } })
    expect(amountInput.value).toBe('$1.0')
    fireEvent.change(amountInput, { target: { value: '$0.5' } })
    expect(amountInput.value).toBe('$0.5')
    fireEvent.change(amountInput, { target: { value: '$0.' } })
    expect(amountInput.value).toBe('$0.')
  })
  it('should allow valid input when inTable', () => {
    const { amountInput } = setup({ inTable: true })
    fireEvent.change(amountInput, { target: { value: '-$3.00' } })
    expect(amountInput.value).toBe('-$3.00')
    fireEvent.change(amountInput, { target: { value: '-' } })
    expect(amountInput.value).toBe('-')
  })
  it('should not allow invalid input when inTable', () => {
    const { amountInput } = setup({ inTable: true })
    expect(amountInput.value).toBe('')
    fireEvent.change(amountInput, { target: { value: '-$3.00-' } })
    expect(amountInput.value).toBe('')
  })
  it('does not allow user to enter invalid input', () => {
    const { amountInput } = setup()
    expect(amountInput.value).toEqual('')
    fireEvent.change(amountInput, { target: { value: 'f' } })
    expect(amountInput.value).toBe('')
    fireEvent.change(amountInput, { target: { value: '3.00.0' } })
    expect(amountInput.value).toBe('')
    fireEvent.change(amountInput, { target: { value: '-3.00' } })
    expect(amountInput.value).toBe('')
    fireEvent.change(amountInput, { target: { value: '-3.00' } })
    expect(amountInput.value).toBe('')
    fireEvent.change(amountInput, { target: { value: '$3.00$' } })
    expect(amountInput.value).toBe('')
  })
  it('keeps a $ in front of user input', async () => {
    const { amountInput } = setup()
    fireEvent.change(amountInput, { target: { value: '1' } })
    expect(amountInput.value).toBe('$1')
  })
  it('should have a class of invalid if wrong input is entered', () => {
    const { amountInput } = setup()
    fireEvent.change(amountInput, { target: { value: 'f' } })
    expect(amountInput.classList).toContain('invalid')
  })
  it('should delete the dollar sign on blur if there is nothing else in the input', () => {
    const { amountInput } = setup()
    fireEvent.change(amountInput, { target: { value: '$' } })
    fireEvent.blur(amountInput)
    expect(amountInput.value).toBe('')
  })
  it('should lose the invalid class on blur and the content is valid', () => {
    const { amountInput } = setup()
    fireEvent.change(amountInput, { target: { value: 'f' } })
    expect(amountInput.classList).toContain('invalid')
    fireEvent.blur(amountInput)
    expect(amountInput.classList).not.toContain('invalid')
  })
  it('should format the number to have 2 decimal places on blur', () => {
    const { amountInput } = setup()
    fireEvent.change(amountInput, { target: { value: '$3.000000' } })
    fireEvent.blur(amountInput)
    expect(amountInput.value).toBe('$3.00')
    fireEvent.change(amountInput, { target: { value: '$3' } })
    fireEvent.blur(amountInput)
    expect(amountInput.value).toBe('$3.00')
  })
})
