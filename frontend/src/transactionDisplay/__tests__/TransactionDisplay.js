import React from 'react'
import { render, cleanup, fireEvent, wait, waitForElement } from 'react-testing-library'
import { transactions as fakeTransactions } from 'utils/fakeData'
import * as apiMock from 'utils/api'
import TransactionDisplay from '../TransactionDisplay'

afterEach(cleanup)

jest.mock('utils/api', () => {
  const mock = {}
  const transactionResponse = { transactions: null }
  function reset() {
    Object.assign(mock, {
      transactions: Object.assign(mock.auth || {}, {
        get: jest.fn(() => Promise.resolve(transactionResponse)),
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
  it('renders all of the items', async () => {
    apiMock.transactions.get.mockImplementationOnce(() => fakeTransactions)
    setup()
  })
})

describe('interaction', () => {
  it('should toggle readOnly when Edit Transactions is clicked', async () => {
    apiMock.transactions.get.mockImplementationOnce(() => fakeTransactions)
    const { getByText, getByLabelText } = setup()
    apiMock.transactions.get.mockImplementationOnce(() => fakeTransactions)

    const firstInput = getByLabelText('table-title')
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeFalsy()
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeTruthy()
  })
})

describe('lifecycle', async () => {
  it.only('should receive the transactions we expect on componentDidMount', async () => {
    apiMock.transactions.get.mockImplementationOnce(() => fakeTransactions)
    expect(apiMock.transactions.get).toHaveBeenCalledTimes(0)
    const { getByTestId } = setup()
    expect(apiMock.transactions.get).toHaveBeenCalledTimes(1)
    // await wait(() => expect(apiMock.transactions.get).toHaveBeenCalledTimes(10))
    expect(await apiMock.transactions.get()).toEqual(fakeTransactions)
    expect(apiMock.transactions.get).toHaveBeenCalledTimes(1)
  })
})
