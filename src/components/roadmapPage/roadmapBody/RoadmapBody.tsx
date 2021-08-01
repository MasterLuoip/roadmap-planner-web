import { Button } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  addNewItemToItemList,
  changeItemListSingleItemName,
  deleteItemInItemList,
  selectActiveRoadmapItem,
  setActiveRoadmapItem,
} from '../../../feature/roadmap/roadmapSlice';
import { RoadmapBodyGridContainer } from './RoadmapBodyStyle';
import { RoadmapItem } from './roadmapItem/RoadmapItem';
import { TaskSection } from './taskSidePageView/TaskSidePageView';

export type ItemType = {
  id: string;
  title: string;
  taskSections: TaskSection[];
};

export function RoadmapBody({}: {}) {
  const roadmapItemList = useSelector(selectActiveRoadmapItem);
  const itemList = roadmapItemList ? roadmapItemList.itemList : [];

  // const [itemList, setItemList] = useState<ItemType[]>(
  //   roadmapItemList?.itemList
  // );
  const activeItem = useSelector(
    (state: RootState) => state.roadmap.activeRoadmapItem
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (
  //     itemList.length !== roadmapItemList.length ||
  //     itemList.every((i, index) => roadmapItemList[index].id === i.id)
  //   ) {
  //     setItemList(roadmapItemList);
  //   }
  // }, [roadmapItemList]);

  // useEffect(() => {
  //   updateRoadmapItemList(itemList);
  // }, [itemList]);

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
    // setItemList((itemList) => {
    //   return [
    //     ...itemList.slice(0, index + 1),
    //     ...[
    //       {
    //         title: 'new item',
    //         id: nanoid(),
    //         taskSections: [],
    //       },
    //     ],
    //     ...itemList.slice(index + 1),
    //   ];
    // });
  };

  const onTitleChange = (id: string, newTitle: string) => {
    dispatch(changeItemListSingleItemName({ newTitle, id }));
    // setItemList((itemList) => {
    //   return itemList.map((item) => {
    //     item.title = id === item.id ? newTitle : item.title;
    //     return item;
    //   });
    // });
  };

  const onItemDelete = (id: string) => {
    if (activeItem && id === activeItem.id) {
      dispatch(setActiveRoadmapItem(null));
    }
    dispatch(deleteItemInItemList({ id }));
    // setItemList((itemList) => {
    //   return itemList.filter((item) => item.id !== id);
    // });
  };

  const onItemClick = (item: ItemType) => {
    dispatch(setActiveRoadmapItem(item));
  };
  return (
    <RoadmapBodyGridContainer container>
      {itemList.length === 0 && (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => onAddClick()}
        >
          Add you first item
        </Button>
      )}
      {itemList.map((item, index) => {
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
      })}
    </RoadmapBodyGridContainer>
  );
}
