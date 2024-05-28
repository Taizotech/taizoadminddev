/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { postJobAlert } from "../../apiServices";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import { Box } from "@mui/material";
import SuccessTick from "../../components/success_tick";
function Alert() {
  const [Jobalert, setJobalert] = useState({
    Jobid: "",
    Candidateid: "",
  });
  const [JobidError, setJobidError] = useState("");
  const [CandiidError, setcandiidError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [JobalertError , setJobalertError]=useState({
  // })
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    postJobAlert(Jobalert).then((data) => {
      console.log(data);
      if (data !== "Job alert sent successfully") {
        // alert("Job Link Missing",data)

        setShowPopup(true);
        setJobalert({
          Jobid: "",
          Candidateid: "",
        });
        setIsSubmitting(false);

        return false;
      }

      setIsLoading(true);

      setTimeout(() => {
        setSubmissionStatus("success");
        setLoading(false);
        setIsLoading(false);
        setJobalert({
          Jobid: "",
          Candidateid: "",
        });
        setIsSubmitting(false);
      }, 2000);
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobalert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validatejobId = () => {
    if (Jobalert.Jobid.length < 1 || Jobalert.Jobid.length > 6) {
      setJobidError("please Enter 1 to 6 numbers");
    } else {
      setJobidError("");
    }
  };
  const validatecanid = () => {
    if (Jobalert.Candidateid.length < 1 || Jobalert.Candidateid.length > 6) {
      setcandiidError("please Enter 1 to 6 numbers");
    } else {
      setcandiidError("");
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="shadow p-3 mb-5 bg-body rounded col-sm-3">
          <h3 className="text-center mt-2 mb-3 text-success">Job Alert</h3>
          {isLoading && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <Box
                      sx={{
                        width: "30vw",
                      }}
                    >
                      {/* <div className={`${style.loading_spinner}`}></div> */}
                      <div className="text-center">
                        <h3 className="mt-2">Loading...</h3>
                      </div>
                    </Box>
                  </>
                }
              />
            </MyModal>
          )}
          {showPopup && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <Box
                      sx={{
                        width: "30vw",
                      }}
                    >
                      <h4 className="text-center">Job Link Missing</h4>
                      <div className="text-center">
                        <button
                          onClick={() => setShowPopup(false)}
                          className="btn btn-danger"
                        >
                          Close
                        </button>
                      </div>
                    </Box>
                  </>
                }
              />
            </MyModal>
          )}
          {submissionStatus === "success" && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <Box
                    sx={{
                      width: "20vw",
                    }}
                  >
                    <SuccessTick HeadText="Successfully" />
                    <div className="text-center">
                      <button
                        className="btn btn-success w-50 text-center"
                        onClick={() => setSubmissionStatus(null)}
                      >
                        ok
                      </button>
                    </div>
                  </Box>
                }
              />
            </MyModal>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="job_id">Job ID :</label>
                <input
                  type="number"
                  name="Jobid"
                  placeholder="Job ID"
                  className="form-control"
                  value={Jobalert.Jobid}
                  onChange={handleChange}
                  onBlur={validatejobId}
                  required
                />
                {JobidError && <p className="para">{JobidError}</p>}
              </div>
              <div className="col-sm-12 mt-2">
                <label htmlFor="Candi_id">Candidate ID : </label>
                <input
                  type="number"
                  name="Candidateid"
                  placeholder="Candidate ID"
                  className="form-control"
                  required
                  value={Jobalert.Candidateid}
                  onChange={handleChange}
                  onBlur={validatecanid}
                />
                {CandiidError && <p className="para">{CandiidError}</p>}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-success px-5 mt-5 mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading.." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Alert;
