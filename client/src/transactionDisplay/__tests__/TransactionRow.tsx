import * as React from 'react'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'
jest.mock('utils/api')
import * as faker from 'faker'
import restApi from 'utils/api'
import { ITransaction } from 'utils/types'
import TransactionRow from '../TransactionRow'

afterEach(cleanup)

interface IProps {
  transaction?: Partial<ITransaction>
  readOnly?: boolean
}

const setup = (propOverrides?: IProps) => {
  const fakeTransaction = {
    _id: faker.random.uuid(),
    amount: parseInt(faker.commerce.price(), 10),
    category: faker.commerce.productAdjective(),
    date: faker.date.recent(),
    title: faker.commerce.productName(),
    type: 'income',
  }
  let transaction
  if (propOverrides) {
    transaction = propOverrides.transaction || {}
  }
  const props = {
    ...propOverrides,
    transaction: {
      ...fakeTransaction,
      ...transaction,
    } as ITransaction,
  }

  const utils = render(<TransactionRow {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('rendering', () => {
  it('contains the transaction attributes', () => {
    const { getByLabelText, props } = setup()
    const { title, amount, category, date = '' } = props.transaction
    const formattedAmount = `$${amount}.00`
    const formattedDate = new Date(date).toDateString()
    expect((getByLabelText('table-title') as HTMLInputElement).value).toBe(title)
    expect((getByLabelText('table-date') as HTMLInputElement).value).toBe(formattedDate)
    expect((getByLabelText('table-category') as HTMLInputElement).value).toBe(category)
    expect((getByLabelText('table-amount') as HTMLInputElement).value).toBe(formattedAmount)
  })

  it('should not render the notes initially', () => {
    const notes = 'Truly a good purchase'
    const { queryByText } = setup({ transaction: { notes } })
    expect(queryByText(notes)).toBeNull()
  })

  it('should render an expand button if there are notes', () => {
    const { getByTestId } = setup({ transaction: { notes: 'hi' } })
    expect(getByTestId('expand-button')).toBeTruthy()
  })
  it('should render amount with a .income class if it is an income', () => {
    const { getByLabelText } = setup({ transaction: { type: 'income' } })
    const amountEl = getByLabelText('table-amount')
    expect(amountEl.classList).toContain('income')
  })
  it('should render amount with a .income class if it is an income', () => {
    const { getByLabelText } = setup({ transaction: { type: 'expense' } })
    const amountEl = getByLabelText('table-amount')
    expect(amountEl.classList).toContain('expense')
  })
  it('should not render unnecessary data', () => {
    const { queryByText } = setup({ transaction: { type: 'expense' } })
    expect(queryByText('expense')).not.toBeTruthy()
  })
  it('should initially have readOnly inputs', () => {
    const { getByLabelText } = setup()
    const title = getByLabelText('table-title') as HTMLInputElement
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
  it('should show notes if transaction is clicked anywhere', () => {
    const notes = 'Truly a good purchase'
    const { getByLabelText, getByTestId } = setup({ transaction: { notes } })
    const transaction = getByTestId('budget-transaction')
    fireEvent.click(transaction)
    expect(getByLabelText('table-notes')).toBeTruthy()
  })
  it('should not have readOnly inputs after Edit Transactions is clicked', () => {
    const { getByLabelText } = setup({ readOnly: false })
    const title = getByLabelText('table-title') as HTMLInputElement
    expect(title.readOnly).toBeFalsy()
  })
  it('should call the delete transaction api when delete button is clicked', () => {
    const { getByLabelText, props } = setup({ readOnly: false })
    const deleteButton = getByLabelText(/delete/i)
    const { _id: fakeId } = props.transaction
    fireEvent.click(deleteButton)
    const transactionApiMock = restApi.transactions.delete as any
    expect(transactionApiMock).toHaveBeenCalledTimes(1)
    expect(transactionApiMock).toHaveBeenCalledWith(fakeId)
  })
  it('should delete the transaction from the page when the delete button is pressed', () => {
    const { getByLabelText, queryByLabelText } = setup({ readOnly: false })
    const deleteButton = getByLabelText(/delete/i)
    fireEvent.click(deleteButton)
    waitForElement(() => expect(queryByLabelText('table-amount')).toBeFalsy())
  })
})

// describe('lifecycle', () => {})
