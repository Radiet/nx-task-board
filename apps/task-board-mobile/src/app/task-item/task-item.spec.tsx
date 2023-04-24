import React from 'react';
import { render } from '@testing-library/react-native';

import TaskItem from './task-item';

describe('TaskItem', () => {
  it('should render successfully', () => {
    const { container } = render(<TaskItem />);
    expect(container).toBeTruthy();
  });
});
