// @flow

import * as React from 'react'

export default class Name extends React.Component<{}, {}> {
  componentDidCatch() {
    console.log('hi')
  }

  render() {
    return <div>Budget Tool</div>
  }
}
