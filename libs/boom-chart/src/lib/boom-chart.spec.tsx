import { render } from '@testing-library/react';

import BoomChart from './boom-chart';

describe('BoomChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoomChart />);
    expect(baseElement).toBeTruthy();
  });
});
