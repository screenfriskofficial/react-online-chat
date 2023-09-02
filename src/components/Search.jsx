import userImg from "../img/user.jfif";
export const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChat">
        <img src={userImg} alt="" />
        <div className="userChatInfo">
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};
