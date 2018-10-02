import React from 'react'
import { render, cleanup } from 'react-testing-library'
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

describe('interaction', () => {})

describe('lifecycle', () => {})
