import Photo from "../img/user.jfif";

export const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img src={Photo} alt="" />
        <div className="userChatInfo">
          <span>John Doe</span>
          <p>Last message</p>
        </div>
      </div>
    </div>
  );
};
