import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isNumber, hasDSign } from 'utils/utils'
import { transition } from 'utils/mixins'

export default class AmountInput extends Component {
  static defaultProps = {
    id: 'amount',
    'aria-label': 'amount',
    placeholder: '$3.78',
    value: undefined,
    className: null,
    inTable: false,
  }

  state = {
    inputValue: this.props.value,
    invalid: false,
  }

  isInputValid = value => {
    // Add in inTable support
    let newValue = value
    if(this.props.inTable) {
      newValue = newValue.includes('-') ? newValue.slice(1) : newValue
    }
    if (!isNumber(newValue)) return true
    const after = newValue.split('.')[1]
    if (after && after.length > 2) return true
  }

  handleChange = ev => {
    const { value } = ev.currentTarget
    if (this.isInputValid(value)) {
      this.setState({ invalid: false }, () => {
        this.setState({ invalid: true })
      })
      return
    }
    const stringToReturn = hasDSign(value) || value === '' ? { inputValue: value } : { inputValue: `$${value}` }
    this.setState({ inputValue: stringToReturn.inputValue, invalid: false })
  }
  handleBlur = () => {
    this.setState(state => (state.inputValue === '$' ? { inputValue: '', invalid: true } : { invalid: false }))
  }

  render() {
    const { className, ...rest } = this.props
    return (
      <Input
        {...rest}
        value={this.state.inputValue}
        onChange={this.handleChange}
        className={`${className} ${this.state.invalid ? 'invalid' : ''}`}
        onBlur={this.handleBlur}
      />
    )
  }
}

AmountInput.propTypes = {
  id: PropTypes.string,
  'aria-label': PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  inTable: PropTypes.bool,
}

const Input = styled.input`
  @keyframes invalid {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(2px);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(2px);
    }
    100% {
      transform: translateX(0);
    }
  }
  ${transition({ name: 'easeInCubic', prop: 'transform' })};
  &.invalid {
    border: 1px solid red;
    outline: none;
    animation-name: invalid;
    animation-duration: 0.5s;
  }
`
