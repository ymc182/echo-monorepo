import { render } from '@testing-library/react';

import NearProvider from './near-provider';

describe('NearProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <NearProvider>
        <div />
      </NearProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
