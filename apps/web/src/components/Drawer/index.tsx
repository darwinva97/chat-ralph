import { ReactNode } from "react";
import classes from "./style.module.css";

type TDrawerProps = {
  children: ReactNode;
  show: boolean;
  close: () => void;
};
export const Drawer = ({ children, show, close }: TDrawerProps) => {
  return (
    <div
      className={classes.container}
      style={{
        right: show ? "0" : "-100%",
      }}
      onClick={close}
    >
      <div className={classes.main} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
