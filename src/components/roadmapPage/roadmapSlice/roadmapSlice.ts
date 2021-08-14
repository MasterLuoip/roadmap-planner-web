import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { ItemType } from '../roadmapBody/RoadmapBody';
import { TaskSection } from '../roadmapBody/taskSidePageView/TaskSidePageView';
import { RoadmapType } from '../RoadmapView';

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
    updateRoadmaps: (state, { payload }: { payload: RoadmapType[] }) => {
      state.roadmapList = payload;
    },
    setActiveRoadmapItem: (
      state,
      { payload }: { payload: ItemType | null }
    ) => {
      if (payload === null) {
        state.activeRoadmapItem = null;
      }
      // n^2 order, refactor this.
      state.roadmapList.forEach((roadmap) => {
        if (roadmap.id === state.activeRoadmap?.id) {
          roadmap.itemList.forEach((item) => {
            if (item.id === payload?.id) {
              state.activeRoadmapItem = item;
              return;
            }
          });
        }
      });
    },
    setActiveRoadmap: (state, { payload }: { payload: RoadmapType | null }) => {
      state.activeRoadmap = payload;
    },
    addNewRoadmap: (state, { payload }: { payload: RoadmapType }) => {
      state.roadmapList.push(payload);
    },
    deleteARoadMap: (state, { payload }: { payload: string }) => {
      state.roadmapList = state.roadmapList.filter((map) => map.id !== payload);
    },
    changeRoadMapName: (
      state,
      { payload: { id, title } }: { payload: { id: string; title: string } }
    ) => {
      state.roadmapList.forEach((m) => {
        if (m.id === id) {
          m.title = title;
        }
      });
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
    setRoadmapItemTaskSection: (
      { roadmapList, activeRoadmap, activeRoadmapItem },
      { payload }: { payload: TaskSection[] }
    ) => {
      // if (state.activeRoadmapItem)
      //   state.activeRoadmapItem.taskSections = payload;
      roadmapList.forEach((roadmap) => {
        if (roadmap.id === activeRoadmap?.id) {
          roadmap.itemList.forEach((item) => {
            if (item.id === activeRoadmapItem?.id) {
              item.taskSections = payload;
            }
          });
        }
      });
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
      state.roadmapList = state.roadmapList.map((item) => {
        return item.id === state.activeRoadmap?.id ? state.activeRoadmap : item;
      });
    },
    changeItemListSingleItemName: (
      state,
      {
        payload: { newTitle, id },
      }: { payload: { newTitle: string; id: string } }
    ) => {
      const item = findRoadmapItem(
        state.activeRoadmap?.id || '',
        state.activeRoadmapItem?.id || '',
        state
      );
      if (item === undefined) return;
      item.title = newTitle;
      state.activeRoadmapItem = item;
      // if (state.activeRoadmap === null) return;
      // const index = state.activeRoadmap.itemList.findIndex((i) => i.id === id);
      // if (index !== -1) {
      //   state.activeRoadmap.itemList[index].title = newTitle;
      // }
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
  updateRoadmaps,
  setActiveRoadmapItem,
  setActiveRoadmap,
  addNewRoadmap,
  deleteARoadMap,
  changeRoadMapName,
  addItemInRoadmap,
  removeItemInRoadmap,
  setItemTitleById,
  setRoadmapItemTaskSection,
  addNewItemToItemList,
  changeItemListSingleItemName,
  deleteItemInItemList,
} = roadmapSlice.actions;

// selector
export const selectActiveRoadmap = (state: RootState) =>
  state.roadmap.activeRoadmap;
export const selectActiveRoadmapItem = (state: RootState) =>
  state.roadmap.activeRoadmapItem;

//utils
const findRoadmapItem = (roadmapId: string, itemId: string, state: any) => {
  return state.roadmapList
    .find((roadmap: any) => roadmap.id === roadmapId)
    ?.itemList.find((item: any) => item.id === itemId);
};
export default roadmapSlice.reducer;
