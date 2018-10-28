import * as React from 'react'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
import { transactions as fakeTransactions } from 'utils/fakeData'
import { ITransaction } from 'utils/types'
jest.mock('utils/api')
import restApi from 'utils/api'
import TransactionDisplay from '../TransactionDisplay'

beforeEach(() => (restApi as any).reset())
afterEach(cleanup)

interface IProps {
  items: ITransaction[]
}

const setup = async (propOverrides?: IProps) => {
  const props = Object.assign(
    {
      items: fakeTransactions,
    },
    propOverrides
  )

  const transactionsApiMock = restApi.transactions.get as any
  transactionsApiMock.mockImplementationOnce(() => Promise.resolve({ transactions: fakeTransactions }))
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

    const firstInput = getByLabelText('table-title') as HTMLInputElement
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeFalsy()
    fireEvent.click(getByText('Edit Transactions'))
    expect(firstInput.readOnly).toBeTruthy()
  })
})

describe('lifecycle', async () => {
  it('should call transaction api on componentDidMount', async () => {
    await setup()
    expect(restApi.transactions.get as any).toHaveBeenCalledTimes(1)
  })
})
