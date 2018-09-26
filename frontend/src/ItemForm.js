import React from 'react'
import PropTypes from 'prop-types'
import CostInput from './CostInput'

const ItemForm = props => {
  const now = new Date(Date.now())
  const nowForInput = now.toISOString().slice(0, 10)
  const convertToNumAndRemoveDSign = str => parseInt(str.slice(1), 10) || ''

  const handleSubmit = ev => {
    ev.preventDefault()
    const { itemName, cost: stringCost, category, date, person } = ev.currentTarget.elements
    const cost = convertToNumAndRemoveDSign(stringCost.value)
    const elements = Array.from(ev.currentTarget.elements)
    const shouldContinue = !elements.some(el => el.required && el.value === '')
    if (shouldContinue) {
      props.onSubmit({
        itemName: itemName.value,
        cost,
        category: category.value,
        date: new Date(date.value).toISOString(),
        person: person.value,
      })
    }
  }

  return (
    <div data-testid="item-form">
      <form onSubmit={handleSubmit}>
        <h4>Enter your purchase</h4>
        <label htmlFor="itemName">Item Name</label>
        <input type="text" id="itemName" placeholder="Ramen Noodles" required />
        <label htmlFor="cost">Item Cost</label>
        <CostInput id="cost" placeholder="$3.78" required />
        <label htmlFor="category">Item Category</label>
        <input type="text" id="category" placeholder="Groceries" required />
        <label htmlFor="date">Date of Purchase</label>
        <input type="date" id="date" defaultValue={nowForInput} required />
        <label htmlFor="person">Purchaser</label>
        <input type="text" id="person" placeholder="Brianna" required />
        <fieldset>
          <legend>Transaction Type</legend>
          <label htmlFor="expenseInput">Expense</label>
          <input type="radio" name="Transaction Type" id="expenseInput" defaultChecked />
          <label htmlFor="incomeInput">Income</label>
          <input type="radio" name="Transaction Type" id="incomeInput" />
        </fieldset>
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
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
