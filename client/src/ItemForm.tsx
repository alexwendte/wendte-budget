import AmountInput from 'components/AmountInput'
import CategoryInputGroup from 'components/CategoryInputGroup'
import Flash from 'components/Flash'
import TypeInputGroup from 'components/TypeInputGroup'
import * as React from 'react'
import styled from 'styled-components'
import { InputGroup } from 'styles/SC'
import restApi from 'utils/api'
import { media } from 'utils/mixins'
import { IApiError, ITransactionForm, IUser } from 'utils/types'
import { convertToNumAndRemoveDSign } from 'utils/utils'

interface IProps {
  user: IUser
}

interface IState {
  categories?: string[]
  error?: string
  loading: boolean
  submitted: boolean
}

class ItemForm extends React.Component<IProps, IState> {
  state = {
    categories: undefined,
    error: undefined,
    loading: true,
    submitted: false,
  }

  timeout?: NodeJS.Timeout = undefined
  async componentDidMount() {
    restApi.categories.get().then(
      ({ categories }) => this.setState({ categories, loading: false }),
      ({ response }: IApiError) => {
        this.setState({ error: response.data.message })
      }
    )
  }

  flashClosedClicked = () => this.setState({ error: undefined })

  componentDidUpdate() {
    if (this.state.submitted) {
      this.timeout = setTimeout(() => {
        this.setState({ submitted: false })
      }, 2000)
    }
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  handleSubmit = (ev: React.FormEvent<HTMLFormElement> & ITransactionForm) => {
    ev.preventDefault()
    const { title, amount: stringAmount, category, date, type, notes } = ev.currentTarget.elements
    const amount = convertToNumAndRemoveDSign(stringAmount.value)
    const elements = Array.from(ev.currentTarget.elements)
    const shouldContinue = !elements.some((el: Partial<HTMLInputElement>) => !!el.required && el.value === '')
    if (shouldContinue) {
      restApi.transactions
        .create({
          amount,
          category: category.value,
          date: new Date(date.value).toISOString(),
          notes: notes.value,
          title: title.value,
          type: type.value,
        })
        .then(
          () => {
            this.setState({ submitted: true })
          },
          ({ response }: IApiError) => {
            this.setState({ error: response.data.message })
          }
        )
    }
  }

  render() {
    const now = new Date(Date.now())
    const nowForInput = now.toISOString().slice(0, 10)

    const { loading, categories, error, submitted } = this.state
    return loading ? (
      <div data-testid="loading" hidden={true} />
    ) : (
      <>
        <Flash
          successMessage={submitted && !error ? 'Transaction created successfully' : undefined}
          submitted={submitted}
          error={error}
          closeClicked={this.flashClosedClicked}
        />
        <ItemFormWrapper className="item-form">
          <h2 className="heading">Create Transaction</h2>
          <Form onSubmit={this.handleSubmit}>
            <DateInputGroup>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" defaultValue={nowForInput} required={true} />
            </DateInputGroup>
            <TitleInputGroup>
              <label htmlFor="title">Transaction Title</label>
              <input type="text" id="title" name="title" placeholder="Ramen Noodles" required={true} />
            </TitleInputGroup>
            <CategoryInputGroup categories={categories} />
            <AmountInputGroup>
              <label htmlFor="amount">Amount</label>
              <AmountInput id="amount" name="amount" placeholder="$3.78" required={true} />
            </AmountInputGroup>
            <TypeInputGroup />
            <NotesInputGroup>
              <label htmlFor="notes">Notes</label>
              <textarea id="notes" name="notes" placeholder="Brianna is my love so I bought her something nice" />
            </NotesInputGroup>
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </ItemFormWrapper>
      </>
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
