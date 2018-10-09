import React from 'react'
import { render, cleanup, wait } from 'react-testing-library'
import faker from 'faker'
import * as apiMock from 'utils/api'
import User from '../User'

jest.mock('utils/api', () => {
  const mock = {}
  const authResponse = { user: null }
  function reset() {
    Object.assign(mock, {
      auth: Object.assign(mock.auth || {}, {
        me: jest.fn(() => Promise.resolve(authResponse)),
        login: jest.fn(() => Promise.resolve(authResponse)),
        register: jest.fn(() => Promise.resolve(authResponse)),
        logout: jest.fn(() => Promise.resolve(authResponse)),
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

afterEach(cleanup)

async function setup() {
  let controller
  const children = jest.fn(c => {
    controller = c
    return null
  })
  render(<User>{children}</User>)
  children.mockClear()
  await wait(() => expect(children).toHaveBeenCalledTimes(1))
  children.mockClear()
  return { controller, children }
}

describe('interaction', () => {
  it('should rerender with user when login is clicked', async () => {
    const { controller, children } = await setup()
    const fakeUser = { username: faker.internet.userName() }
    apiMock.auth.login.mockImplementationOnce(() => Promise.resolve({ user: fakeUser }))
    const form = { username: faker.internet.userName(), password: faker.internet.password() }

    controller.login(form)

    expect(apiMock.auth.login).toHaveBeenCalledTimes(1)
    expect(apiMock.auth.login).toHaveBeenCalledWith(form)

    await wait(() => expect(children).toHaveBeenCalledTimes(2))

    expect(children).toHaveBeenCalledWith(
      expect.objectContaining({
        pending: true,
        error: null,
        user: null,
      })
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pending: false,
        error: null,
        user: fakeUser,
      })
    )
  })

  it('should rerender with errors when login fails', async () => {
    const { controller, children } = await setup()

    const fakeError = { mock: 'failure' }
    // eslint-disable-next-line
    apiMock.auth.login.mockImplementationOnce(() => Promise.reject({ error: fakeError }))

    controller.login().catch(err => err)

    expect(apiMock.auth.login).toHaveBeenCalledTimes(1)
    await wait(() => expect(children).toHaveBeenCalledTimes(2))
    expect(children).toHaveBeenCalledWith(
      expect.objectContaining({
        pending: true,
        error: null,
        user: null,
      })
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pending: false,
        error: fakeError,
        user: null,
      })
    )
  })

  it('should rerender with null user when logout is clicked', async () => {
    const { controller, children } = await setup()

    controller.logout()

    expect(apiMock.auth.logout).toHaveBeenCalledTimes(1)
    await wait(() => expect(children).toHaveBeenCalledTimes(2))
    expect(children).toHaveBeenCalledWith(
      expect.objectContaining({
        pending: true,
        error: null,
        user: null,
      })
    )
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pending: false,
        error: null,
        user: null,
      })
    )
  })

  it('should return the user if they registered successfully', async () => {
    const { controller } = await setup()
    const fakeUser = { username: faker.internet.userName() }
    apiMock.auth.register.mockImplementationOnce(() => Promise.resolve({ user: fakeUser }))
    const form = { username: faker.internet.userName(), password: faker.internet.password() }

    const registerResult = await controller.register(form)

    expect(apiMock.auth.register).toHaveBeenCalledTimes(1)
    expect(apiMock.auth.register).toHaveBeenCalledWith(form)
    expect(registerResult).toEqual(expect.objectContaining({ user: fakeUser }))
  })
})

it('should rerender with errors when register fails', async () => {
  const { controller, children } = await setup()

  const fakeError = { mock: 'failure' }
  // eslint-disable-next-line
  apiMock.auth.register.mockImplementationOnce(() => Promise.reject({ error: fakeError }))

  controller.register().catch(err => err)

  expect(apiMock.auth.register).toHaveBeenCalledTimes(1)
  await wait(() => expect(children).toHaveBeenCalledTimes(2))
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      pending: true,
      error: null,
      user: null,
    })
  )
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      pending: false,
      error: fakeError,
      user: null,
    })
  )
})

describe('lifecycle', () => {
  it('should get user on mount', async () => {
    await setup()
    expect(apiMock.auth.me).toHaveBeenCalledTimes(1)
  })
})
