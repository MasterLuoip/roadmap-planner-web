import { fireEvent, getByRole, render, screen } from '@testing-library/react';
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
    fireEvent.change(nameInputs[0], { target: { value: '' } });
    expect(nameInputs[0]).toHaveValue('');
    userEvent.type(nameInputs[0], 'this is a new task');
    expect(nameInputs[0]).toHaveValue('this is a new task');
  });

  test('change markdown text', async () => {
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
    const mdEditor = screen.getAllByRole('textbox')[1];
    fireEvent.change(mdEditor, { target: { value: '' } });
    expect(mdEditor).toHaveValue('');
    userEvent.type(mdEditor, 'this is a new markdown content');
    expect(mdEditor).toHaveValue('this is a new markdown content');
  });

  test('add new test', async () => {
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
    const addIcon = screen.getByTestId('TaskSectionView-taskAddIcon');
    const textBoxNo = screen.getAllByRole('textbox').length;
    userEvent.click(addIcon);
    expect(screen.getAllByRole('textbox').length).toBe(textBoxNo + 1);
  });
});
