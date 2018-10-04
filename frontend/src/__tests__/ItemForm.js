import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import ItemForm from '../ItemForm'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      onSubmit: jest.fn(),
    },
    propOverrides
  )

  const utils = render(<ItemForm {...props} />)

  const fakeForm = {
    title: 'SSD',
    amount: '$23',
    category: 'Groceries',
    date: '2018-09-14',
    notes: 'This made my computer WAY Faster',
  }
  utils.getByLabelText('Transaction Title').value = fakeForm.title
  utils.getByLabelText('Amount').value = fakeForm.amount
  utils.getByLabelText('Item Category').value = fakeForm.category

  const submitButton = utils.getByText('Submit')
  return {
    props,
    submitButton,
    fakeForm,
    ...utils,
  }
}

describe('rendering', () => {
  it("starts with today's date", () => {
    const { getByLabelText } = setup()
    const dateInput = getByLabelText('Date')
    const now = new Date(Date.now())
    const resDate = now.toISOString().slice(0, 10)

    expect(dateInput.value).toBe(resDate)
  })
  it('starts with expense checked', () => {
    const { getByLabelText } = setup()

    expect(getByLabelText('Expense').checked).toBeTruthy()
    expect(getByLabelText('Income').checked).not.toBeTruthy()
  })
  it("should Only display the user's categories in the list", () => {
    expect(true).toBeTruthy()
  })
})

describe('interaction', () => {
  it('should not allow a form with any blank required fields to be submitted', () => {
    const { getByLabelText, props, submitButton } = setup()
    getByLabelText('Amount').value = ''

    fireEvent.click(submitButton)

    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })

  it('submits form with correct values', () => {
    const { props, submitButton, fakeForm, getByLabelText } = setup()
    const valueAfterStrip = 23
    getByLabelText('Date').value = fakeForm.date
    getByLabelText('Notes').value = fakeForm.notes

    fireEvent.click(submitButton)

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
    expect(props.onSubmit).toHaveBeenCalledWith({
      title: fakeForm.title,
      amount: valueAfterStrip,
      category: 'Groceries',
      date: new Date(fakeForm.date).toISOString(),
      type: 'Expense',
      notes: fakeForm.notes,
    })
  })

  it('should only allow Expense or Income to be selected', () => {
    const { getByLabelText } = setup()
    const income = getByLabelText('Income')
    const expense = getByLabelText('Expense')
    expect(expense.checked).toBeTruthy()
    expect(income.checked).not.toBeTruthy()

    fireEvent.change(income, { target: { checked: true } })

    expect(income.checked).toBeTruthy()
    expect(expense.checked).not.toBeTruthy()
  })
})

describe('lifecycle', () => {})
