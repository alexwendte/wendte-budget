import React from 'react'
import { render, cleanup } from 'react-testing-library'
import BudgetTool from '../BudgetTool'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      onSubmit: jest.fn(),
    },
    propOverrides
  )

  const utils = render(<BudgetTool {...props} />)

  // wconst submitButton = utils.getByText('Submit')
  return {
    props,
    //   submitButton,
    ...utils,
  }
}

describe('render', () => {
  it('should render', () => {
    setup()
  })
  it('should show how much is left to spend/save/invest in each of users saved budget lines for the month', () => {})
  it('should show the amount the user has spent in each category', () => {})
})

describe('lifecycle', () => {
  it('should have called api to get user categories', () => {})
  it('should have called api to get user transactions', () => {})
})
