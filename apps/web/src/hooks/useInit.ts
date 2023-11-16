import { useIdentify } from "./useIdentify";
import { useLocalStorage } from "./useLocalStorage";
import { useMessages } from "./useMessages";

export const useInit = () => {
  useLocalStorage();
  useIdentify();
  useMessages();
};
