/* eslint-disable no-case-declarations */
import type { Message, User } from "server";
import type { TState } from "..";

export const ActionTypes = {
  ADD_MESSAGE: "ADD_MESSAGE",
  INIT_USER: "IDENTIFY",
  CLOSE_USERS_DRAWER: "CLOSE_USERS_DRAWER",
  OPEN_USERS_DRAWER: "OPEN_USERS_DRAWER",
  CLOSE_ACCOUNT_DRAWER: "CLOSE_ACCOUNT_DRAWER",
  OPEN_ACCOUNT_DRAWER: "OPEN_ACCOUNT_DRAWER",
};

type TAction = {
  type: string;
  payload: unknown;
};

export function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      const newMessage = action.payload as Message;
      const existMessage = state.messages.find((m) => m.id === newMessage.id);

      if (existMessage) return state;

      return {
        ...state,
        messages: state.messages.concat(newMessage),
      };
    case ActionTypes.INIT_USER:
      const { account, messages, users } = action.payload as {
        account: User;
        messages: Message[];
        users: User[];
      };
      return {
        ...state,
        account,
        messages,
        users,
      };
    case ActionTypes.CLOSE_USERS_DRAWER:
      return {
        ...state,
        showUsersDrawer: false,
      };
    case ActionTypes.OPEN_USERS_DRAWER:
      return {
        ...state,
        showUsersDrawer: true,
      };
    case ActionTypes.CLOSE_ACCOUNT_DRAWER:
      return {
        ...state,
        showAccountDrawer: false,
      };
    case ActionTypes.OPEN_ACCOUNT_DRAWER:
      return {
        ...state,
        showAccountDrawer: true,
      };
    default:
      return state;
  }
}
