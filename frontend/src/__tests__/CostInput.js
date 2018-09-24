import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import CostInput from '../CostInput';

afterEach(cleanup);

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const utils = render(<CostInput {...props} />);

  return {
    props,
    ...utils,
  };
};

describe('interaction', () => {
  it('does not allow user to enter letters', () => {
    const { getByLabelText } = setup();
    const costInput = getByLabelText('cost');
    expect(costInput.value).toEqual('');
    fireEvent.change(costInput, { target: { value: 'f' } });
    expect(costInput.value).toBe('');
  });
  it('keeps a $ in front of user input', async () => {
    const { getByLabelText } = setup();
    const costInput = getByLabelText('cost');
    fireEvent.change(costInput, { target: { value: '1' } });
    expect(costInput.value).toBe('$1');
  });
});
