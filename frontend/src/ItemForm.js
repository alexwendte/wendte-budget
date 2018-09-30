import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CostInput from './CostInput'

const ItemForm = props => {
  const now = new Date(Date.now())
  const nowForInput = now.toISOString().slice(0, 10)
  const convertToNumAndRemoveDSign = str => parseInt(str.slice(1), 10) || ''

  const handleSubmit = ev => {
    ev.preventDefault()
    const { title, cost: stringCost, category, date, type, notes } = ev.currentTarget.elements
    const cost = convertToNumAndRemoveDSign(stringCost.value)
    const elements = Array.from(ev.currentTarget.elements)
    const shouldContinue = !elements.some(el => el.required && el.value === '')
    if (shouldContinue) {
      props.onSubmit({
        title: title.value,
        cost,
        category: category.value,
        date: new Date(date.value).toISOString(),
        type: type.value,
        notes: notes.value,
      })
    }
  }

  return (
    <div className="item-form">
      <Form onSubmit={handleSubmit}>
        <h4 className="heading">Enter your purchase</h4>
        <DateInputGroup>
          <label htmlFor="date">Date of Purchase</label>
          <input type="date" id="date" name="date" defaultValue={nowForInput} required />
        </DateInputGroup>
        <TitleInputGroup>
          <label htmlFor="title">Transaction Title</label>
          <input type="text" id="title" name="title" placeholder="Ramen Noodles" required />
        </TitleInputGroup>
        <CategoryInputGroup>
          <label htmlFor="category">Item Category</label>
          <input type="text" id="category" name="category" placeholder="Groceries" required />
        </CategoryInputGroup>
        <CostInputGroup>
          <label htmlFor="cost">Item Cost</label>
          <CostInput id="cost" name="cost" placeholder="$3.78" required />
        </CostInputGroup>
        <TypeInputGroup>
          <fieldset>
            <legend>Transaction Type</legend>
            <label htmlFor="expenseInput">Expense</label>
            <input type="radio" name="type" value="Expense" id="expenseInput" defaultChecked />
            <label htmlFor="incomeInput">Income</label>
            <input type="radio" name="type" value="Income" id="incomeInput" />
          </fieldset>
        </TypeInputGroup>
        <NotesInputGroup>
          <label htmlFor="notes">Notes</label>
          <input type="text" id="notes" name="notes" placeholder="Brianna is my love so I bought her something nice" />
        </NotesInputGroup>
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </Form>
    </div>
  )
}

export default ItemForm

ItemForm.propTypes = {
  onSubmit: PropTypes.func,
}

ItemForm.defaultProps = {
  onSubmit: data => {},
}

const Form = styled.form`
  background: ${props => props.theme.grey};
  .heading {
    color: white;
  }
`

const InputGroup = styled.div`
  display: inline-block;
  label,
  legend {
    color: white;
  }
  & > * {
    display: block;
  }
`

const DateInputGroup = styled(InputGroup)`
  width: 6rem;
`
const TitleInputGroup = styled(InputGroup)``
const CostInputGroup = styled(InputGroup)`
  width: 8rem;
  input {
    width: 8rem;
  }
`
const CategoryInputGroup = styled(InputGroup)``
const TypeInputGroup = styled(InputGroup)``
const NotesInputGroup = styled(InputGroup)`
  width: 100%;
  input {
    width: 100%;
  }
`
