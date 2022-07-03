import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const Homepage = () => {
  const [popUp, setPopUp] = useState(false);
  const { state } = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    if (!isEmpty(tempUser)) {
      return navigation("/portal");
    }
    console.log("homePage>>>>", isEmpty(tempUser));
    const showPopUp = localStorage.getItem("popUp");
    setPopUp(showPopUp);
  }, []);

  const PopUp = () => {
    return (
      <div className="popUpContainer">
        <img
          className="cross-icon popup-icon"
          src={require("../img/cross@2x.png")}
          onClick={() => {
            setPopUp(false);
            localStorage.removeItem("popUp");
          }}
        />
        <div style={{ color: "#43AFFF" }}>Logout</div>
        <div style={{ color: "#303F60" }}>You have succesfully logged out.</div>
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {popUp && <PopUp />}
      <div className="topSection home">
        <Navbar />
        <div className="content">
          <div className="welcomeContainer">
            <div className="welcomeText">
              Welcome to
              <div>
                My<span style={{ color: "#43AFFF" }}>Jobs</span>
              </div>
            </div>
            <button className="getStarted">Get Started</button>
          </div>
          <div style={{ position: "relative" }}>
            <img className="women-img" src={require("../img/women.png")} />
          </div>
        </div>
      </div>
      <div className="bottomSection">
        <div
          className="content"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>Why Us</div>
          <div style={{ display: "flex" }}>
            <Card />
            <Card />
            <Card />
          </div>
          <div>Companies Who Trust Us</div>
          <div className="companies">
            <img className="company" src={require("../img/solaytic.png")} />
            <img className="company" src={require("../img/kanba.png")} />
            <img className="company" src={require("../img/lighting.png")} />
            <img className="company" src={require("../img/ztos.png")} />
            <img className="company" src={require("../img/kanba.png")} />
            <img className="company" src={require("../img/goldline.png")} />
            <img className="company" src={require("../img/ideaa.png")} />
            <img className="company" src={require("../img/liva.png")} />
            <img className="company" src={require("../img/velocity-9.png")} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="cardContainer">
      <div className="cardHeading">Get more Visibility</div>
      <div className="cardContent">
        lorem ipsum dolor sit amet, consectetur adsakdjaskdas ajkdhajkshd
        asjkdhjka
      </div>
    </div>
  );
};

export default Homepage;
