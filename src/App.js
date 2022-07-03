import "./App.css";
import Homepage from "./screens/Homepage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import JobPortal from "./screens/JobPortal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    console.log("tempUser>>>>", tempUser);
    setUserDetail(tempUser);
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage userDetail={userDetail} />} />
        <Route
          path="/login"
          element={<LoginPage setUserDetail={setUserDetail} />}
        />
        <Route
          path="/portal"
          element={
            <JobPortal userDetail={userDetail} setUserDetail={setUserDetail} />
          }
        />
      </Routes>
    </div>
  );
};
export default App;
