// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-spring'
import { media } from 'utils/mixins'
import AmountInput from 'components/AmountInput'
import * as api from 'utils/api'

type State = {
  categories?: Array,
  loading: boolean,
}

class ItemForm extends React.Component<{}, State> {
  static defaultProps = {
    categories: null,
  }

  state = {
    loading: true,
    categories: null,
    error: null,
    submitted: false,
  }

  async componentDidMount() {
    const { categories } = await api.categories.get()
    this.setState({ categories, loading: false })
  }

  componentDidUpdate() {
    if (this.state.submitted) {
      setTimeout(() => {
        this.setState({ submitted: false, error: null })
      }, 2000)
    }
  }

  render() {
    const now = new Date(Date.now())
    const nowForInput = now.toISOString().slice(0, 10)
    const convertToNumAndRemoveDSign = (str: string): ?number => parseInt(str.slice(1), 10) || null

    const handleSubmit = (ev: SubmitEvent) => {
      ev.preventDefault()
      const { title, amount: stringAmount, category, date, type, notes } = ev.currentTarget.elements
      const amount = convertToNumAndRemoveDSign(stringAmount.value)
      const elements = Array.from(ev.currentTarget.elements)
      const shouldContinue = !elements.some(el => el.required && el.value === '')
      if (shouldContinue) {
        api.transactions
          .create({
            title: title.value,
            amount,
            category: category.value,
            date: new Date(date.value).toISOString(),
            type: type.value,
            notes: notes.value,
          })
          .then(() => this.setState({ submitted: true }))
          .catch(err => this.setState({ submitted: true, error: err.message }))
      }
    }

    const { loading, submitted, error } = this.state

    return loading ? (
      <div data-testid="loading" hidden />
    ) : (
      <ItemFormWrapper className="item-form">
        <Transition
          from={{ transform: 'translateY(-100%)' }}
          enter={{ transform: 'translateY(0)' }}
          leave={{ transform: 'translateY(-100%)' }}
        >
          {submitted
            && !error
            && (({ transform }) => (
              <ResponseSuccess style={{ transform }}>Transaction Created Successfully</ResponseSuccess>
            ))}
        </Transition>
        {error && <ResponseError data-testid="create-error">{error}</ResponseError>}
        <h2 className="heading">Create Transaction</h2>
        <Form onSubmit={handleSubmit}>
          <DateInputGroup>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={nowForInput} required />
          </DateInputGroup>
          <TitleInputGroup>
            <label htmlFor="title">Transaction Title</label>
            <input type="text" id="title" name="title" placeholder="Ramen Noodles" required />
          </TitleInputGroup>
          <CategoryInputGroup>
            <label htmlFor="category">Item Category</label>
            <select id="category" name="category" required>
              {this.state
                && this.state.categories
                && this.state.categories.map(cat => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </CategoryInputGroup>
          <AmountInputGroup>
            <label htmlFor="amount">Amount</label>
            <AmountInput id="amount" name="amount" placeholder="$3.78" required />
          </AmountInputGroup>
          <TypeInputGroup>
            <fieldset>
              <legend>Transaction Type</legend>
              <label htmlFor="expenseInput">Expense</label>
              <input type="radio" name="type" value="Expense" id="expenseInput" defaultChecked />
              <label htmlFor="incomeInput">Income</label>
              <input type="radio" name="type" value="Income" id="incomeInput" />
            </fieldset>
          </TypeInputGroup>
          <NotesInputGroup>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" placeholder="Brianna is my love so I bought her something nice" />
          </NotesInputGroup>
          <SubmitButton type="submit" onSubmit={handleSubmit}>
            Submit
          </SubmitButton>
        </Form>
      </ItemFormWrapper>
    )
  }
}

export default ItemForm

const ItemFormWrapper = styled.div`
  margin: 2rem;
  border-radius: 5px;
  .heading {
    color: ${props => props.theme.primary};
    width: 100%;
    text-align: center;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 4px 4px 0 0;
  }
  ${media.tabletPort`
    margin: 0;
    border-radius: 0;
    .heading {
      margin-bottom: 1rem;
    }
`};
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 0 2rem 2rem;
  justify-content: center;
  max-width: 1000px;
`

const InputGroup = styled.div`
  margin: 0 0.5rem 1rem;
  flex-grow: 1;
  label,
  legend {
    color: ${props => props.theme.grey};
    padding-bottom: 0.5rem;
  }
  label,
  input {
    display: block;
  }
  input,
  select {
    width: 100%;
    border-radius: 5px;
    padding: 0.7rem 1.2rem;
    height: 3.4rem;
    border: none;
    background: ${props => props.theme.lightGrey};
  }
`

const DateInputGroup = styled(InputGroup)`
  input {
    padding-right: 0.3rem;
    vertical-align: middle;
    line-height: 3.4rem;
  }
`
const TitleInputGroup = styled(InputGroup)``
const AmountInputGroup = styled(InputGroup)`
  flex-basis: 10rem;
  flex-grow: 0;
`
const CategoryInputGroup = styled(InputGroup)``
const TypeInputGroup = styled(InputGroup)`
  margin-right: 0;
  flex-grow: 0;
  label,
  input {
    display: inline-block;
    width: auto;
    font-weight: 400;
    height: 3.2rem;
    line-height: 3.2rem;
  }
  input {
    margin-top: 0;
    vertical-align: middle;
    background: ${props => props.theme.black};
  }
`
const NotesInputGroup = styled(InputGroup)`
  textarea {
    width: 100%;
    padding: 0.7rem 1.2rem;
    border-radius: 5px;
    background: ${props => props.theme.lightGrey};
    border: none;
  }
  width: 100%;
`
const SubmitButton = styled.button`
  border-radius: 5px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.primary};
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
`
const Response = styled.h3`
  text-align: center;
  padding: 0.5rem;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.6rem;
`
const ResponseSuccess = styled(Response)`
  background: ${props => props.theme.green};
`
const ResponseError = styled(Response)`
  background: ${props => props.theme.warning};
`
