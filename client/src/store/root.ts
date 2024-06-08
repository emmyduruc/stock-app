import { createContext, useContext } from "react";
import { IUiStore, createUiStore } from "./gui";

export interface IRootStore {
  gui: IUiStore;
}

export const createParentStore = (): IRootStore => {
  const store: IRootStore = {
    gui: null as any,
  };
  const storeGui = createUiStore(store);
  store.gui = storeGui;

  return store;
};

export const parentStore = createParentStore();
export const ParentStoreContext = createContext<IRootStore>(parentStore);
export const StoreProvider = ParentStoreContext.Provider;
export const useStorage = () => useContext(ParentStoreContext);
