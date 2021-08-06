import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { stopFuncDefaultPropagation } from '../../../../utils/helperFunctions/helpers';
import EditableText from '../../../common/EditableText';
import { TitleWrapper } from '../../../roadmapPage/roadmapBody/roadmapItem/RoadmapItemStyle';
import {
  cardBackgroundStyle,
  MapActionButtonsArea,
  NavigationCard,
} from '../MapBarStyle';

type MapBarCardProps = {
  title: string;
  isActive: boolean;
  onMapClick: () => void;
  onDelete: () => void;
  onTitleChange: (newTitle: string) => void;
};
export default function MapBardCard({
  title,
  isActive,
  onMapClick,
  onDelete,
  onTitleChange,
}: MapBarCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isTitleEditting, setTitleEditting] = useState(false);
  return (
    <NavigationCard
      onClick={onMapClick}
      $backgroundStyle={
        isActive ? cardBackgroundStyle.selected : cardBackgroundStyle.unselected
      }
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <MapActionButtonsArea>
          <IconButton
            size='small'
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              stopFuncDefaultPropagation(e, () =>
                setTitleEditting(!isTitleEditting)
              )
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size='small'
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              stopFuncDefaultPropagation(e, () => onDelete())
            }
          >
            <CloseIcon style={{ color: 'red' }} />
          </IconButton>
        </MapActionButtonsArea>
      )}
      <TitleWrapper>
        <EditableText
          title={title}
          isTitleShowed={isTitleEditting}
          onTitleChange={(newTitle) => onTitleChange(newTitle)}
          onEnterPress={() => setTitleEditting(false)}
        />
      </TitleWrapper>
    </NavigationCard>
  );
}
