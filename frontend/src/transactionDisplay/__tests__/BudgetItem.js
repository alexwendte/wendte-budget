import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import BudgetItem from '../BudgetItem'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      item: {
        name: 'Level Up Tuts',
        cost: 20,
        category: 'Web Development',
        date: '2018-08-14T00:00:00.000Z',
        person: 'Alex',
      },
    },
    propOverrides
  )

  const utils = render(<BudgetItem {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('rendering', () => {
  it('contains the item attributes', () => {
    const { getByText, props } = setup()
    const { name, cost, category, date, person } = props.item
    const formattedCost = `$${cost}.00`
    const formattedDate = new Date(date).toDateString()
    expect(getByText(name)).toBeTruthy()
    expect(getByText(formattedCost)).toBeTruthy()
    expect(getByText(category)).toBeTruthy()
    expect(getByText(formattedDate)).toBeTruthy()
    expect(getByText(person)).toBeTruthy()
  })

  it('should not render the extraNotes initially', () => {
    const extraNotes = 'Truly a good purchase'
    const { queryByText } = setup({ item: { extraNotes } })
    expect(queryByText(extraNotes)).toBeNull()
  })

  it('should render an expand button if there are notes', () => {
    const { getByTestId } = setup({ item: { extraNotes: 'hi' } })
    expect(getByTestId('expand-button')).toBeTruthy()
  })
})

describe('interaction', () => {
  it('should show extraNotes if item is clicked anywhere', () => {
    const extraNotes = 'Truly a good purchase'
    const { getByText, getByTestId } = setup({ item: { extraNotes } })
    const item = getByTestId('budget-item')
    fireEvent.click(item)
    expect(getByText(describe)).toBeTruthy()
  })
})

describe('lifecycle', () => {})
