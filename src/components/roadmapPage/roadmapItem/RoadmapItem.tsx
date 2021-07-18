import { IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import React, { useEffect, useState } from 'react';
import {
  ActionWrapper,
  CardDivider,
  CompleteStatusText,
  ItemTitle,
  RoadmapItemWrapper,
  TitleWrapper,
} from './RoadmapItemStyle';

export type RoadmapItemType = {
  title: string;
  onAddClick: () => void;
  onTitleChange: (newTitle: string) => void;
};
export function RoadmapItem({
  title,
  onAddClick,
  onTitleChange,
}: RoadmapItemType) {
  const [isHoverd, setIsHoverd] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    onTitleChange(localTitle);
  }, [localTitle]);
  return (
    <RoadmapItemWrapper
      onMouseOver={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <TitleWrapper>
        {isEdit ? (
          <TextField
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setIsEdit(false)}
          />
        ) : (
          <ItemTitle variant='h6'>{title}</ItemTitle>
        )}
      </TitleWrapper>
      <CardDivider />

      <ActionWrapper>
        <CompleteStatusText variant='subtitle2'>
          completed: 100%
        </CompleteStatusText>
        {isHoverd && (
          <>
            <IconButton
              size='small'
              component='span'
              onClick={() => setIsEdit(true)}
            >
              <CreateIcon style={{ color: 'grey' }} />
            </IconButton>
            <IconButton size='small' component='span' onClick={onAddClick}>
              <AddIcon style={{ color: 'green' }} />
            </IconButton>
            <IconButton size='small' component='span'>
              <CloseIcon style={{ color: 'red' }} />
            </IconButton>
          </>
        )}
      </ActionWrapper>
    </RoadmapItemWrapper>
  );
}
