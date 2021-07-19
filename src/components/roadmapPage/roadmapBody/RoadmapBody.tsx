import React, { useState } from 'react';
import { RoadmapItem } from '../roadmapItem/RoadmapItem';
import { RoadmapBodyWrapper, RoadmapItemWrapper } from './RoadmapBodyStyle';
import { nanoid } from 'nanoid';

type ItemType = {
  id: string;
  title: string;
};

export function RoadmapBody() {
  const [itemList, setItemList] = useState<ItemType[]>([
    { id: nanoid(), title: 'create your first item' },
  ]);

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
    <RoadmapBodyWrapper>
      <RoadmapItemWrapper>
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
      </RoadmapItemWrapper>
    </RoadmapBodyWrapper>
  );
}
