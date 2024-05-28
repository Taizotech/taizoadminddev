/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  DDMMYYYY_formate,
  Ddmmmyyyy_date,
  Detailsshow,
  MyModal,
} from "../../../utility";
import ModalContainer from "../../modal_popup";
import DetailsContainer from "../../DetailsContainer";
import Candidatedetailstyle from "./JobsDetailsView.module.scss";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  PutAssignTo,
  PutCandidateAssignto,
  PutCandidateDocument,
  PutCandidateIsQualified,
  getCandidateDocument,
  getDocumentCandidate,
  getJobDetails,
  getcandidateDetails,
} from "../../../apiServices";
import companylogo from "../../../assets/images/Company-Logo.png";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import flag from "../../../assets/images/flag.png";
// import companylogo from "../../assets/images/Company-Logo.png";
import Documents from "../../../assets/images/Documents.png";
import DocumentsEd from "../../../assets/images/pdf_img.png";
import DocumentsD from "../../../assets/images/word_img.png";
import DocumentsA from "../../../assets/images/img_img.png";
import WhatsappImage from "../../../assets/images/whatsapp-logo-removebg-preview.png";
import {
  MdCall,
  MdOutlineContentCopy,
  MdOutlineUploadFile,
} from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CandidateTimeline from "../../../pages/Candidate/CandidateTimeLine/CandidateTimeline";
import TimeLineForm from "../../../pages/Candidate/CandidateTimeLine/components/timeLinePost";
import { styled as muiStyled } from "@mui/material/styles";
import {
  TextField,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import ScheduleInterview from "../../../pages/Candidate/CandidateInterview/scheduleInterview";
import { webConsoleBaseUrl } from "../../../App";
import { commonPopupActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
const VisuallyHiddenInput = muiStyled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: "50px",
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const buttonStyle = {
  // display: 'inline-block',
  margin: "0 auto", // Centers the button horizontally
  marginTop: "5vh", // Centers the button vertically; adjust as needed
};
const JobsDetailsView = (props, data) => {
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [assignToName, setAssignToName] = useState("");
  const candidateId = props.Id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [candiateDetails, setCandidateDetails] = useState({});
  const [jobDetails, setJobDetails] = useState({ data: {}, show: false });
  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    notes: "",
    isQualified: "",
    openPopup: false,
    candidateId: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [fileName, setFileName] = useState("");
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [FBputLead, setFBputLead] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [documents, setDocuments] = useState([]);
  const [ShowModal, SetShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const adminId = localStorage.getItem("adminID");
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID == 1;
  const [assignAdminto, setAssignAdminto] = useState({
    candidateId: "",
    adminId: "",
  });
  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });
  const Dispatch = useDispatch();
  function handleClose() {
    // Use history.goBack() to go back one page in the browser history
    // navigate("/candidate_Job");
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "hide",
      })
    );
  }
  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    setShowConfirmQualifiedPopup(false);
  };
  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }

  const handleClos = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }

  const handleCancelClicknotqualify = () => {
    console.log("Cancel button clicked");
    setShowConfirmPopup(false);
  };
  const uploadButtonClick = () => {
    SetShowModal(true);
  };

  const validateForm = () => {
    let errors = {};

    // Validate Select Document
    if (!selectedDocumentType) {
      errors.selectedDocumentType = "Please select a document type.";
    }

    // Validate Upload File
    if (!selectedFile) {
      errors.selectedFile = "Please upload a file.";
    }

    return errors;
  };
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // const navigate = useNavigate();

  const [showScheduleInterview, setShowScheduleInterview] = useState(true);

  useEffect(() => {
    const params = window.location.href;

    let isShowScheduleInterview =
      params.includes("CandidateTabsview#Joined") ||
      params.includes("CandidateTabsview#interviews");
    // console.log(params, "parameterrrs");
    setShowScheduleInterview(!isShowScheduleInterview);
  }, []);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  console.log(candidateId, "candidate ids");
  //   useEffect(() => {
  //     getcandidateDetails(candidateId).then((data) => {
  //       console.log(data, "datasdgh");
  //       setCandidateDetails(data);
  //     });
  //   }, [candidateId]);
  useEffect(() => {
    getJobDetails(candidateId).then((data) => {
      setJobDetails((prev) => ({ ...prev, data: data, show: true }));
    });
  }, []);

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
    if (status == "qualify") {
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

  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }

  useEffect(() => {
    // Ensure jobId and adminId are defined and not empty strings
    if (candidateId && assignAdminto.adminId) {
      PutAssignTo(candidateId, assignAdminto.adminId).then((data) => {
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
      console.error(
        "Invalid candidateId or adminId:",
        candidateId,
        assignAdminto.adminId
      );
    }
  }, [assignAdminto, candidateId]);

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
    console.log(jobDetails);
  }, [jobDetails]);
  useEffect(() => {
    const assignToIndex = adminid.indexOf(candiateDetails.assignTo);
    if (assignToIndex !== -1) {
      setAssignToName(adminName[assignToIndex]);
    }
  }, [candiateDetails.assignTo, adminid, adminName]);
  function ConfirmFormSubmit() {
    PutCandidateIsQualified(isQualifiedDetails)
      .then((data) => {
        setIsQualifiedDetails((prev) => ({
          confirmtext: "",
          notes: "",
          isQualified: "",
          openPopup: false,
          candidateId: "",
        }));
        getcandidateDetails(candidateId).then((data) => {
          console.log(data);
          setCandidateDetails(data);
        });
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
  // if (!candiateDetails || !candiateDetails.keySkill) {
  //   return <div></div>;
  // }

  // // Check if keySkill is a string
  // if (typeof candiateDetails.keySkill !== "string") {
  //   return <div>Invalid key skills format</div>;
  // }
  //   const keySkillsArray =
  //     jobDetails.data.jobDetails.keyskills &&
  //     typeof jobDetails.data.jobDetails.keyskills === "string"
  //       ? jobDetails.data.jobDetails.keyskills.split(",")
  //       : [];
  return (
    <div>
      {/* <div className="container-fluid">
        <div className="row d-flex justify-content-end">
          <RxCross2 />
        </div>
      </div> */}
      {jobDetails.show && (
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
                          handleClose();
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
                              <img
                                src={companylogo}
                                alt="Profile"
                                width={100}
                              />
                            )}
                          </div>
                          <div className="col-sm-6">
                            <div className="mt-1">
                              <b>{jobDetails.data.jobDetails.companyName}</b>{" "}
                            </div>
                            <div className="">
                              {jobDetails.data.jobDetails.jobCategory ? (
                                <>{jobDetails.data.jobDetails.jobCategory}</>
                              ) : (
                                <> {"Fresher"}</>
                              )}{" "}
                            </div>
                            <div>
                              ₹{jobDetails.data.jobDetails.salary} - ₹{" "}
                              {jobDetails.data.jobDetails.maxSalary}
                            </div>
                            <div>
                              <div className={``}>
                                <div className={`${FBStyle.StatusStyle}`}>
                                  <div>
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

                                      {candiateDetails.notQualified ===
                                        true && (
                                        <div className={`${FBStyle.chips_wrp}`}>
                                          <input
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
                                            Not Qualified
                                          </label>
                                        </div>
                                      )}
                                    </>
                                  </div>
                                  <div className="btn-group dropstart">
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
                                              handleConfirmationOpenQualify(
                                                true
                                              );
                                            }}
                                          >
                                            <input
                                              type="radio"
                                              // ref={inputRef.qualified}
                                              name={`status_${candiateDetails.id}`}
                                              checked={
                                                candiateDetails.qualified
                                              }
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className={`${Candidatedetailstyle.Createdon}`}>
                            Job posted on :{" "}
                            <DDMMYYYY_formate
                              dateValue={
                                jobDetails.data.jobDetails.jobPostedTime
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="col">
                      {" "}
                      
                    </div> */}
                      <div className={`col-sm-8`}>
                        <div className="row">
                          <div className="col-sm-4">
                            {/* <div
                            className={`${Candidatedetailstyle.verticalLine}`}
                          ></div> */}
                            {/* <div
                            className={`${Candidatedetailstyle.CandidatepastDetails}`}
                          >
                            <div>
                              {" "}
                              Joining Status <PiWarningCircleLight /> :
                              immediate
                            </div>
                            <div>
                              {" "}
                              Employer Status <PiWarningCircleLight /> : working
                            </div>
                            <div>
                              {" "}
                              Previous Company <PiWarningCircleLight /> : Taizo
                            </div>
                            <div className="d-flex justify-content-end">
                              <button className="btn">
                                <span className="">
                                  {" "}
                                  <BsThreeDotsVertical />{" "}
                                </span>
                                <AiOutlineEdit />
                              </button>
                            </div>
                          </div> */}
                          </div>
                          <div className="col-sm-8 ">
                            <div className={`row `}>
                              {/* ${Candidatedetailstyle.flexContainer} */}
                              <div
                                className={`col-sm-12 ${Candidatedetailstyle.flexContainer}`}
                              >
                                <a
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
                                </a>
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
                                <div>
                                  {showScheduleInterview &&
                                    candiateDetails.id && (
                                      <div
                                        className={`${Candidatedetailstyle.scheduleinterview}`}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <ScheduleInterview
                                          candidateId={candiateDetails.id}
                                        />
                                      </div>
                                    )}{" "}
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
                                      <button
                                        class="dropdown-item"
                                        type="button"
                                      >
                                        {showScheduleInterview &&
                                          candiateDetails.id && (
                                            <ScheduleInterview
                                              candidateId={candiateDetails.id}
                                            />
                                          )}
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        class="dropdown-item"
                                        type="button"
                                      >
                                        <MdCall /> +91{" "}
                                        {
                                          jobDetails.data.jobDetails
                                            .mobileNumber
                                        }{" "}
                                        <MdOutlineContentCopy
                                          onClick={() =>
                                            handleCopyNumber(
                                              jobDetails.data.jobDetails
                                                .mobileNumber
                                            )
                                          }
                                          className="ms-5"
                                        />
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        class="dropdown-item"
                                        type="button"
                                      >
                                        <FaWhatsapp /> +91{" "}
                                        {
                                          jobDetails.data.jobDetails
                                            .whatsappNumber
                                        }{" "}
                                        <MdOutlineContentCopy
                                          onClick={() =>
                                            handleCopyNumber(
                                              jobDetails.data.jobDetails
                                                .whatsappNumber
                                            )
                                          }
                                          className="ms-5"
                                        />
                                      </button>
                                    </li>
                                    <li>
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
                                    </li>
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
                        <div className="mt-2">
                          {" "}
                          <h6>
                            <b>Contact Details</b>
                          </h6>
                          <div
                            className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                          >
                            <div className="col-5">
                              <div style={{ lineHeight: "2" }}>
                                Contact Person Name{" "}
                              </div>

                              <div style={{ lineHeight: "2" }}>
                                Job Location
                              </div>

                              <div style={{ lineHeight: "2" }}>
                                Mobile Number
                              </div>
                              <div style={{ lineHeight: "2.5" }}>
                                Whatsapp Number
                              </div>
                            </div>
                            <div className="col-7">
                              <div style={{ lineHeight: "2" }}>
                                {" "}
                                {jobDetails.data.jobDetails.contactPersonName !=
                                null
                                  ? jobDetails.data.jobDetails.contactPersonName
                                  : "-"}
                              </div>

                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.jobLocation != null
                                  ? jobDetails.data.jobDetails.jobLocation
                                  : "-"}{" "}
                                ,{" "}
                                {jobDetails.data.jobDetails.state != null
                                  ? jobDetails.data.jobDetails.state
                                  : "-"}
                              </div>

                              <div
                                className="d-flex "
                                style={{ lineHeight: "2" }}
                              >
                                <div
                                  className={`me-3 ${Candidatedetailstyle.numbersstyle}`}
                                >
                                  <img src={flag} alt="" width={15} />{" "}
                                  <span>
                                    {jobDetails.data.jobDetails.mobileNumber}{" "}
                                  </span>
                                  <MdOutlineContentCopy
                                    onClick={() =>
                                      handleCopyNumber(
                                        jobDetails.data.jobDetails.mobileNumber
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

                              <div
                                className="d-flex"
                                style={{ lineHeight: "2" }}
                              >
                                <div
                                  className={`me-3 ${Candidatedetailstyle.Whatsapnumbersstyle}`}
                                >
                                  <img src={WhatsappImage} alt="" width={16} />{" "}
                                  <span>
                                    {jobDetails.data.jobDetails.whatsappNumber}{" "}
                                  </span>
                                  <MdOutlineContentCopy
                                    onClick={() =>
                                      handleCopyNumber(
                                        jobDetails.data.jobDetails
                                          .whatsappNumber
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
                                        jobDetails.data.jobDetails
                                          .whatsappNumber
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
                            <b>Job Details</b>
                          </h6>
                          <div
                            className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                          >
                            <div className="col-5">
                              <div style={{ lineHeight: "2" }}> Job Type</div>
                              <div style={{ lineHeight: "2" }}>
                                {" "}
                                Min Experience
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {" "}
                                Qualification
                              </div>
                              <div style={{ lineHeight: "2" }}>Key Skills</div>
                              <div style={{ lineHeight: "2" }}>Benifits</div>
                            </div>
                            <div className="col-7">
                              {" "}
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.jobType != null
                                  ? jobDetails.data.jobDetails.jobType
                                  : "-"}{" "}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.jobExp} -{" "}
                                {jobDetails.data.jobDetails.jobMaxExp}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.qualification !=
                                null
                                  ? jobDetails.data.jobDetails.qualification
                                  : "-"}{" "}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.keyskills != null
                                  ? jobDetails.data.jobDetails.keyskills
                                  : "-"}{" "}
                                {/* {candiateDetails.keySkill}
                                {/* {keySkillsArray.map((skill, index) =>
                                  skill && typeof skill === "string" ? (
                                    <div
                                      className={`${Candidatedetailstyle.KeySkills}`}
                                      key={index}
                                    >
                                      {skill.trim()}
                                    </div>
                                  ) : null
                                )} */}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.benefits != null
                                  ? jobDetails.data.jobDetails.benefits
                                  : "-"}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h6>
                            <b>Additional Details</b>
                          </h6>
                          <div
                            className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                          >
                            <div className="col-5">
                              <div style={{ lineHeight: "2" }}>Work Hours </div>
                              <div style={{ lineHeight: "2" }}>Shift Time</div>
                              <div style={{ lineHeight: "2" }}>Over Time</div>
                              <div style={{ lineHeight: "2" }}>
                                Preferred Job City
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                Preferred Job Area
                              </div>
                            </div>
                            <div className="col-7">
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.workHours != null
                                  ? jobDetails.data.jobDetails.workHours
                                  : "-"}{" "}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.shiftType != null
                                  ? jobDetails.data.jobDetails.shiftType
                                  : "-"}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {jobDetails.data.jobDetails.ot === "yes" ? (
                                  <span className="text-success">
                                    <b>Yes</b>
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    <b>No</b>
                                  </span>
                                )}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {candiateDetails.city != null
                                  ? candiateDetails.city
                                  : "-"}
                              </div>
                              <div style={{ lineHeight: "2" }}>
                                {candiateDetails.prefArea != null
                                  ? candiateDetails.prefArea
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
                              <div style={{ lineHeight: "2" }}>Address</div>
                              <div style={{ lineHeight: "2" }}>Benefits</div>
                            </div>
                            <div className="col-7 ">
                              <div>
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
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
                        </div>
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
                                }`}
                              >
                                Notes
                              </div>
                              {/* <div
                              onClick={() => handleTabClick(3)}
                              className={` ${
                                activeTab === 3
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              }`}
                            >
                              Calls
                            </div> */}
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
                                <CandidateTimeline canId={candiateDetails.id} />
                              </p>
                            )}
                            {candiateDetails.id && activeTab === 2 && (
                              <p>
                                <TimeLineForm canId={candiateDetails.id} />
                              </p>
                            )}
                            {/* {activeTab === 3 && <p>Content for Tab 3</p>} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mt-3 " style={{ color: "#d7d5d5" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Iste distinctio, culpa explicabo nihil necessitatibus quod
                    aliquid neque architecto fuga exercitationem doloremque quas
                    ducimus, accusamus suscipit soluta deleniti voluptatem illum
                  </div> */}
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
                {showConfirmationqualifiedPopup && (
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
              </>
            }
          />
        </Detailsshow>
      )}
    </div>
  );
};

export default JobsDetailsView;
