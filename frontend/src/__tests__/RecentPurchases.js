import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RecentPurchases from '../RecentPurchases';

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
  it('Renders <RecentPurchases/>', () => {
    render(<RecentPurchases />);
  });
});

describe('interaction', () => {});

describe('lifecycle', () => {});
