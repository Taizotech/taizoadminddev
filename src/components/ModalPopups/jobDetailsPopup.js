/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Modal, Tooltip } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import { IoCopy } from "react-icons/io5";
import companylogo from "../../assets/images/Company-Logo.png";
import styles from "./jobDetail.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  PutRetentionByAdminId,
  getJobDetails,
  GetAllsdminDetails,
  PutAssignTo,
  PutClosedJobs,
} from "../../apiServices";
import { useDispatch } from "react-redux";
import { commonPopupActions } from "../../redux-store/store";
import { useSelector } from "react-redux";
import { MyModal, TimeAgo } from "../../utility";
import SuccessTick from "../success_tick";
import { webConsoleBaseUrl } from "../../App";
import interviewStyle from "./Candidatedetails.module.scss";
import ModalContainer from "../modal_popup";
import ConfirmationPopup from "./confirmationPopup";
import { BsFileEarmarkPostFill, BsThreeDotsVertical } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";

import SendInterviewEmailAlert from "../../pages/Tabsview/Jobs/components/sendInterviewEmailAlertPopup";
import { RiFileCloseFill } from "react-icons/ri";

const JobDetailsPopup = (props, data, onAssignChange, onClose, ReloadPage) => {
  const adminId = localStorage.getItem("adminID");
  const jobId = props.Id;
  const [jobDetails, setJobDetails] = useState({ data: {}, show: false });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [showSendEmailAlert, setShowSendEmailAlert] = useState(false);
  const [showSuccess1, setshowSuccess1] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(false);
  const [Closedjob, setClosedjob] = useState(false);
  const [retentionData, setRetentionData] = useState({
    id: "",
    retention: false,
  });
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID === 1;
  const [assignAdminto, setAssignAdminto] = useState({
    jobId: "",
    adminId: "",
  });
  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });
  const [activeTab, setActiveTab] = useState("tab2");
  // const [open, setOpen] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const Dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
    // overflow: "auto",
  };

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Ensure jobId and adminId are defined and not empty strings
    if (jobId && assignAdminto.adminId) {
      PutAssignTo(jobId, assignAdminto.adminId).then((data) => {
        console.log(data, "kdksjkbbh");
        if (data.code !== 200) {
          alert("something went wrong");
          return false;
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // onClose();
        }, 3000);
        // onAssignChange();
      });
    } else {
      console.error("Invalid jobId or adminId:", jobId, assignAdminto.adminId);
    }
  }, [assignAdminto, jobId]);

  function handleClose() {
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "hide",
      })
    );
    // ReloadPage();
  }

  useEffect(() => {
    getJobDetails(jobId).then((data) => {
      setJobDetails((prev) => ({ ...prev, data: data, show: true }));
    });
  }, []);

  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminName = data.map((item) => item.userName);
      const adminid = data.map((item) => item.id);
      console.log(adminName);
      console.log(adminid);
      setAdminDetails((prev) => ({
        ...prev,
        adminName: adminName,
        id: adminid,
      }));
    });
  }, []);

  const handleLeadAssignfromAdmin = (jobId, adminId) => {
    // let selectedAdminName = event.target.value;
    setAssignAdminto((prev) => ({
      ...prev,
      adminId: adminId,
      jobId: jobId,
    }));
  };

  useEffect(() => {
    console.log(jobDetails);
  }, [jobDetails]);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  // const handleAssignJob = async () => {
  //   if (selectedAdmin) {
  //     console.log("Assigning job to admin:", selectedAdmin);

  //     try {
  //       const adminId = selectedAdmin.adminId;
  //       console.log("Admin ID:", adminId); // Log adminId to check its value
  //       const response = await PutAssignTo(jobId, adminId);
  //       console.log("Assignment response:", response);

  //       // Handle the response as needed
  //       // Update the UI or perform any other actions based on the response
  //     } catch (error) {
  //       console.error("Error assigning job:", error);
  //     }
  //   } else {
  //     // Handle the case where no admin is selected
  //     console.error("No admin selected for assignment");
  //   }
  // };
  function copyToClipboard(text) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  function handleRetension(id, event) {
    let isChecked = event.target.checked;

    console.log(isChecked, "JobID or id");
    if (isChecked) {
      PutRetentionByAdminId(id).then((data) => {
        setShowConfirmPopup(false);
        console.log(data, "skfhijshfsyfiuy78y7wegrhweghjrgwhjgjh");
        getJobDetails(jobId).then((data) => {
          setJobDetails((prev) => ({ ...prev, data: data, show: true }));
        });
      });
    }
  }
  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function showSendInterview() {
    setShowSendEmailAlert(true);
  }

  function hideSendInterview() {
    setShowSendEmailAlert(false);
  }

  // function ConfirmFormSubmit() {
  //   PutRetentionByAdminId(retentionData.id).then((data) => {
  //     // setShowConfirmPopup(false);
  //     console.log(data, "skfhijshfsyfiuy78y7wegrhweghjrgwhjgjh");
  //     getJobDetails(jobId).then((data) => {
  //       setJobDetails((prev) => ({ ...prev, data: data, show: true }));
  //     });
  //   });
  // }
  const [closedJobLoading, setClosedJobLoading] = useState(false);

  const handleClosedJobs = () => {
    setClosedJobLoading(true);

    PutClosedJobs(jobDetails.data.jobDetails.id).then((data) => {
      setClosedJobLoading(false);
      setshowSuccess1(true);
      console.log(data, "data");
      setTimeout(() => {
        setshowSuccess1(false);
      }, 3000);
      setClosedjob(false);
      getJobDetails(jobId).then((data) => {
        setJobDetails((prev) => ({ ...prev, data: data, show: true }));
      });
      ReloadPage();
    });
  };
  return (
    <>
      {jobDetails.show && (
        <>
          <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className=""
          >
            {/* <Box sx={style} className={`${styles.box}`}> */}

            {/* </Box> */}
            <>
              <Box sx={style} className={`${styles.box}`}>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2"> */}

                {/* </Typography> */}

                <div>
                  <div className="d-grid justify-content-end">
                    <div>
                      <button
                        className=" btn btn-outline-danger p-1 "
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="modal-modal-description"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "70vh",
                  }}
                >
                  <div className="">
                    {showConfirmPopup && (
                      <MyModal>
                        <ModalContainer
                          childComponent={
                            <ConfirmationPopup
                              heading={"Confirmation"}
                              headingText={` Are you sure you want to confirm  the Retension ? `}
                              // onConfirm={ConfirmFormSubmit}
                              enableSubmit={enableSubmit}
                              onRequestClose={handleConfirmationClose}
                              //</br> with <b>${contactPersonName}</b>
                            />
                          }
                        />
                      </MyModal>
                    )}
                    <div style={{textAlign:"center"}}><h4>{jobDetails.data.jobDetails.collarType}</h4></div>
                    <div className={`d-grid justify-content-center `}>
                      <div className=" container ">
                        <div className="d-flex justify-content-between">
                          <div>
                            {" "}
                            <p className="text-bold">Job Details</p>
                          </div>
                          <div>
                            <p className="text-secondary">
                              Posted{" "}
                              <TimeAgo
                                dateValue={
                                  jobDetails.data.jobDetails.jobPostedTime
                                }
                              />{" "}
                              ago
                            </p>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-sm-6 d-flex">
                            {/* <p
                            className={`bg-dark text-light rounded-1 pt-1 px-3 ${styles.job_id}`}
                          >
                            Full Time
                          </p> */}
                            <p
                              className={` bg-success text-light rounded-1 mx-1 mt-2 text-center pt-1 px-3 ${styles.job_id}`}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {/* Job id:{jobDetails.data.jobDetails.id} */}
                              <Typography>
                                Job id: {jobDetails.data.jobDetails.id}
                              </Typography>
                              <IconButton
                                style={{ fontSize: "16px", color: "white" }}
                                onClick={() =>
                                  copyToClipboard(jobDetails.data.jobDetails.id)
                                }
                              >
                                <IoCopy />
                              </IconButton>
                            </p>
                            <div className={` ${interviewStyle.chips_wrp}`}>
                              <input
                                type="checkbox"
                                name={`retension_${jobDetails.data.jobDetails.id}`}
                                id={`retentionByAdminId_${jobDetails.data.jobDetails.id}`}
                                checked={
                                  jobDetails.data.jobDetails.retentionByAdminId
                                }
                                onChange={(event) =>
                                  handleRetension(
                                    jobDetails.data.jobDetails.id,
                                    event
                                  )
                                }
                                onClick={handleCheckboxClick}
                              />
                              {/* {jobDetails.data.jobDetails.retentionByAdminId &&
                              isChecked ? (
                                <Tooltip title="Retention">
                                  <label
                                    htmlFor={`retentionByAdminId_${jobDetails.data.jobDetails.id}`}
                                  >
                                    Retention
                                  </label>
                                </Tooltip>
                              ) : (
                                <label
                                  htmlFor={`retentionByAdminId_${jobDetails.data.jobDetails.id}`}
                                >
                                  Retention
                                </label>
                              )} */}
                              {/* <label htmlFor={``}>Retension</label> */}
                              {/* <div
                              className={`btn rounded-4 ${styled.buttom_candi_list1}`}
                              onClick={(event) =>
                                handleRetension(jobDetails.data.jobDetails.id)
                              }
                              // onClick={handleRetentionConfirm}
                            ></div> */}
                            </div>{" "}
                            <p
                              className={`text-dark rounded-1 mx-1 mt-2 text-center pt-1 px-3 ${styles.job_id}`}
                            >
                              Job Status :{" "}
                              <b>
                                {jobDetails.data.jobDetails.jobStatus ===
                                "C" ? (
                                  <span className="text-danger">Closed</span>
                                ) : (
                                  <span className="text-success">Open</span>
                                )}
                              </b>
                            </p>{" "}
                          </div>
                          <div className="col-sm-6 d-flex align-items-center justify-content-end gap-2">
                            <div>
                              {" "}
                              <div>
                                {" "}
                                <div class="btn-group dropstart">
                                  <button
                                    type="button"
                                    // class="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                      border: "none",
                                      background: "none",
                                      color: "#000",
                                      cursor: "pointer",
                                      outline: "none",
                                      position: "relative",
                                      right: "5px",
                                      // backgroundColor: "red",
                                      fontSize: 20,
                                      zIndex: 1,
                                    }}
                                  >
                                    <BsThreeDotsVertical />
                                  </button>
                                  <ul class="dropdown-menu">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href={`https://www.taizo.in/waNotifications/customPostJobPageUpdate.html?jobId=${jobDetails.data.jobDetails.id}`}
                                        target="_blank"
                                        style={{
                                          textDecoration: "none",
                                        }}
                                      >
                                        <BsFileEarmarkPostFill className="me-3" />{" "}
                                        Update
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href={`https://www.taizo.in/waNotifications/customPostJobPage.html?employer_id=${
                                          jobDetails.data.jobDetails.employerId
                                        }&adminId=${localStorage.getItem(
                                          "adminID"
                                        )}`}
                                        style={{
                                          textDecoration: "none",
                                        }}
                                        target="_blank"
                                      >
                                        <BsFileEarmarkPostFill className="me-3" />
                                        New Job post
                                      </a>
                                    </li>

                                    <li>
                                      <span
                                        className="dropdown-item"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          showSendInterview();
                                        }}
                                      >
                                        {" "}
                                        <HiBellAlert /> Interview alert
                                      </span>
                                    </li>

                                    {/* <li>
                                      <a class="dropdown-item" href="#"></a>
                                    </li> */}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div>
                              {jobDetails.data.jobDetails.jobStatus === "O" && (
                                <div className="btn btn-danger">
                                  <span
                                    className="dropdown-item "
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setClosedjob(true);
                                    }}
                                  >
                                    {" "}
                                    <RiFileCloseFill /> Job Close
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3 mb-3">
                          <div className="col-sm-12 d-flex flex-column flex-sm-row">
                            <div className="col-sm-2">
                              <div className=" rounded-3 p-3">
                                <img
                                  src={companylogo}
                                  alt="My Image"
                                  width={50}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <h6>
                                {/* Job Category : */}
                                <b> {jobDetails.data.jobDetails.jobCategory}</b>
                              </h6>
                              {/* <p>
                                <i className="fa-solid fa-building"></i>{" "}
                                {jobDetails.data.jobDetails.industry}
                              </p> */}
                              <p>
                                <i className="fa-solid fa-wallet"></i> ₹
                                {jobDetails.data.jobDetails.salary} - ₹{" "}
                                {jobDetails.data.jobDetails.maxSalary}
                              </p>
                              <p>
                                No of openings :{" "}
                                <b>{jobDetails.data.jobDetails.noOfOpenings}</b>
                              </p>
                            </div>
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <p>
                                    <Autocomplete
                                      freeSolo
                                      id="AssignTo"
                                      disableClearable
                                      onChange={(event, newValue) => {
                                        if (newValue) {
                                          const selectedAdminName = newValue;

                                          // Check if adminDetails and its properties are not null
                                          if (
                                            adminDetails &&
                                            adminDetails.adminName &&
                                            adminDetails.id &&
                                            adminDetails.adminName.indexOf &&
                                            adminDetails.id.indexOf
                                          ) {
                                            const adminNameIndex =
                                              adminDetails.adminName.indexOf(
                                                selectedAdminName
                                              );

                                            // Check if the selectedAdminName exists in the adminName array
                                            if (
                                              adminNameIndex !== -1 &&
                                              adminDetails.id[
                                                adminNameIndex
                                              ] !== undefined
                                            ) {
                                              const adminId =
                                                adminDetails.id[adminNameIndex];
                                              handleLeadAssignfromAdmin(
                                                data.id,
                                                adminId
                                              );
                                            } else {
                                              // Handle the case where selectedAdminName is not found
                                              console.error(
                                                `Admin with name ${selectedAdminName} not found.`
                                              );
                                            }
                                          } else {
                                            // Handle the case where adminDetails or its properties are null
                                            console.error(
                                              "Invalid adminDetails structure"
                                            );
                                          }
                                        }
                                      }}
                                      value={
                                        adminDetails.adminName &&
                                        adminDetails.id &&
                                        adminDetails.adminName[
                                          adminDetails.id.indexOf(data.assignTo)
                                        ]
                                      }
                                      options={adminDetails.adminName}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Assign to"
                                          InputProps={{
                                            ...params.InputProps,
                                            type: "search",
                                          }}
                                        />
                                      )}
                                    />
                                  </p>
                                </div>

                                {/* <div className="col-sm-6">
                                  <p className="text-dark mt-1">
                                    <div
                                      className={`btn rounded-2 `}
                                      style={{
                                        backgroundColor: "#169C50",
                                      }}
                                    >
                                      <a
                                        href={`${webConsoleBaseUrl}/waNotifications/customPostJobPageUpdate.html?jobId=${jobDetails.data.jobDetails.id}`}
                                        target="_blank"
                                        style={{
                                          textDecoration: "none",
                                          color: "white",
                                        }}
                                      >
                                        update
                                      </a>
                                    </div>
                                  </p>
                                </div> */}

                                {/* <div className="col-sm-6">
                                  <p className="d-flex justify-content-end mt-3">
                                    <a
                                      href={`${webConsoleBaseUrl}/waNotifications/customPostJobPage.html?employer_id=${
                                        jobDetails.data.jobDetails.employerId
                                      }&adminId=${localStorage.getItem(
                                        "adminID"
                                      )}`}
                                      target="_blank"
                                    >
                                      <div
                                        className="btn btn-success px-3"
                                        style={{
                                          backgroundColor: "#169C50",
                                        }}
                                      >
                                        <BsFileEarmarkPostFill
                                          className="me-3"
                                          // textAnchor=""
                                        />
                                        Job post
                                      </div>
                                    </a>
                                  </p>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-sm-4">
                          <div>
                            No.of vacancy :{" "}
                            <b>{jobDetails.data.jobDetails.noOfOpenings}</b>
                          </div>
                          <div>
                            Interview attended :{" "}
                            <b>{jobDetails.data.jobDetails.totalCanResponse}</b>
                          </div>
                          <div>
                            Interview selected :{" "}
                            <b>{jobDetails.data.jobDetails.totalCanResponse}</b>
                          </div>
                          <div>
                            {" "}
                            Interview joined :{" "}
                            <b>{jobDetails.data.jobDetails.totalCanResponse}</b>
                          </div>
                          <div>
                            Interview rejected :{" "}
                            <b>{jobDetails.data.jobDetails.totalCanResponse}</b>
                          </div>
                        </div> */}
                        </div>
                        <div className="row">
                          <ul
                            className={`nav nav-tabs ${styles.nav_tabr}`}
                            // activeTab === "tab1" ? "bg-color1" : "bg-color2"
                          >
                            {/* <li
                            className={`nav-item ${styles.nav_items} ${
                              activeTab === "tab1" ? styles.active : ""
                            }`}
                          >
                            <button
                              className={`nav-link ${styles.nav_links}`}
                              onClick={() => handleClick("tab1")}
                            >
                              Job Overview
                            </button>
                          </li> */}
                            <li
                              className={`nav-item mx-1 ${styles.nav_items} ${
                                activeTab === "tab2" ? styles.active : ""
                              }`}
                            >
                              <button
                                className={`nav-link ${styles.nav_links}`}
                                onClick={() => handleClick("tab2")}
                              >
                                Job Details
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className={`${styles.tab_content1}`}>
                          {activeTab === "tab2" && (
                            <div className={`tab-pane ${style.active}`}>
                              <div className="row">
                                <div className={`mb-1 ${styles.text_bold}`}>
                                  Job Details
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div className="">
                                      <div>
                                        <div>
                                          <b>Industry</b> :{" "}
                                          {jobDetails.data.jobDetails.industry}
                                        </div>
                                        <b>Job Type</b> :{" "}
                                        {jobDetails.data.jobDetails.jobType}
                                      </div>

                                      <div>
                                        <b>Min Experience</b> :{" "}
                                        {jobDetails.data.jobDetails.jobExp} -{" "}
                                        {jobDetails.data.jobDetails.jobMaxExp}
                                      </div>
                                      <div>
                                        <b>Gender</b> :{" "}
                                        {jobDetails.data.jobDetails.gender}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div>
                                      <b>Education</b> :
                                      {jobDetails.data.jobDetails.qualification}
                                    </div>
                                    <div>
                                      <b>Key skills</b> :{" "}
                                      {jobDetails.data.jobDetails.keyskills}
                                    </div>
                                    <div>
                                      <b>Benefits </b>:{" "}
                                      {jobDetails.data.jobDetails.benefits}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/**second row */}
                              {jobDetails.data.jobDetails.jobDescription !=
                              "" ? (
                                <div className="row">
                                  <div
                                    className={`mb-1 mt-4 ${styles.text_bold}`}
                                  >
                                    Job Description
                                  </div>
                                  <div className="col-sm-12">
                                    <div
                                      className={` rounded-2 ${styles.address}`}
                                    >
                                      {
                                        jobDetails.data.jobDetails
                                          .jobDescription
                                      }
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                " "
                              )}

                              <div className="row">
                                <div
                                  className={`mb-1 mt-4 ${styles.text_bold}`}
                                >
                                  Job Location
                                </div>
                                <div className="col-sm-12">
                                  <div
                                    className={` rounded-2 ${styles.address}`}
                                  >
                                    <b>Company Name : </b>{" "}
                                    {jobDetails.data.jobDetails.companyName}{" "}
                                    <br />
                                    {jobDetails.data.jobDetails.jobLocationAddr}
                                  </div>
                                </div>
                              </div>
                              {/**third row */}
                              <div className="row">
                                <div
                                  className={`mb-1 mt-4 ${styles.text_bold}`}
                                >
                                  Contact Details
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div>
                                      <b>Contact Person</b> :{" "}
                                      {
                                        jobDetails.data.jobDetails
                                          .contactPersonName
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div>
                                      <b> Contact number</b> :{" "}
                                      {jobDetails.data.jobDetails.mobileNumber}
                                    </div>
                                    <div>
                                      <b>Whatsapp number</b> :
                                      {
                                        jobDetails.data.jobDetails
                                          .whatsappNumber
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/**Fourth row */}
                              <div className="row">
                                <div
                                  className={`mb-1 mt-4 ${styles.text_bold}`}
                                >
                                  Additional Details
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div>
                                      <b>Work hour</b> :{" "}
                                      {jobDetails.data.jobDetails.workHours}
                                    </div>
                                    <div>
                                      <b>Shift type</b>:{" "}
                                      {jobDetails.data.jobDetails.shiftType}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div>
                                      <b>Over Time</b> :{" "}
                                      {jobDetails.data.jobDetails.ot}
                                    </div>
                                    <div>
                                      <b>Company Location</b>:{" "}
                                      <b>
                                        <a
                                          target="_blank"
                                          href={
                                            jobDetails.data.jobDetails
                                              .companyLocationUrl
                                          }
                                        >
                                          open_company_location
                                        </a>
                                      </b>
                                    </div>

                                    <div>
                                      <b>Job Description </b>:{" "}
                                      {jobDetails.data.jobDetails
                                        .jobDescriptionLink != null ? (
                                        <b>
                                          <a
                                            target="_blank"
                                            href={
                                              jobDetails.data.jobDetails
                                                .jobDescriptionLink
                                            }
                                          >
                                            JD_link
                                          </a>
                                        </b>
                                      ) : (
                                        "--"
                                      )}
                                    </div>

                                    {/* <div>
                                      <b>Job Description </b>:{" "}
                                      {
                                        jobDetails.data.jobDetails
                                          .jobDescription
                                      }
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "tab1" && (
                            <div className={`tab-pane ${style.active}`}>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Numquam, suscipit soluta
                                libero quae in eaque? Est porro debitis saepe
                                architecto doloribus reprehenderit pariatur
                                veniam, laborum, quas distinctio earum harum,
                                deserunt itaque aut iusto nesciunt officia iste!
                                Provident, ad. Nam cumque excepturi sequi
                                debitis hic maiores, dolorem facere quam vero
                                non.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {selectedAdmin && (
                  <MyModal>
                    <ModalContainer
                      zIndex={2000}
                      childComponent={
                        <>
                          <p style={{ width: "600px" }}>
                            <Autocomplete
                              freeSolo
                              id="AssignTo"
                              disableClearable
                              sx={{ zIndex: 2002 }}
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  const selectedAdminName = newValue;

                                  // Check if adminDetails and its properties are not null
                                  if (
                                    adminDetails &&
                                    adminDetails.adminName &&
                                    adminDetails.id &&
                                    adminDetails.adminName.indexOf &&
                                    adminDetails.id.indexOf
                                  ) {
                                    const adminNameIndex =
                                      adminDetails.adminName.indexOf(
                                        selectedAdminName
                                      );

                                    // Check if the selectedAdminName exists in the adminName array
                                    if (
                                      adminNameIndex !== -1 &&
                                      adminDetails.id[adminNameIndex] !==
                                        undefined
                                    ) {
                                      const adminId =
                                        adminDetails.id[adminNameIndex];
                                      handleLeadAssignfromAdmin(
                                        data.id,
                                        adminId
                                      );
                                    } else {
                                      // Handle the case where selectedAdminName is not found
                                      console.error(
                                        `Admin with name ${selectedAdminName} not found.`
                                      );
                                    }
                                  } else {
                                    // Handle the case where adminDetails or its properties are null
                                    console.error(
                                      "Invalid adminDetails structure"
                                    );
                                  }
                                }
                              }}
                              value={
                                adminDetails.adminName &&
                                adminDetails.id &&
                                adminDetails.adminName[
                                  adminDetails.id.indexOf(data.assignTo)
                                ]
                              }
                              options={adminDetails.adminName}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Assign to"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
                                />
                              )}
                            />
                          </p>
                        </>
                      }
                    />
                  </MyModal>
                )}
                {showSuccess && (
                  <MyModal>
                    <ModalContainer
                      zIndex={2000}
                      childComponent={
                        <SuccessTick HeadText="Successfully Updated" />
                      }
                    />
                  </MyModal>
                )}
              </Box>
            </>
          </Modal>
        </>
      )}{" "}
      {showSendEmailAlert && (
        <SendInterviewEmailAlert
          companyName={jobDetails.data.jobDetails.companyName}
          jobId={jobDetails.data.jobDetails.id}
          emailId={jobDetails.data.jobDetails.emailId}
          onClose={hideSendInterview}
        />
      )}
      {Closedjob && (
        <>
          <MyModal>
            <ModalContainer
              zIndex={10000}
              childComponent={
                <>
                  <div style={{ width: "400px" }}>
                    <p>
                      Are you sure you want to{" "}
                      <span className="text-danger">close the job</span>?
                    </p>
                    <div className="d-flex justify-content-end gap-2">
                      <div
                        className="btn btn-danger"
                        onClick={() => {
                          setClosedjob(false);
                        }}
                      >
                        No
                      </div>
                      <div
                        className="btn btn-success"
                        onClick={handleClosedJobs}
                        disabled={closedJobLoading}
                      >
                        {closedJobLoading ? "Processing..." : "Yes"}
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>{" "}
        </>
      )}
      {showSuccess1 && (
        <MyModal>
          <ModalContainer
            zIndex={12000}
            childComponent={<SuccessTick HeadText="Successfully" />}
          />
        </MyModal>
      )}
    </>
  );
};

export default JobDetailsPopup;
