import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ChatContext } from "../../context/ChatContext.jsx";
import { db } from "../../app/firebase.js";
import { useNavigate } from "react-router-dom";
import classes from "./Chats.module.scss";

export const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log(Object.entries(chats));
    navigate("/");
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // TODO: connect redux toolkit
  // TODO: create user profiles

  return (
    <div className={classes.chats_page}>
      {Object.entries(chats).length > 0 ? (
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className={classes.userChat}
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className={classes.userChatInfo}>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1]["lastMessage"]?.text}</p>
              </div>
            </div>
          ))
      ) : (
        <div className={classes.find}>Find a friends!</div>
      )}
    </div>
  );
};
