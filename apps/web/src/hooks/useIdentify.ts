import { useEffect } from "react";
import { useStore } from "../context";
import { ActionTypes } from "../context/reducer";
import { trpc } from "../trpc";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const useIdentify = () => {
  const { dispatch } = useStore();
  const identify = trpc.user.identify.query;
  useEffect(() => {
    const fn = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      localStorage.setItem("visitorId", visitorId);
      const payload = await identify({ fp: visitorId });

      dispatch({
        payload,
        type: ActionTypes.INIT_USER,
      });
    };
    fn();
  }, []);
};
