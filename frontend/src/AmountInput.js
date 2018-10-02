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
  }

  state = {
    inputValue: '',
    invalid: false,
  }

  isInputValid = value => {
    if (!isNumber(value)) return true
    const [before, after] = value.split('.')
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
    return (
      <Input
        {...this.props}
        value={this.state.inputValue}
        onChange={this.handleChange}
        className={this.state.invalid ? 'invalid' : ''}
        onBlur={this.handleBlur}
      />
    )
  }
}

AmountInput.propTypes = {
  id: PropTypes.string,
  'aria-label': PropTypes.string,
  placeholder: PropTypes.string,
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
  transform: rotateX(0);
  ${transition({ name: 'easeInCubic', prop: 'transform' })};
  &.invalid {
    border: 1px solid red;
    outline: none;
    animation-name: invalid;
    animation-duration: 0.5s;
  }
`
