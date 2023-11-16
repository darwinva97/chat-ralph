import { useEffect } from "react";
import { useStore } from "../context";

export const STORAGE_NAME = "state";

export const useLocalStorage = () => {
  const { state } = useStore();
  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
    localStorage.setItem("visitorId", state.account?.fp || "");
  }, [state]);
};
