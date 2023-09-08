import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./ChatsFolder.module.scss";

export const ChatsFolder = () => {
  return (
    <Link to={"chats"} className={"links"}>
      <Button className={classes.chats_folder}>
        <ChatBubbleIcon />
        <span>Messages</span>
      </Button>
    </Link>
  );
};
