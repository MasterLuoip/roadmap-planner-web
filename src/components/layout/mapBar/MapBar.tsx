import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  addNewRoadmap,
  changeRoadMapName,
  deleteARoadMap,
  selectActiveRoadmap,
  setActiveRoadmap,
} from '../../roadmapPage/roadmapSlice/roadmapSlice';
import MapBardCard from './MapBarCard/MapBarCard';
import {
  cardBackgroundStyle,
  DropButton,
  MapBarWrapper,
  NavigationCard,
  NavigationWrapper,
} from './MapBarStyle';

export function MapBar(): JSX.Element {
  const localMapList = useSelector((state: RootState) => {
    return state.roadmap.roadmapList;
  });
  const activeRoadmap = useSelector(selectActiveRoadmap);
  const [showMapBar, setShowMapBar] = useState(false);
  const dispatch = useDispatch();

  const onNewRoadmapClick = () => {
    dispatch(
      addNewRoadmap({ id: nanoid(), title: 'new roadmap', stages: [] })
    );
  };
  const onMapItemClick = (id: string) => {
    const activeItem = localMapList.find((item) => item.id === id);
    if (typeof activeItem === 'object') dispatch(setActiveRoadmap(activeItem));
  };

  const deleteMap = (id: string) => {
    dispatch(deleteARoadMap(id));
  };

  return (
    <MapBarWrapper>
      {showMapBar && (
        <NavigationWrapper>
          <NavigationCard
            $backgroundStyle={cardBackgroundStyle.newItem}
            onClick={onNewRoadmapClick}
            style={{ minWidth: '40px', width: '40px' }}
          >
            +
          </NavigationCard>
          {localMapList
            .slice()
            .reverse()
            .map((map, index) => (
              <MapBardCard
                key={map.id}
                title={map.title}
                isActive={activeRoadmap !== null && activeRoadmap.id === map.id}
                onMapClick={() => onMapItemClick(map.id)}
                onDelete={() => deleteMap(map.id)}
                onTitleChange={(newTitle) =>
                  dispatch(changeRoadMapName({ id: map.id, title: newTitle }))
                }
              />
            ))}
        </NavigationWrapper>
      )}
      <DropButton onClick={() => setShowMapBar(!showMapBar)}>
        {showMapBar ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
      </DropButton>
    </MapBarWrapper>
  );
}
