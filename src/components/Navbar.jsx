import Photo from "../img/user.jfif";
export const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={Photo} alt="" />
        <span>John Doe</span>
        <button>logout</button>
      </div>
    </div>
  );
};
