import React from 'react'
import PropTypes from 'prop-types'
import CostInput from './CostInput'

const ItemForm = props => {
  const now = new Date(Date.now())
  const nowForInput = now.toISOString().slice(0, 10)
  const convertToNumAndRemoveDSign = str => parseInt(str.slice(1), 10) || ''

  const handleSubmit = ev => {
    ev.preventDefault()
    const { itemName, cost: stringCost, date, person } = ev.currentTarget.elements
    const cost = convertToNumAndRemoveDSign(stringCost.value)
    props.handleSubmit({
      itemName: itemName.value,
      cost,
      date: new Date(date.value).toISOString(),
      person: person.value,
    })
  }

  return (
    <div data-testid="item-form">
      <form onSubmit={handleSubmit}>
        <h4>Enter your purchase</h4>
        <label htmlFor="itemName">Item Name</label>
        <input type="text" id="itemName" placeholder="Ramen Noodles" />
        <label htmlFor="cost">Item Cost</label>
        <CostInput id="cost" placeholder="$3.78" />
        <label htmlFor="date">Date of Purchase</label>
        <input type="date" id="date" defaultValue={nowForInput} />
        <label htmlFor="person">Purchaser</label>
        <input type="text" id="person" placeholder="Brianna" />
        <fieldset>
          <legend>Transaction Type</legend>
          <label htmlFor="expenseInput">Expense</label>
          <input type="radio" id="expenseInput" defaultChecked />
          <label htmlFor="incomeInput">Income</label>
          <input type="radio" id="incomeInput" />
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
  handleSubmit: PropTypes.func,
}

ItemForm.defaultProps = {
  handleSubmit: data => {
    // console.log(data)
  },
}
