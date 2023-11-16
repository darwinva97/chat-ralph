import { useStore } from "../../context";
import { ActionTypes } from "../../context/reducer";
import { useFocus } from "../../hooks/useFocus";
import { AccountModal } from "./AccountModal";
import { UsersDrawer } from "./UsersDrawer";
import classes from "./style.module.css";

export const Header = ({ scrollChat }: { scrollChat: () => void }) => {
  const {
    state: { users },
    dispatch,
  } = useStore();
  const { focus } = useFocus();
  const showUsers = () => {
    dispatch({
      type: ActionTypes.OPEN_USERS_DRAWER,
      payload: null,
    });
  };
  const openAccount = () => {
    dispatch({
      type: ActionTypes.OPEN_ACCOUNT_DRAWER,
      payload: null,
    });
  };
  return (
    <header className={classes.container}>
      <div
        className={classes.logo}
        onClick={() => {
          scrollChat();
          focus();
        }}
        title="Scroll to last message"
      >
        🕵️‍♂️ ⬇️
      </div>
      <nav className={classes.options}>
        <div onClick={openAccount}>Account</div>
        <div onClick={showUsers}>
          {users.filter((u) => u.online).length}/{users.length} Members
        </div>
        <UsersDrawer />
        <AccountModal />
      </nav>
    </header>
  );
};
