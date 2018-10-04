export type SubmitEvent = {
  preventDefault: void => void,
  currentTarget: {
    elements: { [key: string]: { value: string } },
  },
}
