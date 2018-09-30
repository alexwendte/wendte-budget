import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import axios from 'axios'
import './styles/App.css'
import ItemForm from './ItemForm'
import TransactionDisplay from './transactionDisplay/TransactionDisplay'
import { transactions as fakeTransactions } from 'utils/fakeData'

const theme = {
  red: '#FF0000',
  black: '#222222',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

class App extends Component {
  state = {
    items: fakeTransactions,
  }

  handleSubmit = obj => {
    this.setState(state => ({ items: [...state.items, obj] }))
    console.log(obj)
    axios.post('/api/addTransaction', obj)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="hi" data-testid="app">
          <ItemForm onSubmit={this.handleSubmit} />
          <TransactionDisplay items={this.state.items} />
        </div>
      </ThemeProvider>
    )
  }
}

export default App
