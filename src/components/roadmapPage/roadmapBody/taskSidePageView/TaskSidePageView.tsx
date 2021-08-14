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
  setRoadmapItemTaskSection,
} from '../../roadmapSlice/roadmapSlice';

export type StageSection = {
  id: string;
  checkpoints: {
    id: string;
    completed: boolean;
    content: string;
  }[];
  text: string;
};

export function TaskSidePageView(): JSX.Element {
  const sectionsFromStore = useSelector((state: RootState) =>
    state.roadmap.activeRoadmapItem
      ? state.roadmap.activeRoadmapItem.sections
      : []
  );
  const activeItemTitle = useSelector((state: RootState) =>
    state.roadmap.activeRoadmapItem ? state.roadmap.activeRoadmapItem.title : ''
  );
  const [sections, setSections] = useState<StageSection[]>(sectionsFromStore);
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
    dispatch(setRoadmapItemTaskSection(sections));
  }, [sections]);

  const onSectionChange = (
    id: string,
    newSection: Omit<StageSection, 'id'>
  ) => {
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
        checkpoints: [],
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
            section={{ text: section.text, checkpoints: section.checkpoints }}
            onSectionChange={(newSection: Omit<StageSection, 'id'>) =>
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
