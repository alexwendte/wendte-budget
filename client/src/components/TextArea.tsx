import * as React from 'react'

interface IProps {
  readOnly?: boolean
  value?: string
}

interface IState {
  value: string
}

export default class TextArea extends React.Component<IProps, IState> {
  static defaultProps = {
    readOnly: false,
    value: undefined,
  }

  state = {
    value: this.props.value || '',
  }

  handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = ev.currentTarget
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return <textarea {...this.props} onChange={this.handleChange} value={value} onClick={ev => ev.stopPropagation()} />
  }
}
