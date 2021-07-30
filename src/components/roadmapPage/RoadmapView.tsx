import { nanoid } from 'nanoid';
import React from 'react';
import { useState } from 'react';
import useCurdArrayWithItemId from '../../utils/customHooks/useCurdArrayWithItemId';
import { MapBar } from '../layout/mapBar/MapBar';
import { TopBar } from '../layout/topBar/TopBar';
import { ItemType, RoadmapBody } from './roadmapBody/RoadmapBody';

export type RoadmapType = {
  id: string;
  title: string;
  itemList: ItemType[];
};
export function RoadmapView(): JSX.Element {
  const { target, setTarget } = useCurdArrayWithItemId<RoadmapType>([
    {
      id: nanoid(),
      title: 'defaultItem',
      itemList: [],
    },
  ]);
  const [activeTarget, setActiveTarget] = useState(target[0]);
  const updateNewTarget = (newTarget: RoadmapType[]) => {
    setTarget(newTarget);
  };
  const updateRoadmapItemList = (id: string, newItemList: ItemType[]) => {
    setTarget((target) => {
      return target.map((t) => {
        t.itemList = t.id === id ? newItemList : t.itemList;
        return t;
      });
    });
  };
  return (
    <>
      <TopBar />
      <MapBar
        mapList={target}
        onMapItemClick={(id: string) => {
          const item = target.find((i) => i.id === id);
          if (item === undefined) return;
          setActiveTarget(item);
        }}
        updateNewTarget={updateNewTarget}
      />
      <RoadmapBody
        roadmapItemList={activeTarget.itemList}
        updateRoadmapItemList={(newItemList: ItemType[]) =>
          updateRoadmapItemList(activeTarget.id, newItemList)
        }
      />
    </>
  );
}
