import { render, screen } from '@testing-library/react';
import App from '../../../../App';
import RoadmapItem from './RoadmapItem';
import React from 'react';

describe('Test roadmapItem', () => {
  test('RoadmapItem', async () => {
    render(<RoadmapItem />);
    render(<App />);
    const { getByLabelText } = render(<RoadmapItem />);
  });
});
