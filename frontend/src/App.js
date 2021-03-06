import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { transactions as fakeTransactions } from 'utils/fakeData'
import User from 'components/User'
import './styles/App.css'
import ItemForm from './ItemForm'

import TransactionDisplay from './transactionDisplay/TransactionDisplay'

const theme = {
  primary: '#66B9Bf',
  black: '#222222',
  grey: '#354041',
  green: '#0ac775',
  lightGrey: '#f1f3f4',
  maxWidth: '1000px',
  white: '#fff',
}

class App extends Component {
  state = {
    items: fakeTransactions,
  }

  // I can just pass user to ItemForm, no need for context!

  render() {
    const { items } = this.state
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper className="hi" data-testid="app">
          <User>
            {/* eslint-disable-next-line */
            ({ user, error, pending, login, logout, register }) => (
              <>
                <ItemForm user={user} />
                <TransactionDisplay items={items} />
              </>
            )}
          </User>
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
