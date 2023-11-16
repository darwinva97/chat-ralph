import { useEffect, useRef, useState } from "react";
import { trpc } from "../../trpc";
import { useStore } from "../../context";
import classes from "./style.module.css";
import { useFocus } from "../../hooks/useFocus";
import { IoMdSend } from "react-icons/io";

export const Entry = () => {
  const {
    state: { account },
  } = useStore();
  const { addListener } = useFocus();
  const inputRef = useRef<HTMLInputElement>(null);
  const emitMessage = trpc.message.add.mutate;
  const [value, setValue] = useState("");
  const sendMessage = () => {
    if (!value || !account) return;

    emitMessage({
      userId: account.id,
      content: value,
      type: "text",
    });

    setValue("");
  };
  useEffect(() => {
    const input = inputRef.current!;
    const unsubscribe = addListener(input);
    input.focus();
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.container}>
      <input
        type="text"
        value={value}
        ref={inputRef}
        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={sendMessage}>
        <IoMdSend />
      </button>
    </div>
  );
};
