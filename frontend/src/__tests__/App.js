import React from 'react'
import { render, cleanup } from 'react-testing-library'
import App from '../App'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)

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
  })
})

describe('interaction', () => {})

describe('lifecycle', () => {})
