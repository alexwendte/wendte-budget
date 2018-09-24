const transactions = [
  {
    itemName: 'Football',
    cost: 12.0,
    date: '2018-09-14T00:00:00.000Z',
    person: 'Alex',
  },
  {
    itemName: 'A really great course from Wes Bos',
    cost: 65.0,
    date: '2018-02-14T10:00:00.000Z',
    person: 'Alex',
  },
  {
    itemName: 'Bath and Body Works Body Wash',
    cost: 27.35,
    date: '2018-09-11T50:00:00.000Z',
    person: 'Brianna',
  },
  {
    itemName: 'Ramen Noodles',
    cost: 1.0,
    date: '2018-09-14T60:00:00.000Z',
    person: 'Brianna',
  },
  {
    itemName: 'Football',
    cost: 12.0,
    date: '2018-09-14T70:00:00.000Z',
    person: 'Alex',
  },
  {
    itemName: 'A really great course from Wes Bos',
    cost: 65.0,
    date: '2018-09-14T90:00:00.000Z',
    person: 'Alex',
  },
  {
    itemName: 'Bath and Body Works Body Wash',
    cost: 27.35,
    date: '2018-09-14T60:00:00.000Z',
    person: 'Brianna',
  },
  {
    itemName: 'Ramen Noodles',
    cost: 1.0,
    date: '2018-09-14T23:00:00.000Z',
    person: 'Brianna',
  },
  {
    itemName: 'Football',
    cost: 12.0,
    date: '2018-09-20T11:00:00.000Z',
    person: 'Alex',
  },
  {
    itemName: 'A really great course from Wes Bos',
    cost: 65.0,
    date: '2018-09-07T12:00:00.000Z',
    person: 'Alex',
  },
  {
    itemName: 'Bath and Body Works Body Wash',
    cost: 27.35,
    date: '2018-09-12T13:00:00.000Z',
    person: 'Brianna',
  },
  {
    itemName: 'Ramen Noodles',
    cost: 1.0,
    date: '2018-05-14T14:00:00.000Z',
    person: 'Brianna',
  },
]

const getTransactions = ({ number } = {}) => (number ? transactions.slice(0, number) : transactions)

export { transactions, getTransactions }
