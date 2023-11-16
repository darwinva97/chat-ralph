import { createContext, useContext } from "react";
import type { Message, User } from "server";
import { STORAGE_NAME } from "../hooks/useLocalStorage";

export { reducer } from "./reducer";

export type TState = {
  account: User | null;
  users: User[];
  messages: Message[];
  showUsersDrawer: boolean;
  showAccountDrawer: boolean;
};

const initialJSONDataLocalStorage = localStorage.getItem(STORAGE_NAME);
const initialDataLocalStorage =
  initialJSONDataLocalStorage && JSON.parse(initialJSONDataLocalStorage);

export const initialState: TState = initialDataLocalStorage || {
  account: null,
  users: [],
  messages: [],
  showUsersDrawer: false,
  showAccountDrawer: false,
};

type Context = {
  state: TState;
  dispatch: (action: { type: string; payload: unknown }) => void;
};

export const AppContext = createContext<Context>({
  state: initialState,
  dispatch: () => {},
});

export const useStore = () => useContext(AppContext);
