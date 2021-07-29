import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import useCurdArrayWithItemId, {
  AddPosition,
} from '../../../utils/customHooks/useCurdArrayWithItemId';
import {
  DropButton,
  MapBarWrapper,
  NavigationCard,
  NavigationWrapper,
} from './MapBarStyle';

type SingleItemType = {
  id: string;
  title: string;
};

type MapBarType = {
  mapList: SingleItemType[];
};
export function MapBar({ mapList }: MapBarType): JSX.Element {
  const {
    target: localMapList,
    addItem,
    changeItemById,
    removeItemById,
  } = useCurdArrayWithItemId<SingleItemType>(mapList);
  const onNewRoadmapClick = () => {
    addItem({ id: nanoid(), title: 'new roadmap' }, AddPosition.end);
  };
  return (
    <MapBarWrapper>
      <NavigationWrapper>
        {localMapList.map((map, index) => (
          <NavigationCard>
            <Typography variant='h5' key={index}>
              {map.title}
            </Typography>
          </NavigationCard>
        ))}
        <NavigationCard onClick={onNewRoadmapClick}>Add new one</NavigationCard>
      </NavigationWrapper>
      <DropButton>
        <ExpandMoreIcon />
      </DropButton>
    </MapBarWrapper>
  );
}
