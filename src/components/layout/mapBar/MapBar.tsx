import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import useCurdArrayWithItemId, {
  AddPosition,
} from '../../../utils/customHooks/useCurdArrayWithItemId';
import { RoadmapType } from '../../roadmapPage/RoadmapView';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
  cardBackgroundStyle,
  DropButton,
  MapBarWrapper,
  NavigationCard,
  NavigationWrapper,
} from './MapBarStyle';

type MapBarType = {
  mapList: RoadmapType[];
  onMapItemClick: (index: string) => void;
  updateNewTarget: (newTarget: RoadmapType[]) => void;
};
export function MapBar({
  mapList,
  onMapItemClick,
  updateNewTarget,
}: MapBarType): JSX.Element {
  const {
    target: localMapList,
    addItem,
    changeItemById,
    removeItemById,
  } = useCurdArrayWithItemId<RoadmapType>(mapList);
  const [activeId, setActiveId] = useState<string | null>(localMapList[0].id);
  const [showMapBar, setShowMapBar] = useState(false);
  useEffect(() => {
    updateNewTarget(localMapList);
  }, [localMapList]);

  const onNewRoadmapClick = () => {
    addItem(
      { id: nanoid(), title: 'new roadmap', itemList: [] },
      AddPosition.end
    );
  };

  return (
    <MapBarWrapper>
      {showMapBar && (
        <NavigationWrapper>
          {localMapList.map((map, index) => (
            <NavigationCard
              onClick={() => {
                onMapItemClick(map.id);
                setActiveId(map.id);
              }}
              backgroundStyle={
                activeId === map.id
                  ? cardBackgroundStyle.selected
                  : cardBackgroundStyle.unselected
              }
            >
              <Typography variant='h5' key={index}>
                {map.title}
              </Typography>
            </NavigationCard>
          ))}
          <NavigationCard
            backgroundStyle={cardBackgroundStyle.newItem}
            onClick={onNewRoadmapClick}
          >
            Add new one
          </NavigationCard>
        </NavigationWrapper>
      )}
      <DropButton onClick={() => setShowMapBar(!showMapBar)}>
        {showMapBar ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
      </DropButton>
    </MapBarWrapper>
  );
}
