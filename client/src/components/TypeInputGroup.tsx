// @flow

import * as React from 'react'
import styled from 'styled-components'

const TypeInputGroup = () => (
  <StyledFieldSet>
    <legend>Transaction Type</legend>
    <label htmlFor="expenseInput">Expense</label>
    <input type="radio" name="type" value="Expense" id="expenseInput" defaultChecked={true} />
    <label htmlFor="incomeInput">Income</label>
    <input type="radio" name="type" value="Income" id="incomeInput" />
  </StyledFieldSet>
)

export default TypeInputGroup

const StyledFieldSet = styled.fieldset`
  margin-right: 0;
  flex-grow: 0;
  label,
  input {
    display: inline-block;
    width: auto;
    font-weight: 400;
    height: 3.2rem;
    line-height: 3.2rem;
  }
  input {
    margin-top: 0;
    vertical-align: middle;
    background: ${props => props.theme.black};
  }
`
