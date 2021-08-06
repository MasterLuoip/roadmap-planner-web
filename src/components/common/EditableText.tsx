import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { ItemTitle } from '../roadmapPage/roadmapBody/roadmapItem/RoadmapItemStyle';

type EditableTextProps = {
  title: string;
  isTitleShowed: boolean;
  onTitleChange: (newTitle: string) => void;
  onEnterPress: () => void;
};

export default function EditableText({
  title,
  isTitleShowed,
  onTitleChange,
  onEnterPress,
}: EditableTextProps) {
  const [localTitle, setLocalTitle] = useState(title);
  return (
    <>
      <div>
        {isTitleShowed ? (
          <TextField
            value={localTitle}
            onChange={(e) => {
              setLocalTitle(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onEnterPress();
                onTitleChange(localTitle);
              }
            }}
          />
        ) : (
          <ItemTitle variant='h6'>{localTitle}</ItemTitle>
        )}
      </div>
    </>
  );
}
