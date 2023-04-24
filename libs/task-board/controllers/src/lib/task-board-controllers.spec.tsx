import { render } from '@testing-library/react';

import TaskBoardControllers from './task-board-controllers';

describe('TaskBoardControllers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskBoardControllers />);
    expect(baseElement).toBeTruthy();
  });
});
