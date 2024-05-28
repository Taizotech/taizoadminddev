/* eslint-disable valid-typeof */
import React, { useEffect, useState } from "react";
import accordionstyle from "./QualifyForm.module.scss";
// import {
//   GetCandidateQualifyDetials,
//   PutExperienceStatus,
// } from "../../../apiQualifyForm";
import ExperinenceWorkingform from "./ExperinenceWorkingform";
import {
  GetCandidateQualifyDetials,
  PutExperienceStatus,
} from "../../../apiServices";

function ExperienceForm({ mobileNumber, whatsappNumber, Reloadpage }) {
  const CandidateMobilenumber = mobileNumber;
  const Candidatewhatsappnumber =
    whatsappNumber != null ? whatsappNumber : null;
  const [selectCandidateStatus, setselectCandidateStatus] = useState(null);

  useEffect(() => {
    if (CandidateMobilenumber) {
      GetCandidateQualifyDetials(CandidateMobilenumber)
        .then((data) => {
          console.log(data, "data");
          if (
            data &&
            data.canLeadDetails &&
            data.canLeadDetails.currentlyworking !== null
          ) {
            setselectCandidateStatus(data.canLeadDetails.currentlyworking);
          } else {
            console.error("Error: Data or required properties are missing.");
          }
        })
        .catch((error) => {
          console.error("Error fetching candidate details:", error);
        });
    } else {
      console.error("Error: Candidate mobile number is missing.");
    }
  }, [CandidateMobilenumber, selectCandidateStatus]);

  const handleCandidateStatus = (event) => {
    const selectedValue = event.target.value;
    setselectCandidateStatus(selectedValue);

    PutExperienceStatus(mobileNumber, selectedValue).then((data) => {
      console.log("Data Format", data, "mobile number ", mobileNumber);
    });
  };

  return (
    <>
      <div className="d-flex container mt-3 mb-2">
        <div className={`me-2  ${accordionstyle.radioInput}`}>
          <input
            type="radio"
            name="currentlyWorking"
            id="currentlyWorkingYes"
            value="Yes"
            className="form-check-input"
            checked={selectCandidateStatus === "Yes"}
            onChange={handleCandidateStatus}
          />
          <label htmlFor="currentlyWorkingYes">Currently working</label>
        </div>
        <div className={`me-2  ${accordionstyle.radioInput}`}>
          <input
            type="radio"
            name="currentlyNotWorking"
            id="currentlyNotWorkingNo"
            value="No"
            className="form-check-input"
            checked={selectCandidateStatus === "No"}
            onChange={handleCandidateStatus}
          />
          <label htmlFor="currentlyNotWorkingNo">Currently not working</label>
        </div>
      </div>
      {selectCandidateStatus !== null && (
        <div>
          <ExperinenceWorkingform
            mobilenumber={
              CandidateMobilenumber !== null
                ? CandidateMobilenumber.toString()
                : "null"
            }
            whatsappNumber={
              Candidatewhatsappnumber !== null
                ? Candidatewhatsappnumber.toString()
                : "null"
            }
            Reloadpage={Reloadpage}
            candidateStatus={selectCandidateStatus}
          />
        </div>
      )}
    </>
  );
}

export default ExperienceForm;
