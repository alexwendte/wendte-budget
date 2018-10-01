import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import TransactionRow from '../TransactionRow'

afterEach(cleanup)

const setup = ({ item } = {}) => {
  const props = {
    item: {
      title: 'Level Up Tuts',
      amount: 20,
      category: 'Web Development',
      date: '2018-08-14T00:00:00.000Z',
      type: 'income',
      ...item,
    },
  }

  const utils = render(<TransactionRow {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('rendering', () => {
  it('contains the item attributes', () => {
    const { getByText, props } = setup()
    const { title, amount, category, date, person } = props.item
    const formattedAmount = `$${amount}.00`
    const formattedDate = new Date(date).toDateString()
    expect(getByText(title)).toBeTruthy()
    expect(getByText(formattedAmount)).toBeTruthy()
    expect(getByText(category)).toBeTruthy()
    expect(getByText(formattedDate)).toBeTruthy()
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
    const { getByText, props } = setup({ item: { type: 'income' } })
    const { amount } = props.item
    const formattedAmount = `$${amount}.00`
    const amountEl = getByText(formattedAmount)
    expect(amountEl.classList).toContain('income')
  })
  it('should render amount with a .income class if it is an income', () => {
    const { getByText, props } = setup({ item: { type: 'expense' } })
    const { amount } = props.item
    const formattedAmount = `-$${amount}.00`
    const amountEl = getByText(formattedAmount)
    expect(amountEl.classList).toContain('expense')
  })
  it('should not render unnecessary data', () => {
    const { queryByText } = setup({ item: { type: 'expense' } })
    expect(queryByText('expense')).not.toBeTruthy()
  })
})

describe('interaction', () => {
  it('should show notes if item is clicked anywhere', () => {
    const notes = 'Truly a good purchase'
    const { getByText, getByTestId } = setup({ item: { notes } })
    const item = getByTestId('budget-item')
    fireEvent.click(item)
    expect(getByText(describe)).toBeTruthy()
  })
})

describe('lifecycle', () => {})
