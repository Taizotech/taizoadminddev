/* eslint-disable no-unused-vars */
// import { Label } from "@mui/icons-material";
import React, { useState } from "react";
import { postInterview_schedule } from "../../apiServices";
import { MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import SuccessTick from "../../components/success_tick";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Candidate() {
  const [jobidError, setjobidError] = useState("");
  const navigate = useNavigate();
  const [candidateidError, setcandidateidError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [dateError, setDateError] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [intDetails, setIntDetails] = useState({
    date: "",
    jobid: "",
    candidateid: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    postInterview_schedule(intDetails)
      .then((response) => {
        console.log(response);

        let responeData = JSON.parse(response);
        if (responeData.status === 500) {
          // Display an alert when the post interview status is 500
          alert("Internal Server Error (Status 500) - Please try again later");
          setLoading(false);

          return;
        }

        setIsLoading(true);

        setTimeout(() => {
          setSubmissionStatus("success");
          setLoading(false);
          setIsLoading(false);
          setIntDetails({
            date: "",
            jobid: "",
            candidateid: "",
          });
          navigate("/interview_schedule_list");
        }, 2000);
      })
      .catch((error) => {
        if (error.status === 500) {
          // Display an alert when the post interview status is 500
          alert("Internal Server Error (Status 500) - Please try again later");
        }
        // Handle any errors here, such as network issues
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIntDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validatejobId = () => {
    if (intDetails.jobid.length < 1 || intDetails.jobid.length > 6) {
      setjobidError("please Enter 1 to 6 numbers");
    } else {
      setjobidError("");
    }
  };
  const validatecanid = () => {
    if (
      intDetails.candidateid.length < 1 ||
      intDetails.candidateid.length > 6
    ) {
      setcandidateidError("please Enter 1 to 6 numbers");
    } else {
      setcandidateidError("");
    }
  };
  const validateDate = () => {
    if (intDetails.date.length === 0) {
      setDateError("Select date");
    } else {
      setDateError("");
    }
  };
  return (
    <div>
      <div className="container">
        <header>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/interview_schedule_list"}
          >
            <div
              className="btn rounded-circle"
              style={{
                border: "2px solid #169c50",
                color: "#169c50",
                padding: "10px",
              }}
            >
              <AiOutlineArrowLeft style={{ fontSize: 30 }} />
            </div>
          </Link>
        </header>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-5 ">
        <div className="shadow p-3 mb-5 bg-body rounded col-sm-3">
          <h4 className="text-center text-success mb-5">Interview Schedule</h4>
          {/* {isLoading && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <Box
                    sx={{
                      width: "20vw",
                    }}
                  >
                    <div className="text-center">
                      <h3 className="mt-2">Loading...</h3>
                    </div>
                  </Box>
                }
              />
            </MyModal>
          )} */}
          {submissionStatus === "success" && (
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <SuccessTick HeadText="Successfully" />
                    <div className="text-center">
                      <button
                        className="btn btn-success w-50 text-center"
                        onClick={() => setSubmissionStatus(null)}
                      >
                        ok
                      </button>
                    </div>
                  </>
                }
              />
            </MyModal>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              <div className="col-sm-12 ">
                <label htmlFor="job_id">Job ID :</label>
                <input
                  type="number"
                  name="jobid"
                  placeholder="Job ID"
                  className="form-control"
                  value={intDetails.jobid}
                  onChange={handleChange}
                  onBlur={validatejobId}
                  required
                />
                {jobidError && <p className="para">{jobidError}</p>}
              </div>
              <div className="col-sm-12 mt-1">
                <label htmlFor="Candidate">Candidate ID :</label>
                <input
                  type="number"
                  name="candidateid"
                  placeholder="Candidate ID"
                  className="form-control"
                  value={intDetails.candidateid}
                  onChange={handleChange}
                  onBlur={validatecanid}
                  required
                />
                {candidateidError && <p className="para">{candidateidError}</p>}
              </div>
              <div className="col-sm-12 mt-1 mb-4">
                <label htmlFor="Candidate">Interview Schedule :</label>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                      validateDate(newValue);
                    }}
                    // minDate={minDate}
                  />
                </LocalizationProvider> */}
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={intDetails.date}
                  onChange={handleChange}
                  onBlur={validateDate}
                  required
                  min={today}
                  // max={maxDate}
                />
                {dateError && <p className="para">{dateError}</p>}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-outline-success px-5 "
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
