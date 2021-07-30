import { Button } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  RoadmapBodyGridContainer,
  RoadmapItemGridWrapper,
  SideGrid,
} from './RoadmapBodyStyle';
import { RoadmapItem } from './roadmapItem/RoadmapItem';
import {
  TaskSection,
  TaskSidePageView,
} from './taskSidePageView/TaskSidePageView';

export type ItemType = {
  id: string;
  title: string;
  taskSections: TaskSection[];
};

export function RoadmapBody({
  roadmapItemList,
  updateRoadmapItemList,
}: {
  roadmapItemList: ItemType[];
  updateRoadmapItemList: (newItemList: ItemType[]) => void;
}) {
  const [itemList, setItemList] = useState<ItemType[]>(roadmapItemList);
  // const [isSidePageShowed, setIsSidePageShowed] = useState(false);
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);

  useEffect(() => {
    if (
      itemList.length !== roadmapItemList.length ||
      itemList.every((i, index) => roadmapItemList[index].id)
    ) {
      setItemList(roadmapItemList);
    }
  }, [roadmapItemList]);

  useEffect(() => {
    updateRoadmapItemList(itemList);
  }, [itemList]);
  const onSidePageClose = () => {
    setActiveItem(null);
  };

  const setTaskSections = (id: string, sections: TaskSection[]) => {
    setItemList((itemList) =>
      itemList.filter((item) => {
        item.taskSections = item.id === id ? sections : item.taskSections;
        return item;
      })
    );
  };

  const onAddClick = (index: number) => {
    setItemList((itemList) => {
      return [
        ...itemList.slice(0, index + 1),
        ...[
          {
            title: 'new item',
            id: nanoid(),
            taskSections: [],
          },
        ],
        ...itemList.slice(index + 1),
      ];
    });
  };

  const onTitleChange = (id: string, newTitle: string) => {
    setItemList((itemList) => {
      return itemList.map((item) => {
        item.title = id === item.id ? newTitle : item.title;
        return item;
      });
    });
  };

  const onItemDelete = (id: string) => {
    if (activeItem && id === activeItem.id) {
      setActiveItem(null);
    }
    setItemList((itemList) => {
      return itemList.filter((item) => item.id !== id);
    });
  };

  const onItemClick = (item: ItemType) => {
    console.log(activeItem);
    console.log(itemList);
    setActiveItem(item);
  };

  return (
    <RoadmapBodyGridContainer container>
      <RoadmapItemGridWrapper item xs>
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
              onClick={() => onItemClick(item)}
              onAddClick={() => onAddClick(index)}
              onTitleChange={(newTitle: string) => {
                onTitleChange(item.id, newTitle);
              }}
              onItemDelete={() => onItemDelete(item.id)}
            />
          );
        })}
      </RoadmapItemGridWrapper>
      {activeItem !== null && (
        <SideGrid item xs={8}>
          <TaskSidePageView
            onSidePageClose={onSidePageClose}
            taskSections={activeItem.taskSections}
            title={activeItem.title}
            setTaskSections={(newSections: TaskSection[]) =>
              setTaskSections(activeItem.id, newSections)
            }
          />
        </SideGrid>
      )}
    </RoadmapBodyGridContainer>
  );
}
