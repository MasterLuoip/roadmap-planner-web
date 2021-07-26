import { Button, Divider, IconButton } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { TaskSectionView } from './taskSectionView/TaskSectionView';
import { TaskSidePageViewWrapper } from './TaskSidePageViewStyle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from 'react';

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
  taskSections,
  setTaskSections,
}: {
  onSidePageClose: () => void;
  taskSections: TaskSection[];
  setTaskSections: (newSections: TaskSection[]) => void;
}): JSX.Element {
  const [sections, setSections] = useState<TaskSection[]>(taskSections);

  useEffect(() => {
    // this useEffect needs deep comparision.
    // because setTaksSection(sections) will create a new array.
    // this reflects in the prop taskSection from parent component.
    // if no deep comparision, will cause a infinity loop
    if (
      taskSections.length !== sections.length &&
      sections[0]?.id !== taskSections[0]?.id
    ) {
      setSections(taskSections);
    }
  }, [taskSections]);

  useEffect(() => {
    setTaskSections(sections);
  }, [sections]);

  const onSectionChange = (id: string, newSection: Omit<TaskSection, 'id'>) => {
    setSections((sections) => {
      return sections.map((section) => {
        return section.id === id ? { ...newSection, id } : section;
      });
    });
  };

  const onSectionAdd = () => {
    const newId = nanoid();
    setSections([
      ...sections,
      {
        id: newId,
        tasks: [],
        text: 'I am new',
      },
    ]);
  };

  const onSectionDelete = (id: string) => {
    setSections((sections) => sections.filter((s) => s.id !== id));
  };

  const onBackClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onSidePageClose();
  };

  return (
    <TaskSidePageViewWrapper>
      <IconButton
        onClick={(e) => onBackClick(e)}
        style={{ marginLeft: '-20px' }}
      >
        <ArrowBackIcon />
      </IconButton>
      {sections.map((section) => (
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
