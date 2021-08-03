import { Button } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  addNewItemToItemList,
  changeItemListSingleItemName,
  deleteItemInItemList,
  selectActiveRoadmap,
  setActiveRoadmapItem,
} from '../roadmapSlice/roadmapSlice';
import { RoadmapBodyGridContainer } from './RoadmapBodyStyle';
import { RoadmapItem } from './roadmapItem/RoadmapItem';
import { TaskSection } from './taskSidePageView/TaskSidePageView';

export type ItemType = {
  id: string;
  title: string;
  taskSections: TaskSection[];
};

export function RoadmapBody() {
  const roadmapItemList = useSelector(selectActiveRoadmap);
  const itemList = roadmapItemList ? roadmapItemList.itemList : null;

  const activeItem = useSelector(
    (state: RootState) => state.roadmap.activeRoadmapItem
  );
  const dispatch = useDispatch();

  const onAddClick = (id?: string) => {
    dispatch(
      addNewItemToItemList({
        newItem: {
          title: 'new item',
          id: nanoid(),
          taskSections: [],
        },
        id,
      })
    );
  };

  const onTitleChange = (id: string, newTitle: string) => {
    dispatch(changeItemListSingleItemName({ newTitle, id }));
  };

  const onItemDelete = (id: string) => {
    if (activeItem && id === activeItem.id) {
      dispatch(setActiveRoadmapItem(null));
    }
    dispatch(deleteItemInItemList({ id }));
  };

  const onItemClick = (item: ItemType) => {
    dispatch(setActiveRoadmapItem(item));
  };
  return (
    <RoadmapBodyGridContainer container direction='column' alignItems='center'>
      {itemList === null ? (
        <div>Please create or select a roadmap to start</div>
      ) : itemList.length === 0 ? (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => onAddClick()}
        >
          Add your first item
        </Button>
      ) : (
        itemList.map((item, index) => {
          return (
            <RoadmapItem
              key={item.id}
              title={item.title}
              onClick={() => onItemClick(item)}
              onAddClick={() => onAddClick(item.id)}
              onTitleChange={(newTitle: string) => {
                onTitleChange(item.id, newTitle);
              }}
              onItemDelete={() => onItemDelete(item.id)}
            />
          );
        })
      )}
    </RoadmapBodyGridContainer>
  );
}
