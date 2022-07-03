import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUserDetail }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setError(false);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "https://jobs-api.squareboat.info/api/v1/auth/login",
      data: user,
    })
      .then((response) => {
        console.log("login>>>success>>>", response.data.data);
        setUserDetail(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("popUp", "true");
        navigate("/portal");
      })
      .catch((error) => {
        console.log("login>>>error>>>", error);
        setError(true);
      });
  };
  return (
    <div className="topSection login">
      <Navbar setUserDetail={setUserDetail} hide={true} />
      <div className="mainContainer">
        <div>
          <div style={{ fontSize: "22px" }}>Login</div>
          <form onSubmit={login}>
            <div className="inputContainer">
              <div>Email address</div>
              <input
                type="email"
                className="inputfield"
                placeholder="Enter your email"
                value={user.email}
                name="email"
                onChange={handleInput}
                required
              />
            </div>
            <div className="inputContainer">
              <div>Password</div>
              <input
                type="password"
                className="inputfield"
                placeholder="Enter your password"
                value={user.password}
                name="password"
                onChange={handleInput}
                required
              />
              {error && (
                <div className="errorMessage">
                  Incorrect email address or password
                </div>
              )}
            </div>
            <div className="inputContainer submitContainer">
              <input className="submit" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
