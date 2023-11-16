import { HTMLProps } from "react";
import classes from "./style.module.css";
import { clsx } from "../../utils";

type TAvatarProps = HTMLProps<HTMLDivElement> & {
  image?: string | null;
  username: string;
};
export const Avatar = ({
  image,
  username,
  className,
  ...props
}: TAvatarProps) => {
  return (
    <div className={clsx(classes.avatar, className)} title={username} {...props}>
      {image ? (
        <img src={image} alt={username} />
      ) : (
        <span>{username.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
};
