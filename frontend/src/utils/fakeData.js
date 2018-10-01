const transactions = [
  {
    title: 'Dillons',
    amount: 100,
    category: 'Groceries',
    date: '2018-09-01T00:00:00.000Z',
    type: 'expense',
  },
  {
    title: 'Level Up Tuts',
    amount: 20,
    category: 'Web Development',
    date: '2018-08-11T00:00:00.000Z',
    type: 'income',
  },
  {
    title: 'Olive Garden',
    amount: 45,
    category: 'Eating Out',
    date: '2018-03-14T00:00:00.000Z',
    type: 'expense',
  },
  {
    title: 'Peppermint',
    amount: 30,
    category: 'Entertainment',
    date: '2018-09-19T00:00:00.000Z',
    type: 'income',
    notes: 'We really wanted to see this movie so we were willing to pay for the ridiculous matinee price',
  },
]

const getTransactions = ({ number } = {}) => (number ? transactions.slice(0, number) : transactions)

export { transactions, getTransactions }
