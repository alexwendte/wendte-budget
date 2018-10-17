import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media } from 'utils/mixins'
import Input from 'components/Input'
import AmountInput from 'components/AmountInput'
import TextArea from 'components/TextArea'
import Icon from 'components/Icon'
import { theme } from 'App'
import * as api from 'utils/api'

class TransactionRow extends React.Component {
  static defaultProps = {
    readOnly: true,
  }

  state = {
    expandNotes: false,
    deleted: false,
  }

  handleClick = () => {
    this.setState(({ expandNotes }) => ({ expandNotes: !expandNotes && this.props.item.notes }))
  }

  handleDelete = () => {
    api.transactions.delete(this.props.item._id).then(this.setState({ deleted: true }))
  }

  render() {
    const { title, category, date, notes, type, amount } = this.props.item
    const { readOnly } = this.props
    const { deleted, expandNotes } = this.state
    return (
      !deleted && (
        <Row
          data-testid="budget-item"
          tabIndex="0"
          role="button"
          onClick={this.handleClick}
          className={readOnly ? '' : 'editable'}
        >
          <Title type="text" aria-label="table-title" value={title} readOnly={readOnly} />
          <Dates type="text" aria-label="table-date" value={new Date(date).toDateString()} readOnly={readOnly} />
          <Category type="text" aria-label="table-category" value={category} readOnly={readOnly} />
          <Amount
            className={`${type} table`}
            type="text"
            aria-label="table-amount"
            value={type === 'expense' ? `-$${amount}.00` : `$${amount}.00`}
            readOnly={readOnly}
            inTable
          />
          {notes && (
            <ExpandButton data-testid="expand-button" className={readOnly ? '' : 'editable'}>
              &#9660;
            </ExpandButton>
          )}
          {expandNotes && notes && <Notes value={notes} aria-label="table-notes" readOnly={readOnly} />}
          {!readOnly && (
            <Delete
              name="delete"
              color={theme.warning}
              onClick={this.handleDelete}
              height="2.4"
              className="delete-icon"
            />
          )}
        </Row>
      )
    )
  }
}

export default TransactionRow

TransactionRow.propTypes = {
  item: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
}

const Row = styled.div`
  grid-column-gap: 1.5rem;
  padding: 0.7rem 1.5rem;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, minmax(12.5rem, 1fr)) 10rem 2rem;
  grid-template-rows: 1fr;
  grid-auto-rows: minmax(10rem, auto);
  background: ${props => props.theme.black};
  outline: none;
  position: relative;
  align-items: center;
  &:nth-child(2n) {
    background: ${props => props.theme.grey};
  }

  &.editable {
    padding: 1rem 1.5rem;
    grid-template-columns: repeat(3, minmax(12.5rem, 1fr)) 10rem 2rem 2rem;

    ${media.tabletPort`
    grid-template-columns: minmax(12.5rem, 1fr) 1fr minmax(9rem, 1fr) 2rem 2rem;
    `};
    ${media.phone`
    grid-template-columns: minmax(12.5rem, 2fr) 1fr minmax(9rem, 1fr) 2rem 2rem;
    `};

    &:hover,
    &:focus-within {
      .delete-icon {
        visibility: visible;
      }
    }
  }

  ${media.tabletPort`
  grid-gap: 0;
  grid-template-columns: minmax(12.5rem, 1fr) 1fr minmax(9rem, 1fr) 2rem;
  grid-template-rows: repeat(3, 1fr);
  padding: .5rem 1rem;
  font-size: 1.4rem;
  `};
  ${media.phone`
    grid-template-columns: minmax(12.5rem, 2fr) 1fr minmax(9rem, 2fr) 2rem;
  `};
`
const TableInput = styled(Input)`
  width: 100%;
  color: ${props => props.theme.white};
  padding: 0.6rem 0.7rem;
  border-radius: 5px;
  border: 1px solid white;
  background: none;
  font-weight: 300;
  font-size: 1.6rem;
  &:read-only {
    border: none;
    padding: 0.7rem 0.8rem;
  }
  ${media.tabletPort`
    margin: .2rem 0;
  `};
`
const Title = styled(TableInput)``
const Dates = styled(TableInput)`
  ${media.tabletPort`
    grid-column: 1;
    font-size: 1.2rem;
  `};
  &:read-only {
    color: ${props => props.theme.lightGrey};
  }
`
const Category = styled(TableInput)`
  ${media.tabletPort`
    grid-column: 1;
    font-size: 1.2rem;
  `};
  &:read-only {
    color: ${props => props.theme.lightGrey};
  }
`
const Amount = styled(AmountInput)`
  font-size: 1.6rem;
  font-weight: 300;
  text-align: right;
  padding: 0.6rem 0.7rem;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.white};
  color: ${props => props.theme.white};
  background: none;
  width: 100%;
  &.table:read-only {
    border: none;
    animation: none;
    padding: 0.7rem 0.8rem;
  }
  &.table.income {
    color: ${props => props.theme.green};
  }
  ${media.tabletPort`
    grid-row: 2
    grid-column: 3;
    justify-self: right;
    margin-right: 1rem;
    font-size: 1.4rem;
  `};
`
const Notes = styled(TextArea)`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
  padding: 1rem 2rem;
  grid-column: 1 / -1;
  grid-row: 2;
  margin: 1rem -2rem -2.5rem;
  font-size: 1.5rem;
  width: unset;
  height: 100%;
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
  grid-column: -2;
  &.editable {
    grid-column: -3;
  }
  &:hover {
    cursor: pointer;
  }

  ${media.tabletPort`
  grid-row: 2;
  grid-column: 4;
  `};
`

const Delete = styled(Icon)`
  grid-column: -2;
  visibility: hidden;
  &:hover {
    cursor: pointer;
  }
  ${media.tabletPort`
    grid-row: 2;
  `};
`
