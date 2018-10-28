const mock = { categories: undefined, transactions: undefined, reset: undefined, auth: undefined }
const authResponse = { user: { _id: 1 } }
function reset() {
  Object.assign(mock, {
    auth: Object.assign(mock.auth || {}, {
      login: jest.fn(() => Promise.resolve(authResponse)),
      logout: jest.fn(() => Promise.resolve(authResponse)),
      me: jest.fn(() => Promise.resolve(authResponse)),
      register: jest.fn(() => Promise.resolve(authResponse)),
    }),
    categories: Object.assign(mock.categories || {}, {
      get: jest.fn(() => Promise.resolve({ categories: ['hi'] })),
    }),
    reset,
    transactions: Object.assign(mock.transactions || {}, {
      create: jest.fn(() => Promise.resolve({ transaction: { _id: 1 } })),
      delete: jest.fn((id: string) => Promise.resolve({ transaction: { _id: 1 } })),
      get: jest.fn((id?: string) => Promise.resolve({ transactions: [{ _id: 1 }] })),
    }),
  })
}
reset()

module.exports = {
  default: mock,
}
