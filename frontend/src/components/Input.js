import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Input extends Component {
  static defaultProps = {
    value: undefined,
  }
  state = {
    value: this.props.value,
  }

  handleChange = ev => {
    const { value } = ev.currentTarget
    this.setState({ value })
  }

  render() {
    return <input {...this.props} onChange={this.handleChange} value={this.state.value} onClick={ev => {ev.stopPropagation()}}/>
  }
}

Input.propTypes = {
  value: PropTypes.string,
}
