import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import roadmapSlice from '../components/roadmapPage/roadmapSlice/roadmapSlice';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    roadmap: roadmapSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
