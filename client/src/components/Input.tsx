import * as React from 'react'

interface IProps {
  value?: string
  readOnly?: boolean
  type?: string
  'aria-label'?: string
}

interface IState {
  value: string
}

export default class Input extends React.Component<IProps, IState> {
  static defaultProps = {
    readOnly: false,
    value: undefined,
  }

  state = {
    value: this.props.value || '',
  }

  handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
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
