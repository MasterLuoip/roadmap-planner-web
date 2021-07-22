import { Button, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import {
  TaskSectionView
} from './taskSectionView/TaskSectionView';
import { TaskSidePageViewWrapper } from './TaskSidePageViewStyle';

const mockSections = {
  '1': {
    id: '1',
    tasks: [
      { completed: false, label: 'zhuzhu' },
      { completed: true, label: 'human' },
    ],
    text: 'I love you',
  },
  '2': {
    id: '2',
    tasks: [
      { completed: false, label: 'aaaa' },
      { completed: true, label: 'humbbban' },
    ],
    text: 'I hate you',
  },
};

export function TaskSidePageView(): JSX.Element {
  const [sections, setSetions] = useState(mockSections);
  const onTaskCheck = (
    value: boolean,
    taskIndex: number,
    sectionId: string
  ) => {
    setSetions((sections) => {
      const copied = JSON.parse(JSON.stringify(sections));
      copied[sectionId].tasks[taskIndex].completed = value;
      return copied;
    });
  };

  const onTextChange = (text: string, id: string) => {
    setSetions((sections) => {
      const copied = JSON.parse(JSON.stringify(sections));
      copied[id].text = text;
      return copied;
    });
  };
  return (
    <TaskSidePageViewWrapper>
      {Object.values(sections).map(({ id, tasks, text }, index) => (
        <React.Fragment key={id}>
          <Divider />
          <TaskSectionView
            tasks={tasks}
            text={text}
            onTaskCheck={(value: boolean, taskIndex: number) =>
              onTaskCheck(value, taskIndex, id)
            }
            onTextChange={(text) => onTextChange(text, id)}
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
