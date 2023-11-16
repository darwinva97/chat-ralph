import { ReactNode } from "react";
import classes from "./style.module.css";

type TModalProps = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
};

export const Modal = ({ children, close, isOpen }: TModalProps) => {
  return (
    <div
      className={classes.container}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
      onClick={close}
    >
      <main onClick={(e) => e.stopPropagation()}>{children}</main>
    </div>
  );
};
