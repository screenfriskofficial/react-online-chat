import Attach from "../img/attach.png";
import Img from "../img/img.png";
export const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <input type="file" style={{ display: "none" }} id="file" />
        <img src={Attach} alt="" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};
