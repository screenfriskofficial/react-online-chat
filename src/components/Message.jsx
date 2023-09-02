import Photo from "../img/user.jfif";
export const Message = () => {
  return (
    <div className={`message owner`}>
      <div className="messageInfo">
        <img src={Photo} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hello world</p>
        <img src={Photo} alt="" />
      </div>
    </div>
  );
};
