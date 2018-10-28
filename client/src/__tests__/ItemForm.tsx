import * as React from 'react'
import { cleanup, fireEvent, render, wait, waitForElement } from 'react-testing-library'
import { IUser } from 'utils/types'
import ItemForm from '../ItemForm'
jest.mock('utils/api')
import restApi from 'utils/api'

beforeEach(() => (restApi as any).reset())
afterEach(cleanup)

interface IProps {
  user?: IUser
}

const setup = async (propOverrides?: IProps) => {
  const props = Object.assign(
    {
      user: { token: '' },
    },
    propOverrides
  )

  const categoryMock = restApi.categories.get as any
  categoryMock.mockImplementationOnce(() => Promise.resolve({ categories: ['Groceries'] }))
  const utils = render(<ItemForm {...props} />)
  await waitForElement(() => utils.getByTestId('loading'))

  const fakeForm = {
    amount: '$23',
    date: '2018-09-14',
    notes: 'This made my computer WAY Faster',
    title: 'SSD',
  }
  await waitForElement(() => utils.getByLabelText('Transaction Title'))
  const titleInput = utils.getByLabelText('Transaction Title') as HTMLInputElement
  const amountInput = utils.getByLabelText('Amount') as HTMLInputElement
  titleInput.value = fakeForm.title
  amountInput.value = fakeForm.amount

  const submitButton = utils.getByText('Submit')
  return {
    fakeForm,
    props,
    submitButton,
    ...utils,
  }
}

describe('rendering', () => {
  it("starts with today's date", async () => {
    const { getByLabelText } = await setup()
    const dateInput = getByLabelText('Date') as HTMLInputElement
    const now = new Date(Date.now())
    const resDate = now.toISOString().slice(0, 10)

    expect(dateInput.value).toBe(resDate)
  })
  it('starts with expense checked', async () => {
    const { getByLabelText } = await setup()
    const expenseInput = getByLabelText('Expense') as HTMLInputElement
    const incomeInput = getByLabelText('Income') as HTMLInputElement

    expect(expenseInput.checked).toBeTruthy()
    expect(incomeInput.checked).not.toBeTruthy()
  })
  describe('categories', () => {
    it("should only display the user's categories in the list", async () => {
      const fakeCategories = ['Groceries', 'Web Development']
      const getMock = restApi.categories.get as any
      getMock.mockImplementationOnce(() => Promise.resolve({ categories: fakeCategories }))
      const { getByLabelText } = await setup()
      const categoryInput = getByLabelText('Item Category') as HTMLSelectElement
      await wait(() => expect(categoryInput.options[0].value).toBe(fakeCategories[0]))
      expect(categoryInput.options[1].value).toBe(fakeCategories[1])
    })
    // it.skip('should display create a category', () => {})
  })
})

describe('interaction', () => {
  it('should not allow a form with any blank required fields to be submitted', async () => {
    const { getByLabelText, submitButton } = await setup()
    const amountInput = getByLabelText('Amount') as HTMLInputElement
    amountInput.value = ''

    fireEvent.click(submitButton)
    expect(restApi.transactions.create).toHaveBeenCalledTimes(0)
    // expect(apiMock.transactions.create).toHaveBeenCalledTimes(0)
  })

  it('submits form with correct values', async () => {
    const { submitButton, fakeForm, getByLabelText } = await setup()
    const valueAfterStrip = 23
    const dateInput = getByLabelText('Date') as HTMLInputElement
    const notesInput = getByLabelText('Notes') as HTMLInputElement
    dateInput.value = fakeForm.date
    notesInput.value = fakeForm.notes
    const option = document.createElement('option') as HTMLOptionElement
    option.value = 'Entertainment'
    const sel = getByLabelText('Item Category') as HTMLSelectElement
    sel.add(option)
    option.selected = true

    fireEvent.click(submitButton)

    expect(restApi.transactions.create).toHaveBeenCalledTimes(1)
    expect(restApi.transactions.create).toHaveBeenCalledWith({
      amount: valueAfterStrip,
      category: 'Entertainment',
      date: new Date(fakeForm.date).toISOString(),
      notes: fakeForm.notes,
      title: fakeForm.title,
      type: 'Expense',
    })
  })

  // it.skip('should render create a category when that option is selected', () => {})

  it('should only allow Expense or Income to be selected', async () => {
    const { getByLabelText } = await setup()
    const income = getByLabelText('Income') as HTMLInputElement
    const expense = getByLabelText('Expense') as HTMLInputElement
    expect(expense.checked).toBeTruthy()
    expect(income.checked).not.toBeTruthy()

    fireEvent.change(income, { target: { checked: true } })

    expect(income.checked).toBeTruthy()
    expect(expense.checked).not.toBeTruthy()
  })
})

it('should display success to the user if created successfully', async () => {
  const { getByText, queryByTestId, submitButton } = await setup()
  const transactionApiMock = restApi.transactions.create as any
  transactionApiMock.mockImplementationOnce(() => Promise.resolve({ transaction: null }))

  fireEvent.click(submitButton)

  await waitForElement(() => getByText(/transaction created successfully/i))
  expect(queryByTestId('create-error')).toBeNull()
})
it('should display error to the user if it could not be created', async () => {
  const { getByText, queryByText, submitButton } = await setup()
  const transactionApiMock = restApi.transactions.create as any
  transactionApiMock.mockImplementationOnce(() => Promise.reject({ response: { data: { message: 'Error!' } } }))

  fireEvent.click(submitButton)

  await waitForElement(() => getByText(/error/i))
  expect(queryByText(/transaction created successfully/i)).toBeNull()
})

describe('lifecycle', () => {
  it('should get user categories on mount', async () => {
    await setup()
    expect(restApi.categories.get as any).toHaveBeenCalledTimes(1)
  })
})
