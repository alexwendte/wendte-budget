import React from 'react';
import { render, cleanup } from 'react-testing-library';
import BudgetItem from '../BudgetItem';

afterEach(cleanup);

const setup = propOverrides => {
  const props = Object.assign(
    {
      posts: {},
      month: {},
      pics: {},
    },
    propOverrides
  );

  return {
    props,
  };
};

describe('rendering', () => {
  it('Renders <BudgetItem/>', () => {
    render(<BudgetItem />);
  });
});

describe('interaction', () => {});

describe('lifecycle', () => {});
