import { useContext } from "react";

import { Messages } from "../Messages/Messages.jsx";
import { Input } from "../Input/Input.jsx";
import { ChatContext } from "../../context/ChatContext.jsx";
import { NoChat } from "../NoChat/NoChat.jsx";
import classes from "./Chat.module.scss";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  const hasChat = data.user?.displayName;

  return (
    <>
      {hasChat ? (
        <div className={classes.chat}>
          <div className={classes.chatInfo}>
            <div className={classes.currentUser}>
              <img src={data.user?.photoURL} alt="" />
              <span>{data.user?.displayName}</span>
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      ) : (
        <NoChat />
      )}
    </>
  );
};
