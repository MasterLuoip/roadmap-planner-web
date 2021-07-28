import React from 'react';
import { MapBar } from '../layout/mapBar/MapBar';
import { TopBar } from '../layout/topBar/TopBar';
import { RoadmapBody } from './roadmapBody/RoadmapBody';

export function RoadmapView(): JSX.Element {
  return (
    <>
      <TopBar />
      <MapBar />
      <RoadmapBody />
    </>
  );
}
