import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media } from 'utils/mixins'
import Input from 'components/Input'
import AmountInput from 'components/AmountInput'

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
      <Row data-testid="budget-item" tabIndex="0" role="button" onClick={this.handleClick}>
        <Title type="text" aria-label="table-title" value={title} />
        <Dates type="text" aria-label="table-date" value={new Date(date).toDateString()} />
        <Category type="text" aria-label="table-category" value={category} />
        {this.state.expandNotes && notes ? <Notes type="text" value={notes} aria-label="table-notes" /> : null}
        {<Amount className={`${type} table`} type="text" aria-label="table-amount" value={type === 'expense' ?`-$${amount}.00` : `$${amount}.00`} inTable onClick={ev => ev.stopPropagation()}/>}
        {notes ? <ExpandButton data-testid="expand-button">&#9660;</ExpandButton> : null}
      </Row>
    )
  }
}

export default TransactionRow

TransactionRow.propTypes = {
  item: PropTypes.object.isRequired,
}

const Row = styled.div`
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
  grid-template-columns: minmax(12.5rem, 1fr) 1fr minmax(9rem, 1fr) 1.6rem;
  grid-template-rows: repeat(3, auto);
  padding: 1rem;
  font-size: 1.4rem;
  `};
  ${media.phone`
    grid-template-columns: minmax(12.5rem, 2fr) 1fr minmax(9rem, 2fr) 1.6rem;
  `};
`
const TableInput = styled(Input)`
  background: none;
  border: none;
  color: white;
  width: 100%;
`
const Title = styled(TableInput)``
const Dates = styled(TableInput)`
  
  ${media.tabletPort`
    grid-column: 1;
    font-size: 1.1rem;
  `}
  color: ${props => props.theme.lightGrey};
`
const Category = styled(TableInput)`
  
  ${media.tabletPort`
    grid-column: 1;
    font-size: 1.1rem;
  `}
  color: ${props => props.theme.lightGrey};
`
const Amount = styled(AmountInput)`
  font-weight: 300;
  text-align: right;
  width: 100%;
  &.table {
    background: none;
    color: white;
    border: none;
    animation: none;
    border: none;
  }
  &.income {
    color: ${props => props.theme.green};
  }

  ${media.tabletPort`
    grid-row: 2
    grid-column: 3;
    justify-self: right;
    padding-right: 1rem;
  `};
`
const Notes = styled(TableInput)`
  background: ${props => props.theme.lightGrey};
  color: ${props => props.theme.black};
  padding: 1rem 2rem;
  grid-column: 1 / -1;
  grid-row: 2;
  margin: 1rem -1.5rem -1.5rem;
  font-size: 1.4rem;
  width: unset;
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
  grid-column: 4;
  `};
`
