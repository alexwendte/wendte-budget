import React from 'react'
import { render, cleanup } from 'react-testing-library'
import App from '../App'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign(
    {
      posts: {},
      month: {},
      pics: {},
    },
    propOverrides
  )

  return {
    props,
  }
}

describe('rendering', () => {
  it('Renders <App/>', () => {
    render(<App />)
  })
  it('contains correct children', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app')).toBeTruthy()
    expect(getByTestId('item-form')).toBeTruthy()
    expect(getByTestId('recent-purchases')).toBeTruthy()
    expect(getByTestId('budget-item')).toBeTruthy()
  })
})

describe('interaction', () => {})

describe('lifecycle', () => {})
