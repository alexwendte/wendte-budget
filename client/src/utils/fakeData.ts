import { ITransaction } from './types'
const transactions: ITransaction[] = [
  {
    _id: 'ljaaoi3joijoiji',
    amount: 100,
    category: 'Groceries',
    date: '2018-09-01T00:00:00.000Z',
    title: 'Dillons',
    type: 'expense',
  },
  {
    _id: 'ljoi3jesfeaaoijoiji',
    amount: 20,
    category: 'Web Development',
    date: '2018-08-11T00:00:00.000Z',
    title: 'Level Up Tuts',
    type: 'income',
  },
  {
    _id: 'ljoi3joaaijoijiefse',
    amount: 45,
    category: 'Eating Out',
    date: '2018-03-14T00:00:00.000Z',
    title: 'Olive Garden',
    type: 'expense',
  },
  {
    _id: 'ljoi3joisefesfejoiji',
    amount: 30,
    category: 'Entertainment',
    date: '2018-09-19T00:00:00.000Z',
    notes: 'We really wanted to see this movie so we were willing to pay for the ridiculous matinee price',
    title: 'Peppermint',
    type: 'income',
  },
]

const getTransactions = ({ num }: { num?: number } = {}) => (num ? transactions.slice(0, num) : transactions)

export { transactions, getTransactions }
