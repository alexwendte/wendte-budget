import AmountInput from 'components/AmountInput'
import { Button, InputGroup } from 'components/Elements'
import Flash from 'components/Flash'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import TypeInputGroup from 'components/TypeInputGroup'
import * as React from 'react'
import styled from 'styled-components'
import { ITransaction } from 'utils/types'

const EditTransactionModal: React.SFC<ITransaction> = ({ date, title, category, notes }) => {
  const [open] = React.useState(false)
  const [isSubmitted, setSubmitted] = React.useState(false)
  const nowForDateInput = new Date(props.date).toISOString().slice(0, 10)

  return (
    <Modal>
      <ModalWrapper>
        <Header>
          <Heading>Edit Transaction</Heading>
        </Header>
        <Form>
          <Flash
            successMessage={isSubmitted && !error ? 'Transaction altered successfully' : undefined}
            submitted={isSubmitted}
            error={error}
            closeClicked={this.flashClosedClicked}
          />

          <DateGroup>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" defaultValue={nowForDateInput} />
          </DateGroup>
          <TitleGroup>
            <label htmlFor="title">Transaction Title</label>
            <Input type="text" id="title" value={title} />
          </TitleGroup>
          {/* display the category with the current category and get other categories from user (should happen in category input group)*/}
          <Input type="text" id="category" value={category} />
          <AmountGroup>
            <label htmlFor="amount">Amount</label>
            <AmountInput id="amount" name="amount" placeholder="$3.78" required={true} />
          </AmountGroup>
          <TypeInputGroup />
          <NotesGroup>
            <label htmlFor="notes">Notes</label>
            <TextArea id="notes" value={notes} />
          </NotesGroup>
          <DeleteButton type="submit">Delete Transaction</DeleteButton>
          <SubmitButton type="submit">Edit Transaction</SubmitButton>
        </Form>
      </ModalWrapper>
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(53, 64, 65, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalWrapper = styled.div`
  background: ${props => props.theme.lightGray};
  min-width: 70rem;
  min-height: 40rem;
`

const Form = styled.form`
  padding: 0 2rem 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${props => props.theme.primary};
`

const Heading = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.white};
  text-align: center;
`

const TitleGroup = styled(InputGroup)``
const AmountGroup = styled(InputGroup)``
const NotesGroup = styled(InputGroup)``
const DateGroup = styled(InputGroup)``

const DeleteButton = styled(Button)`
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.primary};
`

const SubmitButton = styled(Button)``
