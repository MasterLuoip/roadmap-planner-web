import { render, screen } from '@testing-library/react';
import App from '../../../../App';
import RoadmapItem from './RoadmapItem';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Test roadmapItem', () => {
  test('RoadmapItem', async () => {
    const onClick = jest.fn();
    const onAddClick = jest.fn();
    const onItemDelete = jest.fn();
    const onTitleChange = jest.fn();

    render(
      <RoadmapItem
        title='test title'
        onAddClick={onAddClick}
        onClick={onClick}
        onItemDelete={onItemDelete}
        onTitleChange={onTitleChange}
      />
    );
    expect(screen.getByText('test title')).toBeInTheDocument();
    userEvent.click(screen.getByText('test title'));
    expect(onClick).toHaveBeenCalledTimes(1);

    const editIcon = screen.getByTestId('roadmapItem-editIcon');
    expect(editIcon).toBeInTheDocument();
    userEvent.click(editIcon);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    const addIcon = screen.getByTestId('roadmapItem-addIcon');
    expect(addIcon).toBeInTheDocument();
    userEvent.click(addIcon);
    expect(onAddClick).toHaveBeenCalledTimes(1);

    const deleteIcon = screen.getByTestId('roadmapItem-deleteIcon');
    expect(deleteIcon).toBeInTheDocument();
    userEvent.click(deleteIcon);
    expect(onItemDelete).toHaveBeenCalledTimes(1);
  });
});
