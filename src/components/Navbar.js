import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userDetail, setUserDetail, hide = false }) => {
  const navigate = useNavigate();
  const [dropDown, showDropDown] = useState(false);

  const { name = "" } = userDetail || {};

  const logout = () => {
    console.log("LoggingOut>>>");
    setUserDetail({});
    localStorage.removeItem("user");
    localStorage.setItem("popUp", "true");
    navigate("/");
  };

  const User = () => {
    return (
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <div className="userIntials">{name[0]?.toUpperCase()}</div>
        <div className="downArrowContainer">
          <img
            className="downArrow"
            onClick={() => showDropDown(!dropDown)}
            src={require("../img/down-arrow@2x.png")}
          />
        </div>
        {dropDown && (
          <div className="dropDownContainer">
            <div onClick={logout}>Logout</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="Navbar">
      <img src={require("../img/MyJobs.png")} />

      {!hide ? (
        userDetail ? (
          <User />
        ) : (
          <button onClick={() => navigate("/Login")} className="login-btn">
            Login/Signup
          </button>
        )
      ) : null}
    </div>
  );
};

export default Navbar;
