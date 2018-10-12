import React from 'react'
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library'
import { transactions as fakeTransactions } from 'utils/fakeData'
import * as apiMock from 'utils/api'
import TransactionDisplay from '../TransactionDisplay'

afterEach(cleanup)

jest.mock('utils/api', () => {
  const mock = {}
  const transactionResponse = [{ title: null }]
  function reset() {
    Object.assign(mock, {
      transactions: Object.assign(mock.transactions || {}, {
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

const setup = async propOverrides => {
  const props = Object.assign({}, propOverrides)

  apiMock.transactions.get.mockImplementationOnce(() => Promise.resolve(fakeTransactions))
  const utils = render(<TransactionDisplay {...props} />)

  await waitForElement(() => utils.getByTestId('loading'))
  return {
    props,
    ...utils,
  }
}

describe('rendering', () => {
  it('renders all of the items', async () => {
    await setup()
  })
})

describe('interaction', () => {
  it('should toggle readOnly when Edit Transactions is clicked', async () => {
    const { getByText, getByLabelText } = await setup()

    const firstInput = getByLabelText('table-title')
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeFalsy()
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeTruthy()
  })
})

describe('lifecycle', async () => {
  it('should call transaction api on componentDidMount', async () => {
    setup()
    expect(apiMock.transactions.get).toHaveBeenCalledTimes(1)
  })
})
