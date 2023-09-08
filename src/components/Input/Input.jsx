import { useContext, useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ChatContext } from "../../context/ChatContext.jsx";
import { TypeAnimation } from "react-type-animation";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../app/firebase.js";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "@mui/material";
import classes from "./Input.module.scss";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [isTyping, setIsTyping] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const haveText = text.length > 0 || img;

  const inputRef = useRef(null);

  useEffect(() => {
    const docRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const userData = docSnap.data();
      if (userData && userData.typing !== undefined) {
        setIsTyping(userData.typing);
      }
    });

    return () => unsubscribe();
  }, [currentUser.uid]);

  const handleSend = async () => {
    setText("");
    setImg(null);
    await updateDoc(doc(db, "users", data.user.uid), {
      typing: false, // Устанавливаем 'false' при отправке сообщения
    });

    if (inputFocused) {
      inputRef.current.blur();
    }

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        },
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  const handleDown = async (e) => {
    if (haveText) {
      e.code === "Enter" && handleSend();
    }
  };

  return (
    <>
      <div className={classes.input}>
        {isTyping ? (
          <span>
            <TypeAnimation
              className={classes.typingIndicator}
              sequence={[" ", 250, ".", 250, "..", 250, "...", 250]}
              repeat={Infinity}
            />
          </span>
        ) : null}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleDown}
          onFocus={() => {
            setInputFocused(true);
            updateDoc(doc(db, "users", data.user.uid), {
              typing: true,
            });
          }}
          onBlur={() => {
            setInputFocused(false);
            updateDoc(doc(db, "users", data.user.uid), {
              typing: false,
            });
          }}
        />
        <div className={classes.send}>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <PhotoSizeSelectActualIcon
              fontSize={"medium"}
              sx={{
                color: "#a7bcff",
                ":hover": { color: "#3e3c61" },
                cursor: "pointer",
              }}
            />
          </label>
          {haveText ? (
            <Button
              onClick={handleSend}
              sx={{
                color: "#a7bcff",
                ":hover": { color: "#3e3c61" },
                cursor: "pointer",
              }}
            >
              <SendIcon fontSize={"medium"} />
            </Button>
          ) : (
            <Button disabled>
              <SendIcon fontSize={"medium"} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
