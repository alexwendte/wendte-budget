const transactions = [
  {
    name: 'Dillons',
    cost: 100,
    category: 'Groceries',
    date: '2018-09-01T00:00:00.000Z',
    person: 'Alex',
  },
  {
    name: 'Level Up Tuts',
    cost: 20,
    category: 'Web Development',
    date: '2018-08-11T00:00:00.000Z',
    person: 'Alex',
  },
  {
    name: 'Olive Garden',
    cost: 45,
    category: 'Eating Out',
    date: '2018-03-14T00:00:00.000Z',
    person: 'Alex',
  },
  {
    name: 'Peppermint',
    cost: 30,
    category: 'Entertainment',
    date: '2018-09-19T00:00:00.000Z',
    person: 'Brianna',
    extraNotes: 'We really wanted to see this movie so we were willing to pay for the ridiculous matinee price',
  },
]

const getTransactions = ({ number } = {}) => (number ? transactions.slice(0, number) : transactions)

export { transactions, getTransactions }
