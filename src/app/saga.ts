import axios from 'axios';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { updateRoadmaps } from '../components/roadmapPage/roadmapSlice/roadmapSlice';
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
export function* updateRoadmapsAsync() {
  const roadmaps: ResponseGenerator = yield axios.get('/api/roadmaps', {
    proxy: {
      host: 'localhost',
      port: 3023,
    },
  });
  yield put(updateRoadmaps(roadmaps.data));
}

export function* watchGetRoadmaps() {
  yield takeEvery('UPDATE_ROADMAPS', updateRoadmapsAsync);
}

export default function* rootSaga() {
  yield all([watchGetRoadmaps()]);
}
