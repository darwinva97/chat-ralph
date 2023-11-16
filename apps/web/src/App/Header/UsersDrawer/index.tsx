import { Drawer } from "../../../components";
import { useStore } from "../../../context";
import { ActionTypes } from "../../../context/reducer";

export const UsersDrawer = () => {
  const {
    state: { users, showUsersDrawer, account },
    dispatch,
  } = useStore();
  const close = () => {
    dispatch({
      type: ActionTypes.CLOSE_USERS_DRAWER,
      payload: null,
    });
  };
  return (
    <Drawer close={close} show={showUsersDrawer}>
      <>
        {users
          .sort((u1) => (u1.online ? -1 : 1))
          .map((u) => {
            const content = [
              u.username,
              u.id === account?.id ? "(You)" : null,
              u.online ? "🟢" : "🔘",
            ]
              .filter(Boolean)
              .join(" ");
            return <div key={u.id}>{content}</div>;
          })}
      </>
    </Drawer>
  );
};
