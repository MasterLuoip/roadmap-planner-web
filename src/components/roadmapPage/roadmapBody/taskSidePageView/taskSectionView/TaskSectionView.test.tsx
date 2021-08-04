import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskSectionView } from './TaskSectionView';

const taskSection = {
  tasks: [
    {
      id: '11',
      completed: false,
      label: 'first task',
    },
  ],
  text: 'md text',
};
describe('TaskSectionView', () => {
  test('check static elements', () => {
    const onSectionChange = jest.fn();
    const onSectionDelete = jest.fn();
    render(
      <TaskSectionView
        section={taskSection}
        onSectionChange={onSectionChange}
        onSectionDelete={onSectionDelete}
      />
    );

    expect(screen.getByText('md text')).toBeInTheDocument();
    expect(screen.getByText('first task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('test edit mode', () => {
    const onSectionChange = jest.fn();
    const onSectionDelete = jest.fn();
    render(
      <TaskSectionView
        section={taskSection}
        onSectionChange={onSectionChange}
        onSectionDelete={onSectionDelete}
      />
    );
    userEvent.click(screen.getByTestId('TaskSectionView-editIcon'));

    const deleteTaskBtn = screen.getByTestId('TaskSectionView-deleteTaskBtn');
    expect(deleteTaskBtn).toBeInTheDocument();
    userEvent.click(deleteTaskBtn);
    expect(screen.queryByText('first task')).toBeNull();

    const sectionDeleteBtn = screen.getByText('Delete');
    expect(sectionDeleteBtn).toBeInTheDocument();
    userEvent.click(sectionDeleteBtn);
    expect(onSectionDelete).toHaveBeenCalledTimes(1);

    const saveBtn = screen.getByText('Save');
    expect(saveBtn).toBeInTheDocument();
    userEvent.click(saveBtn);
    expect(screen.queryByText('Save')).toBeNull();
  });

  test('on task check', () => {
    const onSectionChange = jest.fn();
    const onSectionDelete = jest.fn();
    render(
      <TaskSectionView
        section={taskSection}
        onSectionChange={onSectionChange}
        onSectionDelete={onSectionDelete}
      />
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('on task name change', async () => {
    const onSectionChange = jest.fn();
    const onSectionDelete = jest.fn();
    render(
      <TaskSectionView
        section={taskSection}
        onSectionChange={onSectionChange}
        onSectionDelete={onSectionDelete}
      />
    );
    userEvent.click(screen.getByTestId('TaskSectionView-editIcon'));
    const nameInputs = screen.getAllByRole('textbox');
    (nameInputs[0] as HTMLInputElement).value = '123';
    screen.debug(nameInputs[0]);
    expect(nameInputs[0]).toHaveValue('');
    userEvent.type(nameInputs[0], 'this is a new task');
    expect(screen.getByText('this is a new task')).toBeInTheDocument();
  });
});
