import React from 'react'
import { render, cleanup, fireEvent, wait, waitForElement } from 'react-testing-library'
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

const setup = async propOverrides => {
  const props = Object.assign({}, propOverrides)
  apiMock.categories.get.mockImplementationOnce(() => Promise.resolve({ categories: ['Groceries'] }))
  const utils = render(<ItemForm {...props} />)
  await waitForElement(() => utils.getByTestId('loading'))

  const fakeForm = {
    title: 'SSD',
    amount: '$23',
    date: '2018-09-14',
    notes: 'This made my computer WAY Faster',
  }
  await waitForElement(() => utils.getByLabelText('Transaction Title'))
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
  it("starts with today's date", async () => {
    const { getByLabelText } = await setup()
    const dateInput = getByLabelText('Date')
    const now = new Date(Date.now())
    const resDate = now.toISOString().slice(0, 10)

    expect(dateInput.value).toBe(resDate)
  })
  it('starts with expense checked', async () => {
    const { getByLabelText } = await setup()

    expect(getByLabelText('Expense').checked).toBeTruthy()
    expect(getByLabelText('Income').checked).not.toBeTruthy()
  })
  describe('categories', () => {
    it("should only display the user's categories in the list", async () => {
      const fakeCategories = ['Groceries', 'Web Development']
      apiMock.categories.get.mockImplementationOnce(() => Promise.resolve({ categories: fakeCategories }))
      const { getByLabelText } = await setup()
      const categoryInput = getByLabelText('Item Category')
      await wait(() => expect(categoryInput.options[0].value).toBe(fakeCategories[0]))
      expect(categoryInput.options[1].value).toBe(fakeCategories[1])
    })
    it.skip('should display create a category', () => {})
  })
})

describe('interaction', () => {
  it('should not allow a form with any blank required fields to be submitted', async () => {
    const { getByLabelText, submitButton } = await setup()
    getByLabelText('Amount').value = ''
    fireEvent.click(submitButton)
    expect(apiMock.transactions.create).toHaveBeenCalledTimes(0)
  })

  it('submits form with correct values', async () => {
    const { submitButton, fakeForm, getByLabelText } = await setup()
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
      category: 'Groceries',
      date: new Date(fakeForm.date).toISOString(),
      type: 'Expense',
      notes: fakeForm.notes,
    })
  })

  it.skip('should render create a category when that option is selected', () => {})

  it('should only allow Expense or Income to be selected', async () => {
    const { getByLabelText } = await setup()
    const income = getByLabelText('Income')
    const expense = getByLabelText('Expense')
    expect(expense.checked).toBeTruthy()
    expect(income.checked).not.toBeTruthy()

    fireEvent.change(income, { target: { checked: true } })

    expect(income.checked).toBeTruthy()
    expect(expense.checked).not.toBeTruthy()
  })
  it.only('should display success to the user if created successfully', async () => {
    const { getByText, queryByTestId, submitButton } = await setup()
    apiMock.transactions.create.mockImplementationOnce(() => Promise.resolve({ transactions: null }))

    fireEvent.click(submitButton)

    await waitForElement(() => getByText(/transaction created successfully/i))
    expect(queryByTestId('create-error')).toBeNull()
  })
  it.only('should display error to the user if created successfully', async () => {
    const { getByText, queryByText, submitButton } = await setup()
    apiMock.transactions.create.mockImplementationOnce(() => Promise.reject(new Error('Error')))

    fireEvent.click(submitButton)

    await waitForElement(() => getByText(/error/i))
    expect(queryByText(/transaction created successfully/i)).toBeNull()
  })
})

describe('lifecycle', () => {
  it('should get user categories on mount', async () => {
    await setup()
    expect(apiMock.categories.get).toHaveBeenCalledTimes(1)
  })
})
