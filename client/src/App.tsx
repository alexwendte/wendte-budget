import User from 'components/User'
import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { IUser } from 'utils/types'
import ItemForm from './ItemForm'
import './styles/App.css'

import TransactionDisplay from './transactionDisplay/TransactionDisplay'

export const theme = {
  black: '#222222',
  green: '#0ac775',
  grey: '#354041',
  lightGrey: '#f1f3f4',
  maxWidth: '1000px',
  primary: '#66B9Bf',
  warning: '#bb0000',
  white: '#fff',
}

class App extends React.Component<{}, {}> {
  render() {
    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <AppWrapper className="hi" data-testid="app">
            <User>
              {({ user, error }: { user: IUser; error: string }) => (
                <>
                  {error && <h1>{error}</h1>}
                  <ItemForm user={user} />
                  <TransactionDisplay />
                </>
              )}
            </User>
          </AppWrapper>
        </ThemeProvider>
      </React.StrictMode>
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
