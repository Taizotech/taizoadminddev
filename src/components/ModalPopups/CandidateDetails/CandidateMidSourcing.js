/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  DDMMYYYY_formate,
  Detailsshow,
  MyModal,
  capitalizeWords,
} from "../../../utility";
import ModalContainer from "../../modal_popup";
import DetailsContainer from "../../DetailsContainer";
import Candidatedetailstyle from "./CandidateDetails.module.scss";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  PutCandidateLeadCheck,
  PutMetaLeadAssign,
  PutMidsoucingQualifyMail,
  getCandidateLead,
} from "../../../apiServices";
import companylogo from "../../../assets/images/user.png";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react";
import {
  PiDotsThreeOutlineVerticalFill,
  PiWarningCircleLight,
} from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import flag from "../../../assets/images/flag.png";
// import companylogo from "../../assets/images/Company-Logo.png";
import WhatsappImage from "../../../assets/images/whatsapp-logo-removebg-preview.png";
import { MdCall, MdOutlineContentCopy } from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import { styled as muiStyled } from "@mui/material/styles";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import ScheduleInterview from "../../../pages/Candidate/CandidateInterview/scheduleInterview";
import { commonPopupActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
import CandidateLeadTimeline from "../../../pages/Candidate/CandidateLeadTable/LeadTimeLine";
import AddNotesCandidateLead from "../../../pages/Candidate/CandidateLeadTable/components/timeLinePost";
import TimelineFacebookMeta from "../../../pages/Candidate/FacebookMeta/TimelineFacebookMeta";
import AddNotesFBLead from "../../../pages/Candidate/FacebookMeta/PostCandidateNotes";
import { GrNotes } from "react-icons/gr";
import TimelineMidSeniorLevel from "../../../pages/Candidate/MidLevelCandidate/TimelineMidSeniorLevel";

const CandidateMidSourcingView = ({ data, onClose, onAssignChange }) => {
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [assignToName, setAssignToName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [candiateDetails, setCandidateDetails] = useState({});
  const [putCandidateLead, setPutcandidateLead] = useState({
    id: "",
    qualified: false,
    notQualified: false,
  });
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID === 1;
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [CanputLead, setCanputLead] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [fileName, setFileName] = useState("");
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [FBputLead, setFBputLead] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);

  console.log(data[0], "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

  const [ShowModal, SetShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [assignAdminto, setAssignAdminto] = useState({
    metaLeadId: "",
    adminId: "",
  });

  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });
  const Dispatch = useDispatch();

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    setShowConfirmQualifiedPopup(false);
    setEnableSubmit(false);
  };

  const handleCancelClicknotqualify = () => {
    console.log("Cancel button clicked");
    setShowConfirmPopup(false);
    setEnableSubmit(false);
  };

  // const navigate = useNavigate();

  const [showScheduleInterview, setShowScheduleInterview] = useState(true);

  useEffect(() => {
    const params = window.location.href;

    let isShowScheduleInterview = params.includes("interview_schedule_list");
    console.log(params, "parameterrrs");
    setShowScheduleInterview(!isShowScheduleInterview);
  }, []);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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

  const handleLeadAssignfromAdmin = (metaLeadId, adminId) => {
    // let selectedAdminName = event.target.value;
    setAssignAdminto((prev) => ({
      ...prev,
      adminId: adminId,
      metaLeadId: metaLeadId,
    }));
  };
  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }
  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  const handleIsQualified = (status) => {
    console.log(candiateDetails.id, "jhsjhhiidddd");
    if (status === "notQualified") {
      setPutcandidateLead({
        id: candiateDetails.id,
        qualified: false,
        notQualified: true,
      });
    } else {
      setPutcandidateLead((prev) => ({
        ...prev,
        id: candiateDetails.id,
        qualified: true,
        notQualified: false,
      }));
    }
  };
  function ConfirmFormSubmit() {
    if (putCandidateLead.id) {
      setEnableSubmit(true);
      putCandidateLead.notes = CanputLead.notes;
      PutMidsoucingQualifyMail(putCandidateLead).then(() => {
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);

        // getCandidateLead().then((data) => {
        //   console.log(data);
        //   setCandidateDetails(data);
        // });
        setEnableSubmit(false);
      });
    }
  }

  useEffect(() => {
    if (assignAdminto.adminId && assignAdminto.metaLeadId) {
      PutMetaLeadAssign(assignAdminto).then((data) => {
        // console.log(data, "kdksjkbbh");
        if (data.code !== 200) {
          alert("something went wrong");
          return false;
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        onAssignChange();
      });
    }
  }, [assignAdminto]);
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

  // useEffect(() => {
  //   const assignToIndex = adminid.indexOf(data.assignTo);
  //   if (assignToIndex !== -1) {
  //     setAssignToName(adminName[assignToIndex]);
  //   }
  // }, [candiateDetails.assignTo, adminid, adminName]);

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
  const skills =
    data[0].skills && typeof data[0].skills === "string"
      ? data[0].skills.split(",")
      : [];
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
                          {data.profilePic ? (
                            <img
                              src={data.profilePic}
                              alt="Candidate Profile"
                              width={70}
                            />
                          ) : (
                            <img src={companylogo} alt="Profile" width={100} />
                          )}
                        </div>
                        <div className="col-sm-6">
                          <div>
                            <b>
                              {capitalizeWords(data[0].firstName) +
                                " " +
                                capitalizeWords(data[0].lastName)}{" "}
                            </b>
                          </div>
                          <div>
                            {data[0].jobrole ? (
                              <>{data[0].jobrole}</>
                            ) : (
                              <> {""}</>
                            )}{" "}
                          </div>
                          <div className="mt-2">
                            {data[0].resumeLink !== "" ? (
                              <Tooltip title="View Resume" arrow>
                                <a
                                  href={data[0].resumeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-light text-decoration-none"
                                >
                                  <button className="btn btn-primary ">
                                    <GrNotes />
                                  </button>
                                </a>
                              </Tooltip>
                            ) : (
                              "-"
                            )}
                          </div>
                          <div>
                            <div className={`d-flex justify-content-between`}>
                              <div className={`${FBStyle.StatusStyle}`}>
                                <div>
                                  <>
                                    {data[0].qualified === true && (
                                      <div className={`${FBStyle.Green_wrp}`}>
                                        <input
                                          type="radio"
                                          name={`status_${data[0].id}`}
                                          checked={data[0].qualified}
                                          id={`qualified_${data[0].id}`}
                                        />
                                        <label
                                          htmlFor={`qualified_${data[0].id}`}
                                        >
                                          Qualified
                                        </label>
                                      </div>
                                    )}

                                    {data[0].notQualified === true && (
                                      <div className={`${FBStyle.chips_wrp}`}>
                                        <input
                                          type="radio"
                                          checked={data[0].notQualified}
                                          name={`status_${data[0].id}`}
                                          id={`notQualified_${data[0].id}`}
                                        />
                                        <label
                                          htmlFor={`notQualified_${data[0].id}`}
                                        >
                                          Not Qualified
                                        </label>
                                      </div>
                                    )}
                                  </>
                                </div>
                              </div>
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
                                      handleConfirmationOpenQualify(true);
                                      handleIsQualified("qualified");
                                    }}
                                  >
                                    <a className="dropdown-item" href="#">
                                      <div
                                        className={`${FBStyle.select_wrp}`}
                                        // onClick={() => {
                                        //   handleButtonClick("qualified");
                                        // }}
                                      >
                                        <input
                                          type="radio"
                                          // ref={inputRef.qualified}
                                          name={`status_${data[0].id}`}
                                          checked={data[0].qualified}
                                          id={`qualified_${data[0].id}`}
                                        />

                                        <label
                                          htmlFor={`qualified_${data[0].id}`}
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
                                      handleConfirmationOpen(true);
                                      handleIsQualified("notQualified");
                                    }}
                                  >
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      // onClick={() =>
                                      //   handleButtonClick("notQualified")
                                      // }
                                    >
                                      <div className={`${FBStyle.select_wrp}`}>
                                        <input
                                          // ref={inputRef.notQualified}
                                          type="radio"
                                          checked={data[0].notQualified}
                                          name={`status_${data[0].id}`}
                                          id={`notQualified_${data[0].id}`}
                                        />
                                        <label
                                          htmlFor={`notQualified_${data[0].id}`}
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
                      <div className="row mt-1">
                        <div className={`${Candidatedetailstyle.Createdon}`}>
                          Created on :{" "}
                          <DDMMYYYY_formate dateValue={data[0].createdTime} />
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
                          <div
                            className={`${Candidatedetailstyle.CandidatepastDetails}`}
                          >
                            <div className="p-2">
                              {" "}
                              Link Sent <PiWarningCircleLight /> :{" "}
                              {data[0].linkSent !== false ? (
                                <span className="text-success">Yes</span>
                              ) : (
                                <span className="text-danger">No</span>
                              )}
                            </div>
                            {/* <div>
                              {" "}
                              Employer Status <PiWarningCircleLight /> : working
                            </div>
                            <div>
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
                        </div>
                        <div className="col-sm-8 ">
                          <div className={`row `}>
                            {/* ${Candidatedetailstyle.flexContainer} */}
                            <div
                              className={`col-sm-12 ${Candidatedetailstyle.flexContainer}`}
                            >
                              {/* <a
                                href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${data[0].id}&adminId=${adminId}`}
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
                                      data[0].mobileNumber
                                    )
                                  }
                                >
                                  <FaWhatsapp />
                                </div>
                              </div>
                              <div>
                                {/* <div
                                  className={`${Candidatedetailstyle.scheduleinterview}`}
                                >
                                  {showScheduleInterview &&
                                    data[0].id && (
                                      <ScheduleInterview
                                        candidateId={data[0].id}
                                      />
                                    )}{" "}
                                </div> */}
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
                                      <MdCall /> +91 {data[0].mobileNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(data[0].mobileNumber)
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <FaWhatsapp /> +91 {data[0].mobileNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(data[0].mobileNumber)
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  {/* <li>
                                    <a
                                      href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${data.id}&adminId=${adminId}`}
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
                            <div style={{ lineHeight: "2" }}>Email Id </div>
                            <div style={{ lineHeight: "2" }}>Mobile Number</div>
                            <div style={{ lineHeight: "2" }}>Current Job</div>
                            <div style={{ lineHeight: "2" }}>
                              Current Location
                            </div>
                          </div>
                          <div className="col-7">
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {data[0].firstName != ""
                                ? capitalizeWords(data[0].firstName) +
                                  " " +
                                  (data[0].lastName != ""
                                    ? capitalizeWords(data[0].lastName)
                                    : "")
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {data[0].emailId !== "" ? data[0].emailId : "-"}
                            </div>
                            <div
                              className="d-flex "
                              style={{ lineHeight: "2" }}
                            >
                              <div
                                className={`me-3 ${Candidatedetailstyle.numbersstyle}`}
                              >
                                <img src={flag} alt="" width={15} />{" "}
                                <span>{data[0].mobileNumber} </span>
                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(data[0].mobileNumber)
                                  }
                                />
                              </div>
                              <div
                                className={`${Candidatedetailstyle.Phonecall}`}
                              >
                                <MdCall />
                              </div>
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {data[0].jobrole != ""
                                ? capitalizeWords(data[0].jobrole)
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {data[0].currentLocation != ""
                                ? capitalizeWords(data[0].currentLocation)
                                : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-2">
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
                            <div style={{ lineHeight: "2" }}>
                              Degree/Specialization
                            </div>
                          </div>
                          <div className="col-7">
                            {" "}
                            <div style={{ lineHeight: "2" }}>
                              {data[0].qualification != null
                                ? data[0].qualification
                                : "-"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data[0].specification != null
                                ? data[0].specification
                                : "-"}
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="mt-2">
                        <h6>
                          <b>Work Details</b>
                        </h6>
                        <div
                          className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            {/* <div style={{ lineHeight: "2" }}>Job Category </div>
                            <div style={{ lineHeight: "2" }}>Industry</div> */}
                            <div style={{ lineHeight: "2" }}>Experience</div>
                            <div style={{ lineHeight: "2" }}>Preferred Job</div>
                            <div style={{ lineHeight: "2" }}>
                              Preferred Company
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              Preferred Location
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              Preferred Job Area
                            </div> */}
                          </div>
                          <div className="col-7">
                            {/* <div style={{ lineHeight: "2" }}>
                              {data[0].jobCategory != null
                                ? data[0].jobCategory
                                : "-"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data[0].industry != null
                                ? data[0].industry
                                : "-"}
                            </div> */}
                            <div style={{ lineHeight: "2" }}>
                              {data[0].experienceInYears != ""
                                ? data[0].experienceInYears +
                                  " " +
                                  "year(s)" +
                                  (data[0].experienceInMonths != ""
                                    ? data[0].experienceInMonths +
                                      " " +
                                      "month(s)"
                                    : "")
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data[0].appliedJobrole != ""
                                ? capitalizeWords(data[0].appliedJobrole)
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data[0].adminPreferredCompany != ""
                                ? capitalizeWords(data[0].adminPreferredCompany)
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data[0].preferredJobLocation != ""
                                ? capitalizeWords(data[0].preferredJobLocation)
                                : "-"}
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              {data[0].prefArea != null ? data[0].prefArea : "-"}
                            </div> */}
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
                            <div>Key Skills</div>
                          </div>
                          <div className="col-7 ">
                            <div>
                              <div>
                                {/* {data[0].keySkill} 
                                {keySkillsArray.map((skill, index) =>
                                  skill && typeof skill === "string" ? (
                                    <div
                                      className={`${Candidatedetailstyle.KeySkills}`}
                                      key={index}
                                    >
                                      {skill.trim()}
                                    </div>
                                  ) : null
                                )}*/}
                                <div className="d-flex gap-1">
                                  {skills.map((skill, index) =>
                                    skill && typeof skill === "string" ? (
                                      <div
                                        className={`${Candidatedetailstyle.KeySkills}`}
                                        key={index}
                                      >
                                        {capitalizeWords(skill.trim())}
                                      </div>
                                    ) : (
                                      "-"
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
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
                            {/* <div
                              onClick={() => handleTabClick(2)}
                              className={` ${
                                activeTab === 2
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              }`}
                            >
                              Notes
                            </div> */}
                          </div>
                          <hr style={{ borderTop: "10px solid #ccc" }} />
                        </div>

                        <div
                          className={`tab-content ${candidateTabsviewStyle.tab_content}`}
                        >
                          {data[0].id && activeTab === 1 && (
                            <p>
                              <TimelineMidSeniorLevel
                                midSeniorSorcingId={data[0].id}
                              />
                              {/* No Timeline */}
                            </p>
                          )}
                          {data[0].id && activeTab === 2 && <p></p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showConfirmationqualifiedPopup && (
                <MyModal>
                  <ModalContainer
                    zIndex={1005}
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
                              setCanputLead((prev) => ({
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
                            disabled={enableSubmit}
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
                    zIndex={1005}
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
                              setCanputLead((prev) => ({
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
                            disabled={enableSubmit}
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
    </div>
  );
};

export default CandidateMidSourcingView;
