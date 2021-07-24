import { Button, Divider, IconButton } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { TaskSectionView } from './taskSectionView/TaskSectionView';
import { TaskSidePageViewWrapper } from './TaskSidePageViewStyle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

export function TaskSidePageView({
  onSidePageClose,
}: {
  onSidePageClose: () => void;
}): JSX.Element {
  const [sections, setSetions] = useState(mockSections);

  const onSectionChange = (id: string, newSection: Omit<TaskSection, 'id'>) => {
    setSetions({ ...sections, [id]: { ...newSection, id } });
  };

  const onSectionAdd = () => {
    const newId = nanoid();
    setSetions({
      ...sections,
      [newId]: {
        id: newId,
        tasks: [],
        text: 'I am new',
      },
    });
  };

  const onSectionDelete = (id: string) => {
    setSetions((sections) => {
      const copied = { ...sections };
      delete copied[id];
      return copied;
    });
  };

  return (
    <TaskSidePageViewWrapper>
      <IconButton onClick={onSidePageClose} style={{ marginLeft: '-20px' }}>
        <ArrowBackIcon />
      </IconButton>
      {Object.values(sections).map((section, index) => (
        <React.Fragment key={section.id}>
          <Divider />
          <TaskSectionView
            section={{ text: section.text, tasks: section.tasks }}
            onSectionChange={(newSection: Omit<TaskSection, 'id'>) =>
              onSectionChange(section.id, newSection)
            }
            onSectionDelete={() => onSectionDelete(section.id)}
          />
        </React.Fragment>
      ))}
      <Divider />
      <Button
        variant='outlined'
        style={{ marginTop: '30px' }}
        onClick={onSectionAdd}
      >
        Add new section
      </Button>
    </TaskSidePageViewWrapper>
  );
}
