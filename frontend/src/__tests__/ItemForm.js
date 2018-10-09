import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import * as apiMock from '../utils/api'
import ItemForm from '../ItemForm'

afterEach(cleanup)

jest.mock('../utils/api', () => {
  // our utility object
  const mock = {}
  function reset() {
    Object.assign(mock, {
      transactions: Object.assign(mock.transactions || {}, {
        create: jest.fn(() => Promise.resolve({ transaction: null })),
      }),
      categories: Object.assign(mock.categories || {}, {
        get: jest.fn(() => Promise.resolve({ categories: null })),
      }),
      reset,
    })
  }
  reset()
  return mock
})

beforeEach(() => {
  apiMock.reset()
})

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<ItemForm {...props} />)

  const fakeForm = {
    title: 'SSD',
    amount: '$23',
    date: '2018-09-14',
    notes: 'This made my computer WAY Faster',
  }
  utils.getByLabelText('Transaction Title').value = fakeForm.title
  utils.getByLabelText('Amount').value = fakeForm.amount

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
  describe('categories', () => {
    it("should only display the user's categories in the list", async () => {
      const fakeCategories = ['Groceries', 'Web Development']
      apiMock.categories.get.mockImplementationOnce(() => Promise.resolve({ categories: fakeCategories }))
      const { getByLabelText } = setup()
      const categoryInput = getByLabelText('Item Category')
      await wait(() => {
        expect(categoryInput.options[0].value).toBe(fakeCategories[0].toLowerCase())
      })
      expect(categoryInput.options[1].value).toBe(fakeCategories[1].toLowerCase())
    })
    it.skip('should display create a category', () => {})
  })
})

describe('interaction', () => {
  it('should not allow a form with any blank required fields to be submitted', () => {
    const { getByLabelText, submitButton } = setup()
    getByLabelText('Amount').value = ''

    fireEvent.click(submitButton)
    expect(apiMock.transactions.create).toHaveBeenCalledTimes(0)
  })

  it('submits form with correct values', () => {
    const { submitButton, fakeForm, getByLabelText } = setup()
    const valueAfterStrip = 23
    getByLabelText('Date').value = fakeForm.date
    getByLabelText('Notes').value = fakeForm.notes
    const option = document.createElement('option')
    option.value = 'Entertainment'
    const sel = getByLabelText('Item Category')
    sel.options.add(option)

    fireEvent.click(submitButton)

    expect(apiMock.transactions.create).toHaveBeenCalledTimes(1)
    expect(apiMock.transactions.create).toHaveBeenCalledWith({
      title: fakeForm.title,
      amount: valueAfterStrip,
      category: 'Entertainment',
      date: new Date(fakeForm.date).toISOString(),
      type: 'Expense',
      notes: fakeForm.notes,
    })
  })

  it.skip('should render create a category when that option is selected', () => {})

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

describe('lifecycle', () => {
  it('should get user categories on mount', () => {
    setup()
    expect(apiMock.categories.get).toHaveBeenCalledTimes(1)
  })
})
