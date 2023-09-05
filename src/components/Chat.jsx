import { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
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
            <span>{data.user?.displayName}</span>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
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
