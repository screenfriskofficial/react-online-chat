import Add from "../img/addAvatar.png";
export const Register = () => {
  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Chat</span>
        <span className={"title"}>Register</span>
        <form action="">
          <input type="text" placeholder={"display name"} />
          <input type="email" placeholder={"email"} />
          <input type="password" placeholder={"password"} />
          <input
            style={{ display: "none" }}
            type="file"
            placeholder={"file"}
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="add" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>You do have and account? Login</p>
      </div>
    </div>
  );
};
