import React, { useState } from "react";
import { MyModal } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import ExperinenceWorkingform from "./ExperinenceWorkingform";
import accordionstyle from "./QualifyForm.module.scss";
import QualifyFresherform from "./FresherForm";
function OnclickButton() {
  const [openform, setopenform] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // To track the selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setopenform(true);
          }}
        >
          Open
        </button>
      </div>
      {openform && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <div className={`container d-flex mb-2`}>
                  <div className={`me-2 d-flex ${accordionstyle.radioInput}`}>
                    {/* <label className="form-check-label me-3"> */}
                    <input
                      type="radio"
                      name="fresher"
                      id="fresherYes"
                      value="fresher"
                      className={`form-check-input `}
                      checked={selectedOption === "fresher"}
                      onChange={handleOptionChange}
                    />
                    <label for="fresherYes">Fresher</label>
                    {/* </label> */}
                  </div>
                  <div className={`me-2 d-flex ${accordionstyle.radioInput}`}>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        name="experience"
                        id="experienceNo"
                        value="experience"
                        className={`form-check-input `}
                        checked={selectedOption === "experience"}
                        onChange={handleOptionChange}
                      />
                      <label for="experienceNo">Experience</label>
                    </label>
                  </div>
                </div>

                <div className={`${accordionstyle.Container}`}>
                  <div>
                    {selectedOption === "fresher" ? (
                      <QualifyFresherform />
                    ) : selectedOption === "experience" ? (
                      <ExperinenceWorkingform />
                    ) : null}
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </>
  );
}

export default OnclickButton;
