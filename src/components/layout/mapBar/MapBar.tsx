import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  DropButton,
  MapBarWrapper,
  NavigationCard,
  NavigationWrapper,
} from './MapBarStyle';
export function MapBar(): JSX.Element {
  return (
    <MapBarWrapper>
      <NavigationWrapper>
        <NavigationCard>
          <Typography variant='h5'>hello</Typography>
        </NavigationCard>
        <NavigationCard>Add new one</NavigationCard>
      </NavigationWrapper>
      <DropButton>
        <ExpandMoreIcon />
      </DropButton>
    </MapBarWrapper>
  );
}
