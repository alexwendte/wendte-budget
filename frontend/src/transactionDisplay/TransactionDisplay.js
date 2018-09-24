import React, { Component } from 'react'
import styled from 'styled-components'
import * as fakeData from './fakeData'

export default class TransactionDisplay extends Component {
  state = {
    transactions: undefined,
  }

  componentWillMount() {
    const transactions = fakeData.getTransactions({ number: 10 })
    this.setState({ transactions })
  }
  render() {
    const trans = this.state.transactions
    return trans ? (
      <Transactions data-testid="transactions">
        {trans.map(tran => (
          <li key={tran.cost + tran.date}>
            <TransactionGroup>
              <li>{tran.itemName}</li>
              <li>{tran.cost}</li>
              <li>{tran.date}</li>
              <li>{tran.person}</li>
            </TransactionGroup>
          </li>
        ))}
      </Transactions>
    ) : null
  }
}

const Transactions = styled.ul`
  background: black;
  &:nth-child(2n) {
    background: ${props => props.theme.darkGray};
  }
`

const TransactionGroup = styled.ul`
  background: orange;
`
