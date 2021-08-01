import { Button, Divider, IconButton } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { TaskSectionView } from './taskSectionView/TaskSectionView';
import { TaskSidePageViewWrapper } from './TaskSidePageViewStyle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import {
  setActiveRoadmapItem,
  setActiveRoadmapItemTaskSection,
} from '../../../../feature/roadmap/roadmapSlice';

export type TaskSection = {
  id: string;
  tasks: {
    id: string;
    completed: boolean;
    label: string;
  }[];
  text: string;
};

export function TaskSidePageView(): JSX.Element {
  const sectionsFromStore = useSelector((state: RootState) =>
    state.roadmap.activeRoadmapItem
      ? state.roadmap.activeRoadmapItem.taskSections
      : []
  );
  const activeItemTitle = useSelector((state: RootState) =>
    state.roadmap.activeRoadmapItem ? state.roadmap.activeRoadmapItem.title : ''
  );
  const [sections, setSections] = useState<TaskSection[]>(sectionsFromStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // this useEffect needs deep comparision.
    // because setTaksSection(sections) will create a new array.
    // this reflects in the prop taskSection from parent component.
    // if no deep comparision, will cause a infinity loop
    if (
      sectionsFromStore.length !== sections.length &&
      sections[0]?.id !== sectionsFromStore[0]?.id
    ) {
      setSections(sectionsFromStore);
    }
  }, [sectionsFromStore]);

  useEffect(() => {
    dispatch(setActiveRoadmapItemTaskSection(sections));
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
    dispatch(setActiveRoadmapItem(null));
  };

  return (
    <TaskSidePageViewWrapper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={(e) => onBackClick(e)}
          style={{ marginLeft: '-20px' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <h4>{activeItemTitle}</h4>
      </div>
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
