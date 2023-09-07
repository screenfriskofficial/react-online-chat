import { useContext } from "react";

import { Messages } from "./Messages";
import { Input } from "./Input";
import { ChatContext } from "../context/ChatContext";
import { NoChat } from "./NoChat.jsx";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  const hasChat = data.user?.displayName;

  return (
    <>
      {hasChat ? (
        <div className="chat">
          <div className="chatInfo">
            <div className="currentUser">
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
