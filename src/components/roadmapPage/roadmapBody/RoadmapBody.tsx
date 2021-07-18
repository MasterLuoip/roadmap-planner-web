import React, { useState } from 'react';
import { RoadmapItem } from '../roadmapItem/RoadmapItem';
import { RoadmapBodyWrapper, RoadmapItemWrapper } from './RoadmapBodyStyle';

export function RoadmapBody() {
  const [itemList, setItemList] = useState<{ title: string }[]>([
    { title: 'create your first item' },
  ]);

  const onAddClick = () => {
    setItemList((itemList) => {
      return [...itemList, { title: 'create your first item' }];
    });
  };

  const onTitleChange = (index: number, newTitle: string) => {
    setItemList((itemList) => {
      return itemList.splice(index, 1, { ...itemList[index], title: newTitle });
    });
  };

  return (
    <RoadmapBodyWrapper>
      <RoadmapItemWrapper>
        {itemList.map((item, index) => {
          return (
            <RoadmapItem
              key={index}
              title={item.title}
              onAddClick={onAddClick}
              onTitleChange={(newTitle: string) => {
                onTitleChange(index, newTitle);
              }}
            />
          );
        })}
      </RoadmapItemWrapper>
    </RoadmapBodyWrapper>
  );
}
