import { Button, Grid } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { TaskSectionView } from './taskSidePageView/TaskSectionView';
import {
  RoadmapBodyGridContainer,
  RoadmapItemGridWrapper,
} from './RoadmapBodyStyle';
import { RoadmapItem } from './roadmapItem/RoadmapItem';
import { TaskSidePageView } from './taskSidePageView/TaskSidePageView';

type ItemType = {
  id: string;
  title: string;
};

export function RoadmapBody() {
  const [itemList, setItemList] = useState<ItemType[]>([]);

  const onAddClick = (index: number) => {
    setItemList((itemList) => {
      return [
        ...itemList.slice(0, index + 1),
        ...[{ title: 'new item', id: nanoid() }],
        ...itemList.slice(index + 1),
      ];
    });
  };

  const onTitleChange = (index: number, newTitle: string) => {
    setItemList((itemList) => {
      return [
        ...itemList.slice(0, index),
        ...[{ ...itemList[index], title: newTitle }],
        ...itemList.slice(index + 1),
      ];
    });
  };

  const onItemDelete = (index: number) => {
    setItemList((temp) => {
      return [...temp.slice(0, index), ...temp.slice(index + 1)];
    });
  };

  return (
    <RoadmapBodyGridContainer container>
      <RoadmapItemGridWrapper item xs={4}>
        {itemList.length === 0 && (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => onAddClick(0)}
          >
            Add you first item
          </Button>
        )}
        {itemList.map((item, index) => {
          return (
            <RoadmapItem
              key={item.id}
              title={item.title}
              onAddClick={() => onAddClick(index)}
              onTitleChange={(newTitle: string) => {
                onTitleChange(index, newTitle);
              }}
              onItemDelete={() => onItemDelete(index)}
            />
          );
        })}
      </RoadmapItemGridWrapper>
      <Grid item xs>
        <TaskSidePageView />
      </Grid>
    </RoadmapBodyGridContainer>
  );
}
