import { Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { MapBar } from '../layout/mapBar/MapBar';
import { TopBar } from '../layout/topBar/TopBar';
import { StageType, RoadmapBody } from './roadmapBody/RoadmapBody';
import { TaskSidePageView } from './roadmapBody/taskSidePageView/TaskSidePageView';

export type RoadmapType = {
  id: string;
  title: string;
  stages: StageType[];
};
export function RoadmapView(): JSX.Element {
  const dispatch = useDispatch();
  dispatch({ type: 'UPDATE_ROADMAPS' });
  const isSidePanelShowed = useSelector(
    (state: RootState) => state.roadmap.activeRoadmapItem !== null
  );

  return (
    <>
      <TopBar />
      <Grid container style={{ flex: 1 }}>
        <Grid item xs={isSidePanelShowed ? 4 : 12}>
          <MapBar />
          <RoadmapBody />
        </Grid>
        {isSidePanelShowed && (
          <Grid item xs>
            <TaskSidePageView />
          </Grid>
        )}
      </Grid>
    </>
  );
}
