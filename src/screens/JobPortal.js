import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";

export default function JobPortal({ userDetail, setUserDetail }) {
  const [jobs, setJobs] = useState([]);
  const [showApplications, setShowApplications] = useState();
  const [applicants, setApplicants] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [page, setPage] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const { state } = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    const showPopUp = localStorage.getItem("popUp");
    setPopUp(showPopUp);
  }, []);

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    if (isEmpty(tempUser)) {
      return navigation("/");
    }
    setUserDetail(tempUser);
    getJobs(page);
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
        <div style={{ color: "#43AFFF" }}>Login</div>
        <div style={{ color: "#303F60" }}>You have succesfully logged in.</div>
      </div>
    );
  };

  const getJobs = (currentPage = 1) => {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "get",
      url: `https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=${currentPage}`,
      headers: {
        Authorization: userDetail?.token || tempUser?.token,
      },
    })
      .then((response) => {
        console.log("jobPortal>>>>success>>>>>", response);
        setJobs(response.data.data.data);
        setMetaData(response.data.data.metadata);
      })
      .catch((error) => {
        console.log("jobPortal>>>>error>>>>>", error);
      });
  };

  const viewApplications = (id) => {
    axios({
      method: "get",
      url: `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${id}/candidates`,
      headers: {
        Authorization: userDetail.token,
      },
    })
      .then((response) => {
        setShowApplications(true);
        console.log("viewApplicants>>>>success>>>>>", response);
        setApplicants(response.data.data);
      })
      .catch((response) => {
        console.log("viewApplicants>>>>error>>>>>", response);
      });
  };

  const JobCard = ({ job }) => {
    const { title, description, location, id } = job || {};
    return (
      <div className="jobContainer">
        <div className="jobHeading">{title}</div>
        <div className="jobContent">{description}</div>
        <div className="jobContent">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className="location" src={require("../img/location@2x.png")} />
            {location}
          </div>
          <button className="jobCardBtn" onClick={() => viewApplications(id)}>
            View Applications
          </button>
        </div>
      </div>
    );
  };

  const NoJob = () => {
    return (
      <div className="noJob-container">
        <img className="noJob-image" src={require("../img/writing@2x.png")} />
        <div>Your posted jobs will show here!</div>
        <div>
          <button type="submit">Post a Job</button>
        </div>
      </div>
    );
  };

  const NoApplicants = () => {
    return (
      <div className="NoApplicants-container">
        <img
          className="NoApplicants-image"
          src={require("../img/curriculum@2x.png")}
        />
        <div>No applications available!</div>
      </div>
    );
  };

  const ApplicantCard = ({ applicant }) => {
    const { email, name = "", skills } = applicant || {};

    return (
      <div className="applicantContainer">
        <div className="applicantDetails">
          <div className="applicantIntials">{name[0].toUpperCase()}</div>
          <div className="applicantAuth">
            <div>{name}</div>
            <div style={{ opacity: 0.8 }}>{email}</div>
          </div>
        </div>
        <div className="applicantSkills">
          <div className="skillHeading">Skill</div>
          <div className="skillContent">{skills}</div>
        </div>
      </div>
    );
  };

  const Applications = () => {
    return (
      <div className="applicationContainer">
        <div className="applicationInnerContainer">
          <div className="applicationHeading">
            <div>Applications for this job</div>
            <img
              onClick={() => {
                setShowApplications(false);
                setApplicants([]);
              }}
              className="cross-icon"
              src={require("../img/cross@2x.png")}
            />
          </div>
          <div className="applicationSubContainer">
            <div style={{ padding: "8px 0px" }}>
              Total {applicants?.length || 0} applications
            </div>
            <div className="applicantsContainer">
              {applicants && applicants?.length ? (
                applicants.map((applicant) => (
                  <ApplicantCard applicant={applicant} />
                ))
              ) : (
                <NoApplicants />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const prevPage = () => {
    if (page > 1) {
      getJobs(page - 1);
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    const { count, limit } = metaData || {};
    const numberOfPages = count / limit;
    if (page < numberOfPages) {
      getJobs(page + 1);
      setPage(page + 1);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {showApplications ? <Applications /> : null}
      {popUp && <PopUp />}
      <div className="topSection jobPortal">
        <Navbar userDetail={userDetail} setUserDetail={setUserDetail} />
        <div className="content" style={{ flexDirection: "column" }}>
          <div className="textStyle">
            <img className="house" src={require("../img/home@2x.png")} />
            Home
          </div>
          <div className="textStyle">Jobs posted by you</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "70vh",
            }}
          >
            {jobs && jobs.length ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                <div className="pagination">
                  <img onClick={prevPage} src={require("../img/Prev@2x.png")} />
                  <div>{page}</div>
                  <img onClick={nextPage} src={require("../img/Nex@2x.png")} />
                </div>
              </>
            ) : (
              <NoJob />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
