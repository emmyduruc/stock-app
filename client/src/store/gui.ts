import { IAuthUser, User } from "../model/user.model";
import { IRootStore } from "./root";
import { makeAutoObservable, runInAction } from "mobx";

export const createUiStore = (root: IRootStore) => {
  const store = makeAutoObservable({
    user: null as null | User,
    authUser: null as null | IAuthUser,

    setAuthUser: (authUser: IAuthUser) => {
      runInAction(() => {
        store.authUser = authUser;
      });
    },
  });

  return store;
};

export type IUiStore = ReturnType<typeof createUiStore>;
