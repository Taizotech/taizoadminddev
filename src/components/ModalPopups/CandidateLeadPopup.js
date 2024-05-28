import React from "react";
import { useEffect, useState } from "react";
import CandidateLead from "./CandidateLead.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { getCandidateLead } from "../../apiServices";

function CandidateLeadPopup({ id, onClose }) {
  const [candidateData, setCandidateData] = useState(null);

  useEffect(() => {
    getCandidateLead(id)
      .then((data) => {
        console.log("Data fetched:", data);
        setCandidateData(data);
      })
      .catch((error) => {
        console.error("Error fetching candidate data:", error);
      });
  }, [id]);

  return (
    <>
      <div>
        <div className={`${CandidateLead.Modalbox}`}>
          {" "}
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h2 className="text-center"> Candidate Lead Details </h2>
            </div>
            <div className="col-2 d-flex justify-content-end">
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
                <span style={{ color: "#808080" }}>{candidateData?.name}</span>
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
                <b style={{ fontWeight: "bold" }}>Date Of Birth : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.dateOfBirth}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Gender : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.gender}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Preferred Location : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.prefLocation}
                </span>
              </p>
              {/* <p><b>Age :</b> {candidateData?.age}</p> */}
            </div>

            {/* Section 2: Education and Experience */}
            <div className="col-sm-6">
              <h4>Educational Details</h4>
              <p>
                <b style={{ fontWeight: "bold" }}>Courses : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.courses}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Qualification : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.qualification}
                </span>
              </p>

              <p>
                <b style={{ fontWeight: "bold" }}>Specification : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.specification}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Student : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.student}
                </span>
              </p>
            </div>
            {/* Section 3: Location and Preferences */}
            <div className="col-sm-6">
              <h4>Work Details</h4>
              <p>
                <b style={{ fontWeight: "bold" }}>
                  Experience In Manufacturing :
                </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.expInManufacturing}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Experience Months : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.expMonths}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Experience Years : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.expYears}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Experienced : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.experienced}
                </span>
              </p>
              {/* <p><b style={{ fontWeight: 'bold' }}>Country :</b><span style={{color: '#808080' }}>{candidateData?.country}</span></p> */}
              {/* <p><b style={{ fontWeight: 'bold' }}>State :</b><span style={{color: '#808080' }}>{candidateData?.state}</span></p> */}
              <p>
                <b style={{ fontWeight: "bold" }}>Preferred City : </b>
                <span style={{ color: "#808080" }}>{candidateData?.city}</span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Preferred Area : </b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.prefArea}
                </span>
              </p>
            </div>

            {/* Section 5: Employment Details */}
            <div className="col-sm-6">
              <h4>Other Details</h4>
              <p>
                <b style={{ fontWeight: "bold" }}>Reference :</b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.reference}
                </span>
              </p>
              {/* <p><b style={{ fontWeight: 'bold' }}>Is Having Arrear :</b><span style={{color: '#808080' }}>{candidateData?.isHavingArrear}</span></p> */}
              <p>
                <b style={{ fontWeight: "bold" }}>Contact Number :</b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.contactNumber}
                </span>
              </p>
              {/* <p><b style={{ fontWeight: 'bold' }}>Known Languages :</b><span style={{color: '#808080' }}>{candidateData?.knownLanguages}</span></p> */}
              <p>
                <b style={{ fontWeight: "bold" }}>Job Location :</b>
                <span style={{ color: "#808080" }}>
                  {candidateData?.jobLocation}
                </span>
              </p>
              {/* <p><b style={{ fontWeight: 'bold' }}>Looking For a Job :</b><span style={{color: '#808080' }}>{candidateData?.lookingForaJob}</span></p> */}
              {/* <p><b style={{ fontWeight: 'bold' }}>Currently Working :</b><span style={{color: '#808080' }}>{candidateData?.currentlyworking}</span></p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateLeadPopup;
