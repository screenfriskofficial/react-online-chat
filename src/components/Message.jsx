import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }) => {
  // Контекст с авторизованным пользователем
  const { currentUser } = useContext(AuthContext);
  // Контекст с пользователями
  const { data } = useContext(ChatContext);

  const ref = useRef();

  // Логика прокрутки экрана к последнему сообщению
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    //   Если id отправителся совподает с id авторизованного пользователся, то вешай класс owner. Для остальных message
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* Та же самая логика с id, только другое условие, для отображения аватарок */}
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};
