const transactions = [
  {
    _id: '123j12kj3oj',
    title: 'Dillons',
    amount: 100,
    category: 'Groceries',
    date: '2018-09-01T00:00:00.000Z',
    type: 'expense',
  },
  {
    _id: '123j12kj3ojesfef',
    title: 'Level Up Tuts',
    amount: 20,
    category: 'Web Development',
    date: '2018-08-11T00:00:00.000Z',
    type: 'income',
  },
  {
    _id: '123j23ffsfj3ojesfef',
    title: 'Olive Garden',
    amount: 45,
    category: 'Eating Out',
    date: '2018-03-14T00:00:00.000Z',
    type: 'expense',
  },
  {
    _id: '123j23ffs43534633ojesfef',
    title: 'Peppermint',
    amount: 30,
    category: 'Entertainment',
    date: '2018-09-19T00:00:00.000Z',
    type: 'income',
  },
]

const getTransactions = ({ number } = {}) => (number ? transactions.slice(0, number) : transactions)

export { transactions, getTransactions }
