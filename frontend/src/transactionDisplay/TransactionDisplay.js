import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { elevation, media } from 'utils/mixins'
import styled from 'styled-components'

import TransactionRow from './TransactionRow'

class TransactionDisplay extends Component {
  static defaultProps = {
    items: null,
  }

  render() {
    const { items } = this.props
    return (
      <TransactionTable>
        <h2 className="heading">Recent Transactions</h2>
        <Edit className="edit">Edit Transactions</Edit>
        <TableItems>
          <TableHeader>
            <div>Title</div>
            <div className="date">Date</div>
            <div className="category">Category</div>
            <div className="amount">Amount</div>
          </TableHeader>
          {items.map(item => (
            <TransactionRow item={item} key={item.name + item.date} />
          ))}
        </TableItems>
      </TransactionTable>
    )
  }
}

export default TransactionDisplay

TransactionDisplay.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

const TransactionTable = styled.div`
  padding: 4rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  .heading {
    color: ${props => props.theme.grey};
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
  ${media.tabletPort`
    grid-template-columns: 1fr 1fr 10px;
    grid-gap: 0;
    padding: 1rem;
    .date,
    .category {
      display: none;
    }
    .amount {
      justify-self: right;
    }
  `};
`

const Edit = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.grey};
  font-weight: 600;
  padding: 0.5rem;
  align-self: flex-end;
  &:hover {
    cursor: pointer;
  }
`

const TableItems = styled.div`
  ${elevation({ level: 4 })};
  border-radius: 5px;
  overflow: hidden;
  ${media.tabletPort`
    border-radius: 0;
  `};
`
