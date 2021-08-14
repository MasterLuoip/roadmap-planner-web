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
import RoadmapItem from './roadmapItem/RoadmapItem';
import { StageSection } from './taskSidePageView/TaskSidePageView';

export type StageType = {
  id: string;
  title: string;
  sections: StageSection[];
};

export function RoadmapBody() {
  const roadmapItemList = useSelector(selectActiveRoadmap);
  const itemList = roadmapItemList ? roadmapItemList.stages : null;

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
          sections: [],
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

  const onItemClick = (item: StageType) => {
    dispatch(setActiveRoadmapItem(item));
  };
  return (
    <RoadmapBodyGridContainer container direction='column' alignItems='center'>
      {Array.isArray(itemList) ? (
        itemList.length === 0 ? (
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
        )
      ) : (
        <div>Please create or select a roadmap to start</div>
      )}
    </RoadmapBodyGridContainer>
  );
}
