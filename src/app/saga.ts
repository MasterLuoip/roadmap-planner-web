import { Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import {
  addNewRoadmap,
  addNewRoadmapAsync,
  getRoadmapAsync,
  updateRoadmaps,
} from '../components/roadmapPage/roadmapSlice/roadmapSlice';
import { RoadmapType } from '../components/roadmapPage/RoadmapView';
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
export function* updateRoadmapsAsync() {
  const roadmaps: ResponseGenerator = yield axios.get('/api/roadmaps');
  yield put(updateRoadmaps(roadmaps.data));
}

export function* addNewRoadmapToDB(action: { payload: RoadmapType } & Action) {
  const response: ResponseGenerator = yield axios.post(
    '/api/roadmaps',
    action.payload
  );
  if (
    response !== undefined &&
    response.status !== undefined &&
    response.status >= 200 &&
    response.status < 400
  ) {
    yield put(addNewRoadmap(action.payload));
  }
}

export function* watchGetRoadmaps() {
  yield takeEvery(getRoadmapAsync.type, updateRoadmapsAsync);
}

export function* watchAddNewRoadmap() {
  yield takeEvery(addNewRoadmapAsync.type, addNewRoadmapToDB);
}

export default function* rootSaga() {
  yield all([watchGetRoadmaps(), watchAddNewRoadmap()]);
}
