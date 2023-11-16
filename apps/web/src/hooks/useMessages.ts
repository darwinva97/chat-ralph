import { useEffect } from "react";
import { useStore } from "../context";
import { ActionTypes } from "../context/reducer";
import { trpc } from "../trpc";

export const useMessages = () => {
  const { dispatch } = useStore();
  useEffect(() => {
    const { unsubscribe } = trpc.message.onAdd.subscribe(undefined, {
      onData(data) {
        dispatch({
          type: ActionTypes.ADD_MESSAGE,
          payload: data,
        });
      },
    });
    return () => unsubscribe();
  }, []);
};
