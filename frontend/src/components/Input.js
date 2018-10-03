import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Input extends Component {
  static defaultProps = {
    value: undefined,
    readOnly: false,
  }
  state = {
    value: this.props.value || '',
  }

  handleChange = ev => {
    const { value } = ev.currentTarget
    this.setState({ value })
  }

  render() {
    const { readOnly, ...rest } = this.props
    return (
      <input
        {...rest}
        onChange={this.handleChange}
        value={this.state.value}
        onClick={ev => !readOnly && ev.stopPropagation()}
        readOnly={readOnly}
      />
    )
  }
}

Input.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
}
