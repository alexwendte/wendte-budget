import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { elevation, media } from 'utils/mixins'
import styled from 'styled-components'
import { transactions } from 'utils/api'

import TransactionRow from './TransactionRow'

class TransactionDisplay extends Component {
  state = {
    readOnly: true,
    items: [],
    loading: true,
  }

  async componentDidMount() {
    const results = await transactions.get()
    console.log(results)
    console.log(results)
    this.setState({ items: results, loading: false })
  }

  editTransaction = () => {
    this.setState(({ readOnly }) => ({ readOnly: !readOnly }))
  }

  render() {
    const { readOnly, items, loading } = this.state
    // I imagine the save changes will be a button with type submit.
    // Doesn't that mean that the whole table is a form?
    // How will I decide what data was changed? I only want to update the transaciton that was changes.
    // Each transaction should have an id. When it is changed, I will include that id in the list of id's that were changed.
    return loading ? (
      <div data-testid="loading" hidden />
    ) : (
      <TransactionTable>
        <h2 className="heading">Recent Transactions</h2>
        <Controls>
          <Edit onClick={this.editTransaction}>Edit Transactions</Edit>
          <Save onClick={this.saveChanges}>Save Changes</Save>
        </Controls>
        <TableItems>
          <TableHeader>
            <div>Title</div>
            <div className="date">Date</div>
            <div className="category">Category</div>
            <div className="amount">Amount</div>
          </TableHeader>
          {items.map(item => (
            <TransactionRow item={item} key={item.name + item.date} readOnly={readOnly} />
          ))}
        </TableItems>
      </TransactionTable>
    )
  }
}

export default TransactionDisplay

const TransactionTable = styled.div`
  padding: 4rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  .heading {
    color: ${props => props.theme.primary};
    text-align: center;
    padding: 4rem 0 2rem;
  }

  ${media.tabletPort`
    padding: 0;
    width: 100%;
  `};
`

const TableHeader = styled.div`
  grid-gap: 1.5rem;
  padding: 1.5rem;
  color: white;
  display: grid;
  grid-template-columns: repeat(4, minmax(125px, 1fr)) 10px;
  grid-template-columns: repeat(3, minmax(12.5rem, 1fr)) 10rem 1rem;
  background: ${props => props.theme.black};
  font-weight: 500;

  > * {
    display: inline-block;
    font-size: 2rem;
  }
  .amount {
    justify-self: right;
  }
  ${media.tabletPort`
    grid-template-columns: 1fr 1fr 10px;
    grid-gap: 0;
    padding: 1rem;
    .date,
    .category {
      display: none;
    }
    .amount {
      padding-right: 1.5rem;
    }
  `};
`

const Controls = styled.div`
  align-self: flex-end;
`

const Edit = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.grey};
  font-weight: 600;
  padding: 0.5rem;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
`

const Save = styled(Edit)`
  color: ${props => props.theme.primary};
`

const TableItems = styled.div`
  ${elevation({ level: 4 })};
  border-radius: 5px;
  overflow: hidden;
  ${media.tabletPort`
    border-radius: 0;
  `};
`
