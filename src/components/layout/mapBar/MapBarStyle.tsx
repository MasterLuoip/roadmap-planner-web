import { Button, Card } from '@material-ui/core';
import styled from 'styled-components';

export const MapBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const DropButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 30,
  padding: '0 30px',
  width: 'fit-content',
});

export const NavigationWrapper = styled.div`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

type NavigationCardProps = {
  $backgroundStyle: cardBackgroundStyle;
};

export enum cardBackgroundStyle {
  selected,
  unselected,
  newItem,
}

const backgroundColorMap = {
  [cardBackgroundStyle.selected]: '#ff8e53',
  [cardBackgroundStyle.unselected]: '#90caf9',
  [cardBackgroundStyle.newItem]: 'transparent',
};

export const NavigationCard = styled(Card)<NavigationCardProps>`
  position: relative;
  background: ${(props) => backgroundColorMap[props.$backgroundStyle]};
  width: 225px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: ${(props) =>
    props.$backgroundStyle === cardBackgroundStyle.newItem
      ? '1px dashed black'
      : ''};
  margin-left: 20px;
  cursor: pointer;
`;

export const MapActionButtonsArea = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
