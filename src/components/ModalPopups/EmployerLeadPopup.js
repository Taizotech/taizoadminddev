import React, { useEffect, useState } from "react";
import { GetEmployerLeadList, PostIntroMail } from "../../apiServices";
import CandidateLead from "./CandidateLead.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { MyModal, emailValidation } from "../../utility";
import ModalContainer from "../modal_popup";
import SuccessTick from "../success_tick";
import { LoadingButton } from "@mui/lab";

function EmployerLeadPopup({ data, onClose }) {
  const [candidateData, setCandidateData] = useState(null);
  const EmployerLead = useSelector(
    (state) => state.EmployerLeadDetails.EmployerLeadFilter
  );

  const [mailDetails, setMailDetails] = useState({
    ccMail: { val: "", err: "" },
    leadId: data.id,
    adminId: localStorage.getItem("adminID"),
  });

  const [show, setShow] = useState({
    resendIntro: false,
    showSuccess: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(show, "show");
  }, [show]);

  function handleIntroMailResend(e) {
    // e.preventDefault();
    let error = 0;
    if (mailDetails.ccMail.val) {
      if (!emailValidation(mailDetails.ccMail.val)) {
        setMailDetails((prev) => ({
          ...prev,
          ccMail: { ...prev.ccMail, err: "Please enter valid email id" },
        }));

        error++;
        // setShow((prev) => ({ ...prev, resendIntro: true }));
      } else {
        setMailDetails((prev) => ({
          ...prev,
          ccMail: { ...prev.ccMail, err: "" },
        }));
      }
    }

    if (error == 0) {
      setIsLoading(true);
      PostIntroMail(mailDetails)
        .then((data) => {
          setShow((prev) => ({ ...prev, showSuccess: true }));
        })
        .catch((err) => {
          alert("Something went wrong " + err);
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            handleClose();
          }, 3000);
        });
    }
  }

  function handleIntroMailChange(e) {
    let { value } = e.target;
    setMailDetails((prev) => ({ ...prev, ccMail: { val: value, err: "" } }));
  }

  function handleClose() {
    setShow({
      resendIntro: false,
      showSuccess: false,
    });
  }

  //   useEffect(() => {
  //     GetEmployerLeadList(EmployerLead).then((data) => {
  //       console.log(data, "data");
  //       setCandidateData(data.data.content);
  //     });
  //   }, [id]);

  return (
    <div>
      <div className="container-fluid">
        <div className={``}>
          {" "}
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <h5 className="text-center"> Employer Lead Details </h5>
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
        <div style={{ overflowY: "auto", maxHeight: "400px", width: "700px" }}>
          <div className="row mt-5 px-2">
            {/* Section 1: Personal Information */}
            <div className="col-sm-6">
              {/* <h3>Basic details</h3> */}
              <p>
                <b style={{ fontWeight: "bold" }}>Name : </b>
                <span style={{ color: "#808080" }}>
                  {data.contactPersonName || ""}
                </span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Mobile Number : </b>
                <span style={{ color: "#808080" }}>{data.mobileNumber}</span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Whatsapp Number : </b>
                <span style={{ color: "#808080" }}>{data.whatsappNumber}</span>
              </p>

              <p>
                <b style={{ fontWeight: "bold" }}>City: </b>
                <span style={{ color: "#808080" }}>{data.city}</span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Address : </b>
                <span style={{ color: "#808080" }}>{data.address}</span>
              </p>
              {/* <p><b>Age :</b> {candidateData?.age}</p> */}
            </div>
            <div className="col-sm-6">
              {/* <h4>Work Details</h4> */}
              <p className="">
                <b style={{ fontWeight: "bold" }}>Email Id : </b>
                <span style={{ color: "#808080" }}>{data.emailId}</span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Company Name : </b>
                <span style={{ color: "#808080" }}>{data.companyName}</span>
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Industry : </b>
                <span style={{ color: "#808080" }}>{data.industry}</span>
              </p>

              <p>
                <b style={{ fontWeight: "bold" }}>SLA Mail status : </b>
                <span style={{ color: "#808080" }}>
                  {data.slaEmailNotification === true ? "yes" : "No"}
                </span>
              </p>

              <p>
                <b style={{ fontWeight: "bold" }}>Intro Mail status : </b>
                <span style={{ color: "#808080" }}>
                  {data.emailNotification === true ? "yes" : "No"}
                </span>
              </p>

              <p>
                <Button
                  onClick={() =>
                    setShow((prev) => ({ ...prev, resendIntro: true }))
                  }
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Resend Intro
                </Button>
              </p>
            </div>
            {/* Section 2: Education and Experience */}

            {show.resendIntro && (
              <MyModal>
                <ModalContainer
                  zIndex="1001"
                  childComponent={
                    <>
                      <div>
                        <div className=" my-3">
                          Resend Intro mail to
                          <b> {data.companyName}</b>
                        </div>

                        <div className="d-grid justify-content-center">
                          <form
                            onSubmit={(e) => {
                              handleIntroMailResend(e);
                            }}
                            className="d-grid justify-content-center "
                            action=""
                          >
                            <div>
                              <TextField
                                id="outlined-basic"
                                label="CC mail (Optional)"
                                variant="outlined"
                                onChange={handleIntroMailChange}
                                value={mailDetails.ccMail.val}
                                // helperText={"Plase"}
                                // error={true}
                                helperText={mailDetails.ccMail.err}
                                error={Boolean(mailDetails.ccMail.err)}
                              />
                            </div>

                            <div className=" d-flex justify-content-center gap-3 flex-row mt-3">
                              <Button
                                onClick={(e) => {
                                  handleClose(e);
                                }}
                                variant="outlined"
                                color="error"
                                type="button"
                                size="small"
                              >
                                Cancel
                              </Button>

                              <LoadingButton
                                loading={isLoading}
                                type="submit"
                                size="small"
                                variant="contained"
                                disabled={isLoading}
                              >
                                Resend
                              </LoadingButton>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  }
                ></ModalContainer>
              </MyModal>
            )}

            {show.showSuccess && (
              <MyModal>
                <ModalContainer
                  zIndex="1002"
                  childComponent={
                    <>
                      <SuccessTick HeadText="Into mail send" />
                    </>
                  }
                />
              </MyModal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerLeadPopup;
