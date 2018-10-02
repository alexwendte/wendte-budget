import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media } from 'utils/mixins'

class TransactionRow extends React.Component {
  state = {
    expandNotes: false,
  }

  handleClick = () => {
    this.setState(({ expandNotes }) => ({ expandNotes: !expandNotes }))
  }

  render() {
    const { title, category, date, notes, type, amount } = this.props.item
    return (
      <Item data-testid="budget-item" tabIndex="0" role="button" onClick={this.handleClick}>
        <Value>{title}</Value>
        <Dates>{new Date(date).toDateString()}</Dates>
        <Category>{category}</Category>
        {this.state.expandNotes && notes ? <Notes>{notes}</Notes> : null}
        {type === 'expense' ? (
          <Amount className="expense">{`-$${amount}.00`}</Amount>
        ) : (
          <Amount className="income">{`$${amount}.00`}</Amount>
        )}
        {notes ? <ExpandButton data-testid="expand-button">&#9660;</ExpandButton> : null}
      </Item>
    )
  }
}

export default TransactionRow

TransactionRow.propTypes = {
  item: PropTypes.object.isRequired,
}

const Item = styled.div`
  grid-gap: 1.5rem;
  padding: 1.5rem;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, minmax(12.5rem, 1fr)) 10rem 1rem;
  background: ${props => props.theme.black};
  outline: none;
  position: relative;
  align-items: center;
  &:nth-child(2n) {
    background: ${props => props.theme.grey};
  }

  ${media.tabletPort`
    grid-gap: 0;
    grid-template-columns: minmax(125px, 1fr) minmax(125px, 1fr) 10px;
    grid-template-rows: repeat(3, auto);
    padding: 1rem;
    font-size: 1.4rem;
  `};
`
const Value = styled.div``
const Dates = styled.div`
  
  ${media.tabletPort`
    grid-column: 1;
    font-size: 1.1rem;
  `}
  color: ${props => props.theme.lightGrey};
`
const Category = styled.div`
  
  ${media.tabletPort`
    grid-column: 1;
    font-size: 1.1rem;
  `}
  color: ${props => props.theme.lightGrey};
`
const Amount = styled.div`
  font-weight: 300;
  &.income {
    color: ${props => props.theme.green};
  }

  ${media.tabletPort`
    grid-row: 2
    grid-column: 2;
    justify-self: right;
    padding-right: 1rem;
  `};
`
const Notes = styled.div`
  background: ${props => props.theme.lightGrey};
  color: ${props => props.theme.black};
  padding: 1rem 2rem;
  grid-column: 1 / -1;
  grid-row: 2;
  margin: 1rem -1.5rem -1.5rem;
  font-size: 1.4rem;
  ${media.tabletLand`
    grid-row: unset;
  `};
`

const ExpandButton = styled.button`
  color: white;
  background: none;
  border-radius: 30px;
  border: none;
  padding: 0;

  ${media.tabletPort`
    grid-row: 2;
    grid-column: 3;
  `};
`
