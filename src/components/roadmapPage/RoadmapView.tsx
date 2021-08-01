import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { MapBar } from '../layout/mapBar/MapBar';
import { TopBar } from '../layout/topBar/TopBar';
import { ItemType, RoadmapBody } from './roadmapBody/RoadmapBody';
import { TaskSidePageView } from './roadmapBody/taskSidePageView/TaskSidePageView';

export type RoadmapType = {
  id: string;
  title: string;
  itemList: ItemType[];
};
export function RoadmapView(): JSX.Element {
  // const { target, setTarget } = useCurdArrayWithItemId<RoadmapType>([
  //   {
  //     id: nanoid(),
  //     title: 'defaultItem',
  //     itemList: [],
  //   },
  // ]);
  // const [activeTarget, setActiveTarget] = useState(target[0]);
  const isSidePanelShowed = useSelector(
    (state: RootState) => state.roadmap.activeRoadmapItem !== null
  );
  // const updateNewTarget = (newTarget: RoadmapType[]) => {
  //   setTarget(newTarget);
  // };
  // const updateRoadmapItemList = (id: string, newItemList: ItemType[]) => {
  //   setTarget((target) => {
  //     return target.map((t) => {
  //       t.itemList = t.id === id ? newItemList : t.itemList;
  //       return t;
  //     });
  //   });
  // };
  return (
    <>
      <TopBar />
      <Grid container>
        <Grid item xs>
          <MapBar />
          <RoadmapBody />
        </Grid>
        {isSidePanelShowed && (
          <Grid item xs={8}>
            <TaskSidePageView />
          </Grid>
        )}
      </Grid>
    </>
  );
}
