// @flow
import * as React from 'react'
// import PropTypes from 'prop-types'

type Props = {
  value?: string,
  readOnly?: boolean,
}

type State = {
  value: string,
}

export default class Input extends React.Component<Props, State> {
  static defaultProps = {
    value: undefined,
    readOnly: false,
  }

  state = {
    // eslint-disable-next-line
    value: this.props.value || '',
  }

  handleChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget
    this.setState({ value })
  }

  render() {
    const { readOnly, ...rest } = this.props
    const { value } = this.state
    return (
      <input
        {...rest}
        onChange={this.handleChange}
        value={value}
        onClick={ev => !readOnly && ev.stopPropagation()}
        readOnly={readOnly}
      />
    )
  }
}
