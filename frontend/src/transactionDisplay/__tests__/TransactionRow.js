import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import * as apiMock from 'utils/api'
import faker from 'faker'
import TransactionRow from '../TransactionRow'

jest.mock('utils/api', () => {
  const mock = {}
  const categoryResponse = [{ category: null }]
  function reset() {
    Object.assign(mock, {
      categories: Object.assign(mock.categories || {}, {
        delete: jest.fn(() => Promise.resolve(categoryResponse)),
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

afterEach(cleanup)

const setup = (propOverrides, { item } = {}) => {
  const fakeItem = {
    _id: faker.random.uuid(),
    title: faker.commerce.productName(),
    amount: parseInt(faker.commerce.price(), 10),
    category: faker.commerce.productAdjective(),
    date: faker.date.recent(),
    // date: '2018-08-14T00:00:00.000Z',
    type: 'income',
  }
  const props = {
    item: {
      ...fakeItem,
      ...item,
    },
    ...propOverrides,
  }

  const utils = render(<TransactionRow {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('rendering', () => {
  it('contains the item attributes', () => {
    const { getByLabelText, props } = setup()
    const { title, amount, category, date } = props.item
    const formattedAmount = `$${amount}.00`
    const formattedDate = new Date(date).toDateString()
    expect(getByLabelText('table-title').value).toBe(title)
    expect(getByLabelText('table-date').value).toBe(formattedDate)
    expect(getByLabelText('table-category').value).toBe(category)
    expect(getByLabelText('table-amount').value).toBe(formattedAmount)
  })

  it('should not render the notes initially', () => {
    const notes = 'Truly a good purchase'
    const { queryByText } = setup({ item: { notes } })
    expect(queryByText(notes)).toBeNull()
  })

  it('should render an expand button if there are notes', () => {
    const { getByTestId } = setup({ item: { notes: 'hi' } })
    expect(getByTestId('expand-button')).toBeTruthy()
  })
  it('should render amount with a .income class if it is an income', () => {
    const { getByLabelText } = setup({ item: { type: 'income' } })
    const amountEl = getByLabelText('table-amount')
    expect(amountEl.classList).toContain('income')
  })
  it('should render amount with a .income class if it is an income', () => {
    const { getByLabelText } = setup({ item: { type: 'expense' } })
    const amountEl = getByLabelText('table-amount')
    expect(amountEl.classList).toContain('expense')
  })
  it('should not render unnecessary data', () => {
    const { queryByText } = setup({ item: { type: 'expense' } })
    expect(queryByText('expense')).not.toBeTruthy()
  })
  it('should initially have readOnly inputs', () => {
    const { getByLabelText } = setup()
    const title = getByLabelText('table-title')
    expect(title.readOnly).toBeTruthy()
  })
  it('should not render the delete button initially', () => {
    const { queryByLabelText } = setup()
    expect(queryByLabelText(/delete/i)).toBeNull()
  })
  it('should render the delete button if readOnly is false', () => {
    const { getByLabelText } = setup({ readOnly: false })
    expect(getByLabelText(/delete/i)).toBeTruthy()
  })
})

describe('interaction', () => {
  it('should show notes if item is clicked anywhere', () => {
    const notes = 'Truly a good purchase'
    const { getByLabelText, getByTestId } = setup({ item: { notes } })
    const item = getByTestId('budget-item')
    fireEvent.click(item)
    expect(getByLabelText('table-notes')).toBeTruthy()
  })
  it('should not have readOnly inputs after Edit Transactions is clicked', () => {
    const { getByLabelText } = setup({ readOnly: false })
    const title = getByLabelText('table-title')
    expect(title.readOnly).toBeFalsy()
  })
  it('should call the delete transaciton api when delete button is clicked', () => {
    const { getByLabelText, props } = setup({ readOnly: false })
    const deleteButton = getByLabelText(/delete/i)
    const { _id: fakeId } = props.item
    fireEvent.click(deleteButton)
    expect(apiMock.categories.delete).toHaveBeenCalledTimes(1)
    expect(apiMock.categories.delete).toHaveBeenCalledWith(fakeId)
  })
})

describe('lifecycle', () => {})
