import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import TextArea from 'components/TextArea'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<TextArea aria-label="test-textArea" {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('render', () => {
  it('should render with the value given', () => {
    const value = 'Its a good day!'
    const { getByLabelText } = setup({ value })
    const textArea = getByLabelText('test-textArea')
    expect(textArea.value).toBe(value)
  })
})

describe('interaction', () => {
  it('should allow valid textArea', () => {
    const { getByLabelText } = setup()
    const textArea = getByLabelText('test-textArea')
    fireEvent.change(textArea, { target: { value: '1' } })
    expect(textArea.value).toEqual('1')
    fireEvent.change(textArea, { target: { value: 'This is a big test' } })
    expect(textArea.value).toBe('This is a big test')
  })
})
