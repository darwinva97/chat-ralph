import type { HTMLProps } from "react";
import type { Message as MessageServerType } from "server";
import classes from "./style.module.css";
import { Avatar } from "../../../components/Avatar";
import { clsx } from "../../../utils";

export type TMessageProps = {
  right: boolean;
  username: string;
  image?: string;
  showAvatar: boolean;
  showDate: boolean;
} & MessageServerType &
  HTMLProps<HTMLDivElement>;
export const Message = ({
  username,
  image,
  createdAt,
  showAvatar,
  showDate,
  right,
  content,
}: TMessageProps) => {
  const className = clsx(right ? classes.right : "", classes.container);
  const dateStr = new Date(createdAt).toLocaleString();
  return (
    <div className={className}>
      {showAvatar && <Avatar username={username} src={image} />}
      <p className={classes.content} title={dateStr}>
        {content}
      </p>
      {showDate && <span className={classes.date}>{dateStr}</span>}
    </div>
  );
};
