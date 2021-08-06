import { IconButton, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { stopFuncDefaultPropagation } from '../../../utils/helperFunctions/helpers';
import EditableText from '../../common/EditableText';
import {
  ItemTitle,
  TitleWrapper,
} from '../../roadmapPage/roadmapBody/roadmapItem/RoadmapItemStyle';
import {
  addNewRoadmap,
  changeRoadMapName,
  deleteARoadMap,
  selectActiveRoadmap,
  setActiveRoadmap,
} from '../../roadmapPage/roadmapSlice/roadmapSlice';
import {
  cardBackgroundStyle,
  DropButton,
  MapActionButtonsArea,
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
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [edittingId, setEdittingId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onNewRoadmapClick = () => {
    dispatch(
      addNewRoadmap({ id: nanoid(), title: 'new roadmap', itemList: [] })
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
          {localMapList.map((map, index) => (
            <NavigationCard
              key={map.id}
              onClick={() => {
                onMapItemClick(map.id);
              }}
              $backgroundStyle={
                activeRoadmap?.id === map.id
                  ? cardBackgroundStyle.selected
                  : cardBackgroundStyle.unselected
              }
              onMouseOver={() => setHoverId(map.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              {hoverId === map.id && (
                <MapActionButtonsArea>
                  <IconButton
                    size='small'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      stopFuncDefaultPropagation(e, () => setEdittingId(map.id))
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      stopFuncDefaultPropagation(e, () => deleteMap(map.id))
                    }
                  >
                    <CloseIcon style={{ color: 'red' }} />
                  </IconButton>
                </MapActionButtonsArea>
              )}
              <TitleWrapper>
                <EditableText
                  title={map.title}
                  isTitleShowed={edittingId === map.id}
                  onTitleChange={(newTitle) =>
                    dispatch(changeRoadMapName({ id: map.id, title: newTitle }))
                  }
                  onEnterPress={() => setEdittingId(null)}
                />
              </TitleWrapper>
            </NavigationCard>
          ))}
          <NavigationCard
            $backgroundStyle={cardBackgroundStyle.newItem}
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
