/* eslint-disable valid-typeof */
import React, { useEffect, useState } from "react";
import accordionstyle from "../CandidateQualifyForm/QualifyForm.module.scss";
import {
  GetCandidateQualifyDetials,
  GetCandidateQualifyForm,
  PutUpdateExperienceStatus,
} from "../../../apiServices";
import UpdateExperinenceWorkingform from "./UpdateExperinenceWorkingform";


function UpdateExperienceForm({ mobileNumber, whatsappNumber, Reloadpage }) {
  const CandidateMobilenumber = mobileNumber;
  const Candidatewhatsappnumber =
    whatsappNumber != null ? whatsappNumber : null;
  const [selectCandidateStatus, setselectCandidateStatus] = useState(null);

  useEffect(() => {
    if (CandidateMobilenumber) {
      GetCandidateQualifyForm(CandidateMobilenumber)
        .then((data) => {
          console.log(data, "data");
          if (data.currentlyworking !== null
          ) {
            setselectCandidateStatus(data.currentlyworking);
            console.log(data.currentlyworking,"data.currentlyworking");
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

    PutUpdateExperienceStatus(mobileNumber, selectedValue).then((data) => {
      console.log("Data Format", data, "mobile number ", mobileNumber,selectedValue);
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
          <UpdateExperinenceWorkingform
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

export default UpdateExperienceForm;
