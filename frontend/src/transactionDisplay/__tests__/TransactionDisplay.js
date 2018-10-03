import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { transactions as fakeTransactions } from 'utils/fakeData'
import TransactionDisplay from '../TransactionDisplay'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      items: fakeTransactions,
    },
    propOverrides
  )

  const utils = render(<TransactionDisplay {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('rendering', () => {
  it('renders all of the items', () => {
    setup()
  })
})

describe('interaction', () => {
  it('should toggle readOnly when Edit Transactions is clicked', () => {
    const { getByText, getByLabelText } = setup()
    const firstInput = getByLabelText('table-title')
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeFalsy()
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeTruthy()
  })
})

describe('lifecycle', () => {})
