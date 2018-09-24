import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import TransactionDisplay from '../TransactionDisplay'
import * as fakeData from '../fakeData'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      handleSubmit: jest.fn(),
    },
    propOverrides
  )

  const utils = render(<TransactionDisplay />)

  return {
    props,
    fakeData,
    ...utils,
  }
}
describe('render', () => {
  it('should display the top 10 most recent transactions', () => {
    const { getByText, getByTestId } = setup()
    const trans = fakeData.transactions

    expect(getByTestId('transactions').children.length).toBe(10)

    expect(getByText(trans[0].itemName)).not.toBeNull()
    expect(getByText(trans[0].cost.toString(10))).not.toBeNull()
    expect(getByText(new Date(trans[0].date).toISOString())).not.toBeNull()
    expect(getByText(trans[0].person)).not.toBeNull()
  })
})

describe('lifecycle', () => {
  it('should get recent data from the db')
})
