import * as React from 'react'

type Props = {
  value?: string,
  readOnly?: boolean,
}

type State = {
  value: string,
}

export default class TextArea extends React.Component<Props, State> {
  static defaultProps = {
    value: undefined,
    readOnly: false,
  }

  state = {
    // eslint-disable-next-line
    value: this.props.value || '',
  }

  handleChange = ev => {
    const { value } = ev.currentTarget
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return <textarea {...this.props} onChange={this.handleChange} value={value} onClick={ev => ev.stopPropagation()} />
  }
}
