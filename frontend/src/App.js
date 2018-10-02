import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'
import { transactions as fakeTransactions } from 'utils/fakeData'
import './styles/App.css'
import ItemForm from './ItemForm'
import TransactionDisplay from './transactionDisplay/TransactionDisplay'

const theme = {
  primary: '#66B9Bf',
  black: '#222222',
  grey: '#3A3A3A',
  green: '#0ac775',
  lightGrey: '#f3f3f3',
  maxWidth: '1000px',
  white: '#fff',
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
        <AppWrapper className="hi" data-testid="app">
          <ItemForm onSubmit={this.handleSubmit} />
          <TransactionDisplay items={this.state.items} />
        </AppWrapper>
      </ThemeProvider>
    )
  }
}

export default App

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4rem;
`
