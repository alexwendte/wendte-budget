import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class BudgetItem extends React.Component {
  state = {
    expandNotes: false,
  }

  handleClick = () => {
    this.setState(({ expandNotes }) => ({ expandNotes: !expandNotes }))
  }

  render() {
    const { item } = this.props
    return (
      <Item data-testid="budget-item" tabIndex="0" role="button" onClick={this.handleClick}>
        {Object.entries(item).map(([key, value]) => {
          let returnValue
          if (key === 'cost') returnValue = `$${value}.00`
          else if (key === 'date') returnValue = new Date(value).toDateString()
          else if (key === 'extraNotes') {
            return this.state.expandNotes ? <ExtraNotes key={value}>{value}</ExtraNotes> : null
          } else returnValue = value
          return <Value key={value}>{returnValue}</Value>
        })}
        {item.extraNotes ? <ExpandButton data-testid="expand-button">&#9660;</ExpandButton> : null}
      </Item>
    )
  }
}

export default BudgetItem

BudgetItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const Item = styled.div`
  padding: 1.5rem;
  color: white;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr 1fr;
  background: ${props => props.theme.black};
  outline: none;
  position: relative;
  &:nth-child(2n) {
    background: ${props => props.theme.grey};
  }
`

const Value = styled.div``
const ExtraNotes = styled.div`
  background: ${props => props.theme.lightGrey};
  color: ${props => props.theme.black};
  padding: 1rem 2rem;
  grid-column: 1 / -1;
  margin: 1rem -1.5rem -1.5rem;
`

const ExpandButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 2rem;
  color: white;
  background: none;
  border-radius: 30px;
  border: none;
`
