import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import TransactionRow from '../TransactionRow'

afterEach(cleanup)

const setup = (propOverrides, { item } = {}) => {
  const props = {
    item: {
      title: 'Level Up Tuts',
      amount: 20,
      category: 'Web Development',
      date: '2018-08-14T00:00:00.000Z',
      type: 'income',
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
  test('inputs should start as readOnly', () => {
    const { getByLabelText } = setup()
    const title = getByLabelText('table-title')
    expect(title.readOnly).toBeTruthy()
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
  test('inputs should not be read only after Edit Transactions is clicked', () => {
    const { getByLabelText } = setup({ readOnly: false })
    const title = getByLabelText('table-title')
    expect(title.readOnly).toBeFalsy()
  })
})

describe('lifecycle', () => {})
