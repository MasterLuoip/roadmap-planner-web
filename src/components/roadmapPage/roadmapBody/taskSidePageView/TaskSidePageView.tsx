import { Button, Divider } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { TaskSectionView } from './taskSectionView/TaskSectionView';
import { TaskSidePageViewWrapper } from './TaskSidePageViewStyle';

export type TaskSection = {
  id: string;
  tasks: {
    id: string;
    completed: boolean;
    label: string;
  }[];
  text: string;
};
const newId = nanoid();
const mockSections = {
  [newId]: {
    id: newId,
    tasks: [
      { id: nanoid(), completed: false, label: 'zhuzhu' },
      { id: nanoid(), completed: true, label: 'human' },
    ],
    text: 'I love you',
  },
};

export function TaskSidePageView(): JSX.Element {
  const [sections, setSetions] = useState(mockSections);

  const onSectionChange = (id: string, newSection: Omit<TaskSection, 'id'>) => {
    setSetions({ ...sections, [id]: { ...newSection, id } });
  };

  return (
    <TaskSidePageViewWrapper>
      {Object.values(sections).map((section, index) => (
        <React.Fragment key={section.id}>
          <Divider />
          <TaskSectionView
            section={{ text: section.text, tasks: section.tasks }}
            onSectionChange={(newSection: Omit<TaskSection, 'id'>) =>
              onSectionChange(section.id, newSection)
            }
          />
        </React.Fragment>
      ))}
      <Divider />
      <Button variant='outlined' style={{ marginTop: '30px' }}>
        Add new section
      </Button>
    </TaskSidePageViewWrapper>
  );
}
