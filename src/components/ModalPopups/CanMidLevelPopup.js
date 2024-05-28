import React, { useEffect, useState } from "react";
import { GetCanMidLevePopup } from "../../apiServices";
import CandidateLead from "./CandidateLead.module.scss";
import CloseIcon from "@mui/icons-material/Close";

function CanMidLevelPopup({ id, onClose }) {
  const [candidateData, setCandidateData] = useState(null);
  useEffect(() => {
    GetCanMidLevePopup(id).then((data) => {
      console.log(data, "data");
      setCandidateData(data);
    });
  }, [id]);
  return (
    <div>
      <div className="container-fluid">
        <div className={`${CandidateLead.Modalbox}`}>
          {" "}
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <h2 className="text-center"> Candidate Details </h2>
            </div>
            <div className="col-sm-2 d-flex justify-content-end">
              {" "}
              <button
                onClick={() => {
                  onClose();
                }}
                className="btn btn-outline-danger"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
        <div style={{ overflowY: "auto", maxHeight: "400px", maxWidth: "650" }}>
          <div className="row mt-5 px-2">
            {/* Section 1: Personal Information */}
            <div className="col-sm-6">
              <h3>Basic details</h3>
              <p>
                <b style={{ fontWeight: "bold" }}>Name : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.firstName}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Mobile Number : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.mobileNumber}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Whatsapp Number : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.whatsappNumber}
                </span>
              </p>

              <p>
                <b style={{ fontWeight: "bold" }}>Preferred Location : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.prefJobLocation}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Resume : </b>
                {candidateData?.resumeLink != null ? (
                  <a
                    href={candidateData?.resumeLink}
                    target="_balnk"
                    rel="noopener noreferrer"
                    className="text-light text-decoration-none"
                  >
                    <button className="btn btn-primary px-5">Resume</button>
                  </a>
                ) : (
                  "-"
                )}
              </p>
              {/* <p><b>Age :</b> {candidateData?.age}</p> */}
            </div>
            <div className="col-sm-6">
              <h4>Work Details</h4>
              <p>
                <b style={{ fontWeight: "bold" }}>
                  Experience In Manufacturing :
                </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.expInManufacturing === true ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Experience Months : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.expInMonths}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Experience Years : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.expInYears}
                </span>
              </p>

              <p>
                <b style={{ fontWeight: "bold" }}>Preferred City : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.prefJobLocation}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Currently Working : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.currentlyWorking === true ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Joining Status : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.noticePeriod}
                </span>
              </p>
            </div>
            {/* Section 2: Education and Experience */}
            <div className="col-sm-6">
              <h4>Educational Details</h4>
              <p>
                <b style={{ fontWeight: "bold" }}>Qualification : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.educationalQualification}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanMidLevelPopup;
