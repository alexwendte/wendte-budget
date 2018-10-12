import React from 'react'
import { render, cleanup } from 'react-testing-library'
import App from '../App'

afterEach(cleanup)

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides)
  const utils = render(<App />)
  return {
    props,
    ...utils,
  }
}
// Need to figure out how I want to mock the api here...

describe('rendering', () => {
  it.skip('Renders <App/>', () => {
    setup()
  })
  it.skip('contains correct children', () => {
    const { getByTestId } = setup()
    expect(getByTestId('app')).toBeTruthy()
  })
})

describe('interaction', () => {})

describe('lifecycle', () => {})
