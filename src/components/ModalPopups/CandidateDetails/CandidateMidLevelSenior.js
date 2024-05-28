/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  DDMMYYYY_formate,
  Ddmmmyyyy_date,
  Detailsshow,
  MyModal,
  capitalizeWords,
  dateFormateDD,
} from "../../../utility";
import ModalContainer from "../../modal_popup";
import DetailsContainer from "../../DetailsContainer";
import Candidatedetailstyle from "./CandidateDetails.module.scss";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  GetCanMidLevePopup,
  PutCandidateAssignto,
  UploadMidSeniorResumes,
  PutCandidateDocument,
  PutCandidateIsQualified,
  getCandidateDocument,
  getDocumentCandidate,
  getcandidateDetails,
} from "../../../apiServices";
import uploadimage from "../../../assets/images/uploadfile.png";
import resume from "../../../assets/images/resume.png";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react";
import {
  PiDotsThreeOutlineVerticalFill,
  PiWarningCircleLight,
} from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaUpload, FaWhatsapp } from "react-icons/fa";
import flag from "../../../assets/images/flag.png";
import companylogo from "../../../assets/images/user.png";
import WhatsappImage from "../../../assets/images/whatsapp-logo-removebg-preview.png";
import {
  MdCall,
  MdOutlineContentCopy,
  MdOutlineUploadFile,
} from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import TimeLineForm from "../../../pages/Candidate/CandidateTimeLine/components/timeLinePost";
import { TextField, Backdrop, Button, Tooltip } from "@mui/material";
import {
  commonPopupActions,
  showHideDetailsActions,
} from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import SuccessTick from "../../success_tick";
import { GrNotes } from "react-icons/gr";
import TimelineMidSeniorLevel from "../../../pages/Candidate/MidLevelCandidate/TimelineMidSeniorLevel";
import CanlentlyMeetingDetails from "../../../pages/Candidate/MidLevelCandidate/midlevelCalendlyList";
import TimeLineAddNotes from "../../../pages/Candidate/MidLevelCandidate/TimeLineAddNotes";
const buttonStyle = {
  // display: 'inline-block',
  margin: "0 auto", // Centers the button horizontally
  marginTop: "5vh", // Centers the button vertically; adjust as needed
};

function CandidateMidLevelDetailsview({ Id, onClose }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSrc, setUploadedFileSrc] = useState(resume);
  const [fileType, setFileType] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [assignToName, setAssignToName] = useState("");
  const candidateId = Id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [candiateDetails, setCandidateDetails] = useState({});
  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    notes: "",
    isQualified: "",
    openPopup: false,
    candidateId: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [open, setOpen] = React.useState(false);
  const adminId = localStorage.getItem("adminID");
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  // const candiateNumber = candiateDetails.mobileNumber;
  let isSuperAdmin = adminDetailsRole.roleID === 1;
  const [assignAdminto, setAssignAdminto] = useState({
    candidateId: "",
    adminId: "",
  });
  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });
  const [showScreeningListing, setshowScreeningListing] = useState(true);

  useEffect(() => {
    const params = window.location.href;

    let isshowScreeningListing =
      params.includes("MidLevelSenior#Screening") ||
      params.includes("MidLevelSenior#Shortlist");
    console.log(params, "parameterrrs");
    setshowScreeningListing(isshowScreeningListing);
  }, []);

  const Dispatch = useDispatch();

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    setShowConfirmQualifiedPopup(false);
  };
  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }

  const handleCancelClicknotqualify = () => {
    console.log("Cancel button clicked");
    setShowConfirmPopup(false);
  };

  // const navigate = useNavigate();

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  console.log(candidateId, "candidate ids");

  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    // rescheduled: useRef(),
  };
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref.current) {
      ref.current.click();
    }
  };
  function openIsQualifyPopup(status) {
    let confirmText = "";
    let isQualified;
    if (status === "qualify") {
      confirmText = `Are you sure you want to qualify ${candiateDetails.firstName} `;
      isQualified = true;
    } else {
      confirmText = `Are you sure you want to not qualify ${candiateDetails.firstName} `;
      isQualified = false;
    }
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: true,
      isQualified: isQualified,
      confirmtext: confirmText,
      candidateId: candiateDetails.id,
    }));
  }

  // const handleFileChange = (e) => {
  //   const fileName = e.target.files[0]?.name || "";
  //   setUploadedFileName(fileName);
  //   setSelectedFile(e.target.files[0]);
  // };

  const handleUploadButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setUploadedFileName("");
    setSelectedFile("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFileName(file.name);
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedFileSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }
    UploadMidSeniorResumes(selectedFile, candiateDetails.mobileNumber).then(
      (Data) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setUploadedFileName("");
          setSelectedFile("");
          setModalOpen(false);
        }, 3000);
        GetCanMidLevePopup(candidateId).then((data) => {
          console.log(data, "data");
          setCandidateDetails(data, "data fot meta lead");
        });
      }
    );
  };
  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }
  useEffect(() => {
    if (assignAdminto.adminId && assignAdminto.candidateId) {
      PutCandidateAssignto(assignAdminto).then((data) => {
        if (data.code !== 200) {
          alert("something went wrong");
          return false;
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        // onAssignChange();
        getcandidateDetails(candidateId).then((data) => {
          setCandidateDetails(data);
        });
      });
    }
  }, [assignAdminto]);

  const handleLeadAssignfromAdmin = (candidateId, adminId) => {
    // let selectedAdminName = event.target.value;
    setAssignAdminto((prev) => ({
      ...prev,
      candidateId: candidateId,
      adminId: adminId,
    }));
  };
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      console.log(adminNames);
      setAdminId(adminIds);
      setAdminDetails((prev) => ({
        ...prev,
        adminName: adminNames,
        id: adminIds,
      }));
    });
  }, []);

  useEffect(() => {
    const assignToIndex = adminid.indexOf(candiateDetails.assignTo);
    if (assignToIndex !== -1) {
      setAssignToName(adminName[assignToIndex]);
    }
  }, [candiateDetails.assignTo, adminid, adminName]);
  // function ConfirmFormSubmit() {
  //   PutCandidateIsQualified(isQualifiedDetails)
  //     .then((data) => {
  //       setIsQualifiedDetails((prev) => ({
  //         confirmtext: "",
  //         notes: "",
  //         isQualified: "",
  //         openPopup: false,
  //         candidateId: "",
  //       }));
  //       getcandidateDetails(candidateId).then((data) => {
  //         console.log(data);
  //         setCandidateDetails(data);
  //       });
  //       setShowConfirmPopup(false);
  //       setShowConfirmQualifiedPopup(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const handleWhatsAppIconClick = (phoneNumber) => {
    // console.log(event)
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(whatsappURL, "_blank");
  };
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyNumber = (phoneNumber, whatsappNumber) => {
    navigator.clipboard.writeText(phoneNumber, whatsappNumber).then(() => {
      setIsCopied(true);
    });
  };

  const keySkillsArray =
    candiateDetails.keySkill && typeof candiateDetails.keySkill === "string"
      ? candiateDetails.keySkill.split(",")
      : [];

  useEffect(() => {
    GetCanMidLevePopup(candidateId).then((data) => {
      console.log(data, "data");
      // setCandidateData(data);
      setCandidateDetails(data, "data fot meta lead");
    });
  }, [candidateId]);
  function handleTimeLinePopup(value, candidate) {
    Dispatch(
      showHideDetailsActions.setCandidateLeadDetails({
        showTimeLine: value,
        midSeniorCan: candidate,
      })
    );
  }
  return (
    <div>
      {/* <div className="container-fluid">
        <div className="row d-flex justify-content-end">
          <RxCross2 />
        </div>
      </div> */}
      <Detailsshow>
        <DetailsContainer
          topComponent={
            <>
              <div className={`${Candidatedetailstyle.boxcross}`}>
                <div
                  className={` ${Candidatedetailstyle.CrossStyle} pe-5 pe-lg-4`}
                >
                  <b>
                    <RxCross2
                      onClick={() => {
                        // handleClose();
                        onClose();
                      }}
                    />
                  </b>
                </div>
              </div>
            </>
          }
          childComponent={
            <>
              <div className={`${Candidatedetailstyle.boxwidth}`}>
                <div className="container-fluid">
                  <div className={`row ${Candidatedetailstyle.topcontainer}`}>
                    <div className="col-sm-4">
                      <div className="row">
                        <div className="col-sm-4">
                          {" "}
                          {candiateDetails.profilePic ? (
                            <img
                              src={candiateDetails.profilePic}
                              alt="Candidate Profile"
                              width={70}
                            />
                          ) : (
                            <img src={companylogo} alt="Profile" width={100} />
                          )}
                        </div>
                        <div className="col-sm-5">
                          <div>
                            <b>
                              {candiateDetails.firstName !== null
                                ? candiateDetails.firstName +
                                  " " +
                                  (candiateDetails.lastName !== null
                                    ? candiateDetails.lastName
                                    : "")
                                : "-"}
                            </b>
                          </div>
                          <div>
                            {candiateDetails.jobCategory ? (
                              <>{candiateDetails.jobCategory}</>
                            ) : (
                              <> {"Fresher"}</>
                            )}{" "}
                          </div>
                          <div className="">
                            <div className="mt-2">
                              {candiateDetails.resumeLink != null ? (
                                <Tooltip title="View Resume" arrow>
                                  <a
                                    href={candiateDetails.resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-light text-decoration-none"
                                  >
                                    <button className="btn btn-primary ">
                                      <GrNotes className="fs-4" />
                                    </button>
                                  </a>
                                </Tooltip>
                              ) : (
                                "-"
                              )}
                            </div>
                          </div>

                          <div>
                            <div className={``}>
                              <div className={`${FBStyle.StatusStyle}`}>
                                {/* <div>
                                  <>
                                    {candiateDetails.qualified === true && (
                                      <div className={`${FBStyle.Green_wrp}`}>
                                        <input
                                          type="radio"
                                          name={`status_${candiateDetails.id}`}
                                          checked={candiateDetails.qualified}
                                          id={`qualified_${candiateDetails.id}`}
                                        />
                                        <label
                                          htmlFor={`qualified_${candiateDetails.id}`}
                                        >
                                          Qualified
                                        </label>
                                      </div>
                                    )}

                                    {candiateDetails.notQualified === true && (
                                      <div className={`${FBStyle.chips_wrp}`}>
                                        <input
                                          type="radio"
                                          checked={candiateDetails.notQualified}
                                          name={`status_${candiateDetails.id}`}
                                          id={`notQualified_${candiateDetails.id}`}
                                        />
                                        <label
                                          htmlFor={`notQualified_${candiateDetails.id}`}
                                        >
                                          Not Qualified
                                        </label>
                                      </div>
                                    )}
                                  </>
                                </div> */}
                                {/* <div className="btn-group dropstart">
                                  <button
                                    type="button"
                                    // className={`btn btn-light `}

                                    data-bs-toggle="dropdown"
                                    data-bs-no-caret="true"
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
                                    <span className="">
                                      {" "}
                                      <BsThreeDotsVertical />{" "}
                                    </span>
                                    <AiOutlineEdit />
                                  </button>{" "}
                                  <ul
                                    className="dropdown-menu"
                                    style={{ textAlign: "left" }}
                                    // ref={dropdownRef}
                                  >
                                    <li
                                      onClick={() => {
                                        openIsQualifyPopup("qualify");
                                      }}
                                    >
                                      <a className="dropdown-item" href="#">
                                        <div
                                          className={`${FBStyle.select_wrp}`}
                                          onClick={() => {
                                            handleButtonClick("qualified");
                                            handleConfirmationOpenQualify(true);
                                          }}
                                        >
                                          <input
                                            type="radio"
                                            // ref={inputRef.qualified}
                                            name={`status_${candiateDetails.id}`}
                                            checked={candiateDetails.qualified}
                                            id={`qualified_${candiateDetails.id}`}
                                          />

                                          <label
                                            htmlFor={`qualified_${candiateDetails.id}`}
                                          >
                                            {" "}
                                            <GoDotFill
                                              style={{
                                                color: "#169C50",
                                                fontSize: 20,
                                              }}
                                            />
                                            Qualified
                                          </label>
                                        </div>
                                      </a>
                                    </li>
                                    <li
                                      onClick={() => {
                                        openIsQualifyPopup("notQualify");
                                      }}
                                    >
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => {
                                          handleButtonClick("notQualified");
                                          handleConfirmationOpen(true);
                                        }}
                                      >
                                        <div
                                          className={`${FBStyle.select_wrp}`}
                                        >
                                          <input
                                            // ref={inputRef.notQualified}
                                            type="radio"
                                            checked={
                                              candiateDetails.notQualified
                                            }
                                            name={`status_${candiateDetails.id}`}
                                            id={`notQualified_${candiateDetails.id}`}
                                          />
                                          <label
                                            htmlFor={`notQualified_${candiateDetails.id}`}
                                          >
                                            <GoDotFill
                                              style={{
                                                color: "#b2261c",
                                                fontSize: 20,
                                              }}
                                            />{" "}
                                            Not Qualified
                                          </label>
                                        </div>
                                      </a>
                                    </li>
                                  </ul>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3 d-flex flex-column justify-content-end  ">
                          <div className="mb-2">Upload&nbsp;Resume</div>
                          <div className="mb-2"></div>
                          <div>
                            <Tooltip title="Upload Resume" arrow>
                              {" "}
                              <Button
                                style={{ marginBottom: "5px" }}
                                variant="outlined"
                                onClick={handleUploadButtonClick}
                              >
                                <FaUpload className="fs-1" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className={`${Candidatedetailstyle.Createdon}`}>
                          Created on :{" "}
                          <DDMMYYYY_formate
                            dateValue={candiateDetails.createdTime}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`col-sm-8`}>
                      <div className="row">
                        <div className="col-sm-4">
                          {/* <div
                            className={`${Candidatedetailstyle.verticalLine}`}
                          ></div> */}
                          {showScreeningListing && (
                            <div
                              className={`${Candidatedetailstyle.CandidatepastDetails}`}
                            >
                              <div className="row px-2 py-2">
                                <div className="col-sm-6">
                                  <div className="">Report Generate : </div>

                                  <div className="mt-2"> Resource Date : </div>
                                </div>
                                <div className="col-sm-6">
                                  {" "}
                                  <div>
                                    {candiateDetails.report === true ? (
                                      <span style={{ color: "green" }}>
                                        Yes
                                      </span>
                                    ) : (
                                      <span style={{ color: "red" }}>No</span>
                                    )}
                                  </div>
                                  <div className="mt-2">
                                    {dateFormateDD(
                                      candiateDetails.shortlistedAt
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/*  <div>
                              {" "}
                              Previous Company <PiWarningCircleLight /> : Taizo
                            </div> */}
                              {/* <div className="d-flex justify-content-end">
                              <button className="btn">
                                <span className="">
                                  {" "}
                                  <BsThreeDotsVertical />{" "}
                                </span>
                                <AiOutlineEdit />
                              </button>
                            </div> */}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-8 ">
                          <div className={`row `}>
                            {/* ${Candidatedetailstyle.flexContainer} */}
                            <div
                              className={`col-sm-12 ${Candidatedetailstyle.flexContainer}`}
                            >
                              {/* <a
                                href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${candiateDetails.id}&adminId=${adminId}`}
                                target="_blank"
                                // className="nav-link"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <div
                                  className={`${Candidatedetailstyle.LiaUserEditSolid}`}
                                >
                                  <div className="mb-1">
                                    {" "}
                                    <LiaUserEditSolid />
                                  </div>
                                </div>
                              </a> */}
                              <div
                                className={`${Candidatedetailstyle.LiaUserEditSolid}`}
                              >
                                <div
                                  className="mb-1"
                                  onClick={() =>
                                    handleWhatsAppIconClick(
                                      candiateDetails.whatsappNumber
                                    )
                                  }
                                >
                                  <FaWhatsapp />
                                </div>
                              </div>

                              <div class="btn-group">
                                <button
                                  type="button"
                                  // class="btn btn-secondary"
                                  data-bs-toggle="dropdown"
                                  data-bs-display="static"
                                  aria-expanded="false"
                                  style={{ border: "none" }}
                                  className={`${Candidatedetailstyle.ThreeOutline}`}
                                >
                                  <PiDotsThreeOutlineVerticalFill />
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <MdCall /> +91{" "}
                                      {candiateDetails.mobileNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(
                                            candiateDetails.mobileNumber
                                          )
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <FaWhatsapp /> +91{" "}
                                      {candiateDetails.whatsappNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(
                                            candiateDetails.whatsappNumber
                                          )
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  {/* <li>
                                    <a
                                      href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${candiateDetails.id}&adminId=${adminId}`}
                                      target="_blank"
                                      // className="nav-link"
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      <button
                                        class="dropdown-item"
                                        type="button"
                                      >
                                        <LiaUserEditSolid /> Edit Profile
                                      </button>
                                    </a>
                                  </li> */}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 px-4 ">
                    <div
                      className={`col-sm-4 pb-4 rounded ${Candidatedetailstyle.personalDetails}`}
                    >
                      {showScreeningListing && (
                        <div className="mt-2">
                          {" "}
                          <h6>
                            <b>Meeting Details</b>
                          </h6>
                          <div
                            className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                          >
                            <div className="col-5">
                              <div style={{ lineHeight: "2" }}>
                                Meeting Link{" "}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                Screening Date
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                Screening Time
                              </div>
                            </div>
                            <div className="col-7">
                              <div style={{ lineHeight: "2" }}>
                                {candiateDetails.meetingLink != null ? (
                                  <a
                                    href={candiateDetails.meetingLink}
                                    target="_balnk"
                                    rel="noopener noreferrer"
                                    // className="text-light text-decoration-none"
                                  >
                                    Meeting Link
                                    {/* {candiateDetails.resumeLink} */}
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {candiateDetails.screeningDate != null
                                  ? candiateDetails.screeningDate
                                  : "-"}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {candiateDetails.screeningTime != null
                                  ? candiateDetails.screeningTime
                                  : "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="mt-2">
                        {" "}
                        <h6>
                          <b>Personal Details</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>Name </div>
                            {/* <div style={{ lineHeight: "2" }}>Gender</div> */}
                            <div style={{ lineHeight: "2" }}>Email Id</div>
                            <div style={{ lineHeight: "2" }}>Resume</div>
                            <div style={{ lineHeight: "2" }}>LinkedIn Url</div>
                            <div style={{ lineHeight: "2" }}>Mobile Number</div>
                            <div style={{ lineHeight: "2.5" }}>
                              Whatsapp Number
                            </div>
                          </div>
                          <div className="col-7">
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {candiateDetails.firstName !== null
                                ? capitalizeWords(candiateDetails.firstName) +
                                  " " +
                                  (candiateDetails.lastName !== null
                                    ? capitalizeWords(candiateDetails.lastName)
                                    : "")
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.emailId != null
                                ? candiateDetails.emailId
                                : "-"}
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              {candiateDetails.currentCity != null
                                ? candiateDetails.currentCity
                                : "-"}{" "}
                              ,{" "}
                              {candiateDetails.state != null
                                ? candiateDetails.state
                                : "-"}
                            </div> */}
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.resumeLink != null ? (
                                <a
                                  href={candiateDetails.resumeLink}
                                  target="_balnk"
                                  rel="noopener noreferrer"
                                  // className="text-light text-decoration-none"
                                >
                                  Resume url
                                  {/* {candiateDetails.resumeLink} */}
                                </a>
                              ) : (
                                "-"
                              )}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.linkedinUrl != null ? (
                                <a
                                  href={candiateDetails.linkedinUrl}
                                  target="_balnk"
                                  rel="noopener noreferrer"
                                  // className="text-light text-decoration-none"
                                >
                                  LinkedIn Url
                                  {/* {candiateDetails.resumeLink} */}
                                </a>
                              ) : (
                                "-"
                              )}
                            </div>

                            <div
                              className="d-flex "
                              style={{ lineHeight: "2" }}
                            >
                              <div
                                className={`me-3 ${Candidatedetailstyle.numbersstyle}`}
                              >
                                <img src={flag} alt="" width={15} />{" "}
                                <span>{candiateDetails.mobileNumber} </span>
                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(
                                      candiateDetails.mobileNumber
                                    )
                                  }
                                />
                              </div>
                              <div
                                className={`${Candidatedetailstyle.Phonecall}`}
                              >
                                <MdCall />
                              </div>
                            </div>

                            <div className="d-flex" style={{ lineHeight: "2" }}>
                              <div
                                className={`me-3 ${Candidatedetailstyle.Whatsapnumbersstyle}`}
                              >
                                <img src={WhatsappImage} alt="" width={16} />{" "}
                                <span>{candiateDetails.whatsappNumber} </span>
                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(
                                      candiateDetails.whatsappNumber
                                    )
                                  }
                                />
                              </div>

                              <div
                                className={`${Candidatedetailstyle.Phonecall}`}
                              >
                                <FaWhatsapp
                                  onClick={() =>
                                    handleWhatsAppIconClick(
                                      candiateDetails.whatsappNumber
                                    )
                                  }
                                />
                              </div>
                              {/* <div
                                className={`${Candidatedetailstyle.Phonecall}`}
                              > */}

                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h6>
                          <b>Education Details</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              Qualification
                            </div>
                          </div>
                          <div className="col-7">
                            {" "}
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.educationalQualification != ""
                                ? capitalizeWords(
                                    candiateDetails.educationalQualification
                                  )
                                : "-"}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h6>
                          <b>Work Details</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-7">
                            <div style={{ lineHeight: "2" }}>
                              Current Job Category{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              Currently Working{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              Current Salary{" "}
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>Industry</div> */}
                            <div style={{ lineHeight: "2" }}>Experience</div>
                            <div style={{ lineHeight: "2" }}>
                              Experience in Manufacturing
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              Preferred Job Location
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              Current Location
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              Admin Preferred Company
                            </div>
                          </div>
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.jobCategory === ""
                                ? "-"
                                : capitalizeWords(
                                    candiateDetails.jobCategory
                                  )}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.currentlyWorking === false
                                ? "No"
                                : "Yes"}{" "}
                            </div>

                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.currentSalary === ""
                                ? "-"
                                : candiateDetails.currentSalary}{" "}
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              {candiateDetails.industry != null
                                ? candiateDetails.industry
                                : "-"}
                            </div> */}
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.expInYears == " " &&
                              candiateDetails.expInMonths == " "
                                ? "-"
                                : candiateDetails.expInYears +
                                  " " +
                                  candiateDetails.expInMonths +
                                  " "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.expInManufacturing === false
                                ? "No"
                                : "Yes"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.prefJobLocation !== ""
                                ? capitalizeWords(
                                    candiateDetails.prefJobLocation
                                  )
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.currentLocation !== ""
                                ? capitalizeWords(
                                    candiateDetails.currentLocation
                                  )
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {candiateDetails.adminPreferredCompany != null
                                ? capitalizeWords(
                                    candiateDetails.adminPreferredCompany
                                  )
                                : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h6>
                          <b>Other Details</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>Notice Period</div>
                            <div style={{ lineHeight: "2" }}>
                              Expected Salary
                            </div>
                          </div>
                          <div className="col-7 ">
                            <div>
                              <div style={{ lineHeight: "2" }}>
                                {/* {candiateDetails.keySkill} */}

                                {candiateDetails.noticePeriod != ""
                                  ? candiateDetails.noticePeriod
                                  : "-"}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {candiateDetails.expectedSalary != ""
                                  ? candiateDetails.expectedSalary
                                  : "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {!showScreeningListing && (
                        
                      )} */}
                      {/* <div className="mt-2">
                        <h6>
                          <b>Resume</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div>Upload Resume</div>
                          </div>
                          <div className="col-7 ">
                            <div>
                              <div>
                                <Button
                                  style={{ marginBottom: "5px" }}
                                  variant="outlined"
                                  onClick={handleUploadButtonClick}
                                >
                                  Upload Resume
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* {showSuccess && ( */}
                      {/* )} */}
                      {/* <div className="mt-2">
                        <h6>
                          <b>Admin Details</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div>Assigned To</div>
                          </div>
                          <div className="col-7">
                            {!isSuperAdmin && (
                              <div style={{ lineHeight: "2" }}>
                                {assignToName}
                              </div>
                            )}
                            {isSuperAdmin && (
                              <div>
                                <Autocomplete
                                  id="clear-on-escape"
                                  clearOnEscape
                                  // disableClearable
                                  onChange={(event, newValue) => {
                                    if (newValue) {
                                      const selectedAdminName = newValue;
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
                                        if (
                                          adminNameIndex !== -1 &&
                                          adminDetails.id[adminNameIndex] !==
                                            undefined
                                        ) {
                                          const adminId =
                                            adminDetails.id[adminNameIndex];
                                          handleLeadAssignfromAdmin(
                                            candiateDetails.id,
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
                                      adminDetails.id.indexOf(
                                        candiateDetails.assignTo
                                      )
                                    ]
                                  }
                                  options={adminDetails.adminName}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Assign to"
                                      variant="standard"
                                    />
                                  )}
                                />
                              </div>
                            )}{" "}
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div
                      className={` col-sm-8 rounded  ${Candidatedetailstyle.DailyDetailsupdate}`}
                    >
                      <div>
                        <div
                          className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}
                        >
                          <div
                            className={`d-flex ${candidateTabsviewStyle.tab_hr}`}
                          >
                            <div
                              onClick={() => handleTabClick(1)}
                              className={` ${
                                activeTab === 1
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              } `}
                            >
                              TimeLine
                            </div>
                            <div
                              onClick={() => handleTabClick(2)}
                              className={` ${
                                activeTab === 2
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              } `}
                            >
                              Notes
                            </div>
                            <div
                              onClick={() => handleTabClick(3)}
                              className={` ${
                                activeTab === 3
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              }`}
                            >
                              Meeting Details
                            </div>

                            {/* <div
                              onClick={() => handleTabClick(4)}
                              className={` ${
                                activeTab === 4
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              }`}
                            >
                              Files
                            </div> */}
                          </div>
                          <hr style={{ borderTop: "10px solid #ccc" }} />
                        </div>

                        <div
                          className={`tab-content ${candidateTabsviewStyle.tab_content}`}
                        >
                          {candiateDetails.id && activeTab === 1 && (
                            <p>
                              <TimelineMidSeniorLevel
                                midSeniorCanId={candiateDetails.id}
                              />
                            </p>
                          )}
                          {candiateDetails.id && activeTab === 2 && (
                            <p>
                              <TimeLineAddNotes Id={candiateDetails.id} />
                              {/* <TimeLineForm canId={candiateDetails.id} /> */}
                            </p>
                          )}
                          {candiateDetails.id && activeTab === 3 && (
                            <p>
                              <CanlentlyMeetingDetails
                                email={candiateDetails.emailId}
                              />
                              {/* <TimeLineForm canId={candiateDetails.id} /> */}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {isQualifiedDetails.openPopup && (
                <MyModal>
                  <ModalContainer
                    zIndex={1005}
                    childComponent={
                      <ConfirmationPopup
                        heading={"Confirmation"}
                        headingText={isQualifiedDetails.confirmtext}
                        onConfirm={ConfirmFormSubmit}
                        // enableSubmit={enableSubmit}
                        onRequestClose={handleConfirmationClose}
                        //</br> with <b>${contactPersonName}</b>
                      />
                    }
                  />
                </MyModal>
              )} */}
              {/* {showConfirmationqualifiedPopup && (
                <MyModal>
                  <ModalContainer
                    zIndex={2000}
                    childComponent={
                      <>
                        <div>
                          <div className="text-center mb-3">
                            Qualify Candidate
                          </div>
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Add Notes"
                            multiline
                            required
                            onChange={(event) => {
                              setIsQualifiedDetails((prev) => ({
                                ...prev,
                                notes: event.target.value,
                              }));
                            }}
                            maxRows={4}
                            fullWidth
                          />
                        </div>
                        <div className="d-flex justify-content-end gap-1 mt-4">
                          <button
                            className="btn text-white me-3"
                            onClick={handleCancelClick}
                            style={{ backgroundColor: "#d00a0a" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn text-white"
                            onClick={ConfirmFormSubmit}
                            // disabled={enableSubmit}
                            style={{ backgroundColor: "#169C50" }}
                          >
                            Qualify
                          </button>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )}

              {showConfirmationPopup && (
                <MyModal>
                  <ModalContainer
                    zIndex={2000}
                    childComponent={
                      <>
                        <div>
                          <div className="text-center mb-3">
                            Disqualify Candidate
                          </div>
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Add Notes"
                            multiline
                            required
                            onChange={(event) => {
                              setIsQualifiedDetails((prev) => ({
                                ...prev,
                                notes: event.target.value,
                              }));
                            }}
                            maxRows={4}
                            fullWidth
                          />
                        </div>
                        <div className="d-flex justify-content-end gap-1 mt-4">
                          <button
                            className="btn text-white me-3"
                            onClick={handleCancelClicknotqualify}
                            style={{ backgroundColor: "#d00a0a" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn text-white"
                            onClick={ConfirmFormSubmit}
                            // disabled={enableSubmit}
                            style={{ backgroundColor: "#169C50" }}
                          >
                            Disqualify
                          </button>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )} */}
              {showSuccess && (
                <MyModal>
                  <ModalContainer
                    zIndex={5000}
                    childComponent={
                      <SuccessTick HeadText="Successfully Updated" />
                    }
                  />
                </MyModal>
              )}
              {isModalOpen && (
                <MyModal>
                  <ModalContainer
                    zIndex={2000}
                    childComponent={
                      <div style={{ width: "300px" }}>
                        <p className="text-center">
                          <b>Upload Resume</b>
                        </p>
                        <div className="text-center">
                          <label htmlFor="fileInput">
                            {uploadedFileName ? (
                              <img
                                src={resume}
                                alt="Upload Icon"
                                style={{
                                  cursor: "pointer",
                                  width: "100px", // Adjust the width as needed
                                  height: "100px", // Adjust the height as needed
                                }}
                              />
                            ) : (
                              <>
                                <img
                                  src={uploadimage}
                                  alt="Upload Icon"
                                  style={{
                                    cursor: "pointer",
                                    width: "100px", // Adjust the width as needed
                                    height: "100px", // Adjust the height as needed
                                  }}
                                />
                                {/* Upload file */}
                              </>
                            )}
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          {uploadedFileName && (
                            <p>Uploaded File: {uploadedFileName}</p>
                          )}
                        </div>
                        <div className="d-flex justify-content-center gap-2 mt-3">
                          <button
                            className="btn btn-danger"
                            // color="red"
                            onClick={handleCloseModal}
                          >
                            Close
                          </button>
                          <button
                            className="btn text-light"
                            style={{ backgroundColor: "#169c50" }}
                            onClick={handleUpload}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    }
                  />
                </MyModal>
              )}
            </>
          }
        />
      </Detailsshow>
    </div>
  );
}

export default CandidateMidLevelDetailsview;
