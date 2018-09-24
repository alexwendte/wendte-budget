import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import ItemForm from '../ItemForm'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      handleSubmit: jest.fn(),
    },
    propOverrides
  )
  const utils = render(<ItemForm {...props} />)

  const submitButton = utils.getByText('Submit')
  return {
    props,
    submitButton,
    ...utils,
  }
}

describe('rendering', () => {
  it('renders title', () => {
    const { getByText } = setup()
    expect(getByText('Enter your purchase')).toBeTruthy()
  })

  describe('date input', () => {
    it("starts with today's date", () => {
      const { getByLabelText } = setup()
      const dateInput = getByLabelText('Date of Purchase')
      const now = new Date(Date.now())
      const resDate = now.toISOString().slice(0, 10)
      expect(dateInput.value).toBe(resDate)
    })
  })
})

describe('interaction', () => {
  // Also, how do I want to display bank account info?

  it.skip('should not allow a form with any blank required fields to be submitted', () => {
    const { getByLabelText, props, getByTestId, submitButton } = setup()
    const values = ['SSD', null, '2018-09-14', 'Alex'];
[
      getByLabelText('Item Name').value,
      getByLabelText('Item Cost').value,
      getByLabelText('Date of Purchase').value,
      getByLabelText('Purchaser').value,
    ] = values
    const numberDate = 1536883200000
    getByLabelText('date').valueAsNumber = numberDate

    fireEvent.click(submitButton)
    expect(props.handleSubmit).toHaveBeenCalledTimes(0)
    // See if I can make sure it is failing with the type "Insufficient information"
    expect(getByTestId('submitFailed')).toBeDefined()
  })
  it('submits form with correct values', () => {
    const { getByLabelText, props, submitButton } = setup()
    const values = ['SSD', '$23', '2018-09-14', 'Alex'];
[
      getByLabelText('Item Name').value,
      getByLabelText('Item Cost').value,
      getByLabelText('Date of Purchase').value,
      getByLabelText('Purchaser').value,
    ] = values
    const numberDate = 1536883200000
    const valueAfterStrip = 23
    getByLabelText('Date of Purchase').valueAsNumber = numberDate
    expect(getByLabelText('Expense').checked).toBeTruthy()
    expect(getByLabelText('Income').checked).not.toBeTruthy()

    fireEvent.click(submitButton)
    expect(props.handleSubmit).toHaveBeenCalledTimes(1)
    expect(props.handleSubmit).toHaveBeenCalledWith({
      itemName: values[0],
      cost: valueAfterStrip,
      date: new Date(numberDate).toISOString(),
      person: values[3],
    })
  })
})

describe('lifecycle', () => {})
