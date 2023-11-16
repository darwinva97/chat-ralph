import { useMemo, type HTMLProps } from "react";
import { useStore } from "../../context";
import { clsx } from "../../utils";
import classes from "./style.module.css";
import { Message } from "./Message";

export type TMessagesProps = HTMLProps<HTMLDivElement>;
export const Messages = ({ className = "" }: TMessagesProps) => {
  const {
    state: { messages, account, users },
  } = useStore();
  const preparedMessages = useMemo(() => {
    return messages
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      })
      .map((m, index, arr) => {
        const isMine = account!.id === m.userId;
        const user = users.find((u) => u.id === m.userId);
        const showAvatar = index === 0 || arr[index - 1].userId !== m.userId;
        const showDate =
          index === arr.length - 1 || arr[index + 1].userId !== m.userId;
        return {
          ...m,
          right: isMine,
          username: user?.username || "Unknown",
          showAvatar,
          showDate,
        };
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  return (
    <div className={clsx(className, classes.container)}>
      {preparedMessages.map((m) => (
        <Message {...m} key={m.id} />
      ))}
    </div>
  );
};
