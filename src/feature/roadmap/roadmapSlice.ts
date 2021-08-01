import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ItemType } from '../../components/roadmapPage/roadmapBody/RoadmapBody';
import { TaskSection } from '../../components/roadmapPage/roadmapBody/taskSidePageView/TaskSidePageView';
import { RoadmapType } from '../../components/roadmapPage/RoadmapView';

export type roadmapState = {
  roadmapList: RoadmapType[];
  activeRoadmap: RoadmapType | null;
  activeRoadmapItem: ItemType | null;
};

const initialState: roadmapState = {
  roadmapList: [],
  activeRoadmap: null,
  activeRoadmapItem: null,
};

//slice of store
export const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setActiveRoadmapItem: (
      state,
      { payload }: { payload: ItemType | null }
    ) => {
      state.activeRoadmapItem = payload;
    },
    setActiveRoadmap: (state, { payload }: { payload: RoadmapType | null }) => {
      state.activeRoadmap = payload;
    },
    addNewRoadmap: (state, { payload }: { payload: RoadmapType }) => {
      state.roadmapList.push(payload);
    },
    addItemInRoadmap: (
      state,
      { payload: { id, item } }: { payload: { id: string; item: ItemType } }
    ) => {
      state.roadmapList.find((x) => x.id === id)?.itemList.push(item);
    },
    removeItemInRoadmap: (
      state,
      {
        payload: { roadmapId, itemId },
      }: { payload: { roadmapId: string; itemId: string } }
    ) => {
      state.roadmapList
        .find((x) => x.id === roadmapId)
        ?.itemList.filter((item) => item.id !== itemId);
    },
    setItemTitleById: (
      state,
      { payload: { id, item } }: { payload: { id: string; item: ItemType } }
    ) => {
      state.roadmapList.find((x) => x.id === id)?.itemList.push(item);
    },
    setActiveRoadmapItemTaskSection: (
      state,
      { payload }: { payload: TaskSection[] }
    ) => {
      if (state.activeRoadmapItem)
        state.activeRoadmapItem.taskSections = payload;
    },
    addNewItemToItemList: (
      state,
      {
        payload: { newItem, id },
      }: { payload: { newItem: ItemType; id?: string } }
    ) => {
      if (state.activeRoadmap === null) return;
      if (id === undefined && state.activeRoadmap !== null) {
        state.activeRoadmap.itemList.push(newItem);
      }
      const index = state.activeRoadmap.itemList.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.activeRoadmap.itemList.splice(index + 1, 0, newItem);
      }
    },
    changeItemListSingleItemName: (
      state,
      {
        payload: { newTitle, id },
      }: { payload: { newTitle: string; id: string } }
    ) => {
      if (state.activeRoadmap === null) return;
      const index = state.activeRoadmap.itemList.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.activeRoadmap.itemList[index].title = newTitle;
      }
    },
    deleteItemInItemList: (
      state,
      { payload: { id } }: { payload: { id: string } }
    ) => {
      if (state.activeRoadmap === null) return;
      const index = state.activeRoadmap.itemList.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.activeRoadmap.itemList.splice(index, 1);
      }
    },
  },
});

// actions
export const {
  setActiveRoadmapItem,
  setActiveRoadmap,
  addNewRoadmap,
  addItemInRoadmap,
  removeItemInRoadmap,
  setItemTitleById,
  setActiveRoadmapItemTaskSection,
  addNewItemToItemList,
  changeItemListSingleItemName,
  deleteItemInItemList,
} = roadmapSlice.actions;

// selector
export const selectActiveRoadmapItem = (state: RootState) =>
  state.roadmap.activeRoadmap;

export default roadmapSlice.reducer;
