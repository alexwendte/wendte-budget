import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { elevation } from 'utils/mixins'
import styled from 'styled-components'
import BudgetItem from './BudgetItem'

class TransactionDisplay extends Component {
  static defaultProps = {
    items: null,
  }

  render() {
    const { items } = this.props
    return (
      <TransactionTable>
        <h2 className="heading">Recent Purchases</h2>
        <TableItems>
          {items.map(item => (
            <BudgetItem item={item} key={item.name + item.date} />
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem;
  .heading {
    color: salmon;
    padding-bottom: 2rem;
  }
`

const TableItems = styled.div`
  ${elevation({ level: 4 })};
  border-radius: 5px;
  overflow: hidden;
`
