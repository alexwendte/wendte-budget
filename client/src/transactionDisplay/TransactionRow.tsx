import { theme } from 'App'
import AmountInput from 'components/AmountInput'
import Flash from 'components/Flash'
import Icon from 'components/Icon'
import Input from 'components/Input'
import * as React from 'react'
import styled from 'styled-components'
import restApi from 'utils/api'
import { media } from 'utils/mixins'
import { ITransaction } from 'utils/types'
import TableNotes from './TableNotes'

interface IProps {
  readOnly: boolean
  transaction: ITransaction
}

interface IState {
  error?: string
  expandNotes: boolean
  deleted: boolean
  submitted: boolean
}

class TransactionRow extends React.Component<IProps, IState> {
  static defaultProps = {
    readOnly: true,
  }
  state = {
    deleted: false,
    error: undefined,
    expandNotes: false,
    submitted: false,
  }

  handleRowClick = () => {
    this.setState(({ expandNotes }) => ({ expandNotes: !expandNotes }))
  }

  handleDelete = () =>
    restApi.transactions
      .delete(this.props.transaction._id)
      .then(() => this.setState({ deleted: true }), error => this.setState({ error: error.message }))

  flashClosedClicked = () => this.setState({ error: undefined })

  render() {
    const { title, category, date, notes, type, amount } = this.props.transaction
    const { readOnly } = this.props
    const { expandNotes, deleted, submitted, error } = this.state
    return (
      !deleted && (
        <Row
          data-testid="budget-transaction"
          tabIndex={0}
          role="button"
          onClick={this.handleRowClick}
          className={readOnly ? '' : 'editable'}
        >
          <Flash
            successMessage={submitted && !error ? 'Transaction altered successfully' : undefined}
            submitted={submitted}
            error={error}
            closeClicked={this.flashClosedClicked}
          />
          <Title>{title} </Title>
          <Dates>{new Date(date).toDateString()}</Dates>
          <Category>{category}</Category>
          {<Amount>{type === 'expense' ? `-$${amount}.00` : `$${amount}.00`}</Amount>}
          <TableNotes expanded={expandNotes} notes={notes} aria-label="table-notes" />
        </Row>
      )
    )
  }
}

export default TransactionRow

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
    font-size: 2rem;
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
