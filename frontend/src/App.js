import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
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
  warning: '#bb0000',
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper className="hi" data-testid="app">
          <User>
            {/* eslint-disable-next-line */
            ({ user, error, pending, login, logout, register }) => (
              <>
                <ItemForm user={user} />
                <TransactionDisplay />
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
