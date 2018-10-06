export type SubmitEvent = {
  preventDefault: void => void,
  currentTarget: {
    elements: any,
    // Would be this, but for the iterator thing
    // { [key: string]: { value: string } }
  },
}
