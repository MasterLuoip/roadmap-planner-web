import React from 'react';
import { Topbar } from '../layout/Topbar';
import { RoadmapBody } from './roadmapBody/RoadmapBody';

export function RoadmapView(): JSX.Element {
  return (
    <>
      <Topbar />
      <RoadmapBody />
    </>
  );
}
