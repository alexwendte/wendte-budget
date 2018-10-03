import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Input from 'components/Input'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Input aria-label="test-input" {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('render', () => {
  it('should render with the value given', () => {
    const value = 'Its a good day!'
    const { getByLabelText } = setup({ value })
    const input = getByLabelText('test-input')
    expect(input.value).toBe(value)
  })
})

describe('interaction', () => {
  it('should allow valid input', () => {
    const { getByLabelText } = setup()
    const input = getByLabelText('test-input')
    fireEvent.change(input, { target: { value: '1' } })
    expect(input.value).toEqual('1')
    fireEvent.change(input, { target: { value: 'This is a big test' } })
    expect(input.value).toBe('This is a big test')
  })
})
