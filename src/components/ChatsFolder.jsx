import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ChatsFolder = () => {
  return (
    <Link to={"chats"} className={"links"}>
      <Button className={"chats_folder"}>
        <ChatBubbleIcon />
        <span>Messages</span>
      </Button>
    </Link>
  );
};
