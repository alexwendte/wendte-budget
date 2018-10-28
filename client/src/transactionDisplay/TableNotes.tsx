// @flow

import TextArea from 'components/TextArea'
import * as React from 'react'
import styled from 'styled-components'
import { media } from 'utils/mixins'

interface IProps {
  notes?: string
  readOnly?: boolean
  expanded: boolean
}

const TableNotes = ({ readOnly, notes, expanded, ...rest }: IProps) => (
  <React.Fragment>
    {notes && (
      <ExpandButton data-testid="expand-button" className={readOnly ? '' : 'editable'}>
        &#9660;
      </ExpandButton>
    )}
    {expanded && notes && <Notes value={notes} readOnly={readOnly} {...rest} />}
  </React.Fragment>
)

TableNotes.defaultProps = {
  notes: undefined,
  readOnly: false,
}

export default TableNotes

const Notes = styled(TextArea)`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
  padding: 1rem 2rem;
  grid-column: 1 / -1;
  grid-row: 2;
  margin: 1rem -2rem -2.5rem;
  font-size: 1.5rem;
  width: unset;
  height: 100%;
  ${media.tabletLand`
    grid-row: unset;
  `};
`

const ExpandButton = styled.button`
  color: white;
  background: none;
  border-radius: 30px;
  border: none;
  padding: 0;
  grid-column: -2;
  &.editable {
    grid-column: -3;
  }
  &:hover {
    cursor: pointer;
  }

  ${media.tabletPort`
  grid-row: 2;
  grid-column: 4;
  `};
`
