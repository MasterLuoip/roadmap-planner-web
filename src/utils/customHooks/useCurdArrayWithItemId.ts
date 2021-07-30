import { useState } from 'react';

export enum AddPosition {
  front,
  followById,
  end,
}
export default function useCurdArrayWithItemId<T extends { id: string }>(
  targetArray: T[]
) {
  const [localTargetArr, setLocalTargetArr] = useState(targetArray);
  const addItem = (item: T, position: AddPosition, id?: string) => {
    switch (position) {
      case AddPosition.front:
        setLocalTargetArr([item, ...localTargetArr]);
        break;
      case AddPosition.end:
        setLocalTargetArr([...localTargetArr, item]);
        break;
      case AddPosition.followById:
        const index = localTargetArr.findIndex((i) => {
          return i.id === id;
        });
        setLocalTargetArr([
          ...localTargetArr.slice(0, index + 1),
          item,
          ...localTargetArr.slice(index + 1),
        ]);
    }
  };

  const removeItemById = (id: string) => {
    setLocalTargetArr((target) => {
      return target.filter((t) => t.id !== id);
    });
  };

  const changeItemById = (id: string, key: string, newValue: unknown) => {
    setLocalTargetArr((target) => {
      return target.map((t) => {
        const tempT = t as any;
        if (key in t) {
          tempT[key] = t.id === id ? newValue : t.id;
        }
        return t;
      });
    });
  };
  return {
    target: localTargetArr,
    addItem,
    removeItemById,
    changeItemById,
    setTarget: setLocalTargetArr,
  };
}
