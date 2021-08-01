import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  addNewRoadmap,
  selectActiveRoadmapItem,
  setActiveRoadmap,
} from '../../../feature/roadmap/roadmapSlice';
import useCurdArrayWithItemId from '../../../utils/customHooks/useCurdArrayWithItemId';
import { RoadmapType } from '../../roadmapPage/RoadmapView';
import {
  cardBackgroundStyle,
  DropButton,
  MapBarWrapper,
  NavigationCard,
  NavigationWrapper,
} from './MapBarStyle';

type MapBarType = {};
export function MapBar(): JSX.Element {
  const localMapList = useSelector((state: RootState) => {
    return state.roadmap.roadmapList;
  });
  // const { target: localMapList } = useCurdArrayWithItemId<RoadmapType>(mapList);
  // const [activeId, setActiveId] = useState<string | null>(localMapList[0].id);
  const activeRoadmap = useSelector(selectActiveRoadmapItem);
  const [showMapBar, setShowMapBar] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   updateNewTarget(localMapList);
  // }, [localMapList]);

  const onNewRoadmapClick = () => {
    // addItem(
    //   { id: nanoid(), title: 'new roadmap', itemList: [] },
    //   AddPosition.end
    // );
    dispatch(
      addNewRoadmap({ id: nanoid(), title: 'new roadmap', itemList: [] })
    );
  };

  const onMapItemClick = (id: string) => {
    const activeItem = localMapList.find((item) => item.id === id);
    if (typeof activeItem === 'object') dispatch(setActiveRoadmap(activeItem));
  };

  return (
    <MapBarWrapper>
      {showMapBar && (
        <NavigationWrapper>
          {localMapList.map((map, index) => (
            <NavigationCard
              key={map.id}
              onClick={() => {
                onMapItemClick(map.id);
              }}
              backgroundStyle={
                activeRoadmap?.id === map.id
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
