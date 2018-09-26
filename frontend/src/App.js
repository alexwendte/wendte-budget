import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import './styles/App.css'
import ItemForm from './ItemForm'
import RecentPurchases from './RecentPurchases'
import BudgetItem from './BudgetItem'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGray: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

class App extends Component {
  state = {
    items: [],
  }
  handleSubmit = obj => {
    this.setState(state => ({ items: [...state.items, obj] }))
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="hi" data-testid="app">
          <ItemForm onSubmit={this.handleSubmit} />
          <RecentPurchases />
          <BudgetItem />
        </div>
      </ThemeProvider>
    )
  }
}

export default App
