import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNumber, hasDSign } from 'utils/utils'

export default class CostInput extends Component {
  static defaultProps = {
    id: 'cost',
    'aria-label': 'cost',
    placeholder: '$3.78',
  }

  state = {
    inputValue: '',
  }

  handleChange = ev => {
    const { value } = ev.target
    const strippedValue = hasDSign(value) ? value.slice(1) : value
    if (!isNumber(strippedValue)) return
    const stringToReturn = hasDSign(value) || value === '' ? { inputValue: value } : { inputValue: `$${value}` }
    this.setState(stringToReturn)
  }
  render() {
    return <input {...this.props} value={this.state.inputValue} onChange={this.handleChange} />
  }
}

CostInput.propTypes = {
  id: PropTypes.string,
  'aria-label': PropTypes.string,
  placeholder: PropTypes.string,
}
