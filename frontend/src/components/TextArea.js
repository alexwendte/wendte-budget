import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextArea extends Component {
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
    return (
      <textarea
        {...this.props}
        onChange={this.handleChange}
        value={this.state.value}
        onClick={ev => ev.stopPropagation()}
      />
    )
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
}
