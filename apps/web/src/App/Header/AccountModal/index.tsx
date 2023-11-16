import { Avatar } from "../../../components/Avatar";
import { Modal } from "../../../components/Modal";
import { useStore } from "../../../context";
import { ActionTypes } from "../../../context/reducer";

export const AccountModal = () => {
  const {
    state: { showAccountDrawer, account },
    dispatch,
  } = useStore();
  const close = () => {
    dispatch({
      type: ActionTypes.CLOSE_ACCOUNT_DRAWER,
      payload: null,
    });
  };
  return (
    <Modal isOpen={showAccountDrawer} close={close}>
      {account && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Avatar
            username={account.username}
            image={account.image}
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <div>{account.username}</div>
        </div>
      )}
    </Modal>
  );
};
