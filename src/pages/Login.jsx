export const Login = () => {
  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>Chat</span>
        <span className={"title"}>Login</span>
        <form action="">
          <input type="email" placeholder={"email"} />
          <input type="password" placeholder={"password"} />
          <button>Sign in</button>
        </form>
        <p>You do have and account? Register</p>
      </div>
    </div>
  );
};
