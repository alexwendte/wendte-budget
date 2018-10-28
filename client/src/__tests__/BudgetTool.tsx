import * as React from 'react'
import { cleanup, render } from 'react-testing-library'
import { ITransaction } from 'utils/types'
import BudgetTool from '../BudgetTool'

afterEach(cleanup)

interface IProps {
  transactions: ITransaction[]
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign(
    {
      onSubmit: jest.fn(),
    },
    propOverrides
  )

  const utils = render(<BudgetTool {...props} />)

  return {
    props,
    ...utils,
  }
}

describe('render', () => {
  it('should show how much is left to spend/save/invest in each of users saved budget lines for the month', () => {
    setup()
    expect(1).toBe(1)
  })
  // it('should show the amount the user has spent in each category', () => {})
})

describe('lifecycle', () => {
  /* it('should have called api to get user categories', () => {})
  it('should have called api to get user transactions', () => {}) */
})
