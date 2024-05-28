/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
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
  PutCandidateLeadAssignto,
  PutCandidateLeadCheck,
  getCandidateDocument,
  getCandidateLead,
  getDocumentCandidate,
  GetQualifiedForm,
} from "../../../apiServices";
import companylogo from "../../../assets/images/user.png";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import flag from "../../../assets/images/flag.png";

import WhatsappImage from "../../../assets/images/whatsapp-logo-removebg-preview.png";
import { MdCall, MdOutlineContentCopy } from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import { TextField, Autocomplete } from "@mui/material";
import ScheduleInterview from "../../../pages/Candidate/CandidateInterview/scheduleInterview";
import { commonPopupActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
import CandidateLeadTimeline from "../../../pages/Candidate/CandidateLeadTable/LeadTimeLine";
import AddNotesCandidateLead from "../../../pages/Candidate/CandidateLeadTable/components/timeLinePost";
// const VisuallyHiddenInput = muiStyled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: "50px",
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const CandidateLeadDetailsview = ({ Id, textHeading }) => {
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [assignToName, setAssignToName] = useState("");
  //   const candidateId = Id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [candiateDetails, setCandidateDetails] = useState({});
  const [candiateQualifyDetails, setcandiateQualifyDetails] = useState([]);
  const [putCandidateLead, setPutcandidateLead] = useState({
    canLeadId: "",
    qualified: false,
    notQualified: false,
  });
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [CanputLead, setCanputLead] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [detailsactiveTab, setDetailsActiveTab] = useState(1);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [documents, setDocuments] = useState([]);
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
  const candidateId = Id;
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

  const fetchDocuments = async () => {
    try {
      const data = await getDocumentCandidate(candiateDetails.id);
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candiateDetails]);

  // const navigate = useNavigate();

  const [showScheduleInterview, setShowScheduleInterview] = useState(true);

  useEffect(() => {
    const params = window.location.href;

    let isShowScheduleInterview = params.includes("interview_schedule_list");
    console.log(params, "parameterrrs");
    setShowScheduleInterview(!isShowScheduleInterview);
  }, []);

  const [documentTitles, setDocumentTitles] = useState([]);

  useEffect(() => {
    async function fetchDocumentTitles() {
      try {
        const response = await getCandidateDocument();
        setDocumentTitles(response.map((doc) => doc.docTitle));
      } catch (error) {
        console.error("Error fetching document titles:", error);
      }
    }

    fetchDocumentTitles();
  }, []);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const handlepersonalTabClick = (tabNumber) => {
    setDetailsActiveTab(tabNumber);
  };
  console.log(candidateId, "candidate ids");

  useEffect(() => {
    getCandidateLead(candidateId).then((data) => {
      //   const modifiedData = {
      //     ...data,
      //     firstName: data.name,
      //   };

      //   delete modifiedData.name;

      console.log(data, "datasdgh");
      setCandidateDetails(data);
    });
  }, [candidateId]);

  useEffect(() => {
    GetQualifiedForm(candidateId, " ").then((data) => {
      console.log(data, "uuuy");
      // eslint-disable-next-line array-callback-return

      setcandiateQualifyDetails(data);
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
  const handleIsQualified = (status) => {
    if (status === "notQualified") {
      setPutcandidateLead({
        canLeadId: candiateDetails.id,
        qualified: false,
        notQualified: true,
      });
    } else {
      setPutcandidateLead((prev) => ({
        ...prev,
        canLeadId: candiateDetails.id,
        qualified: true,
        notQualified: false,
      }));
    }
  };

  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }
  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  function ConfirmFormSubmit() {
    if (putCandidateLead.canLeadId) {
      setEnableSubmit(true);
      putCandidateLead.notes = CanputLead.notes;
      PutCandidateLeadCheck(putCandidateLead).then((data) => {
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);

        getCandidateLead(candidateId).then((data) => {
          console.log(data);
          setCandidateDetails(data);
        });
        setEnableSubmit(false);
      });
    }
  }
  useEffect(() => {
    if (assignAdminto.adminId && assignAdminto.candidateId) {
      PutCandidateLeadAssignto(assignAdminto).then((data) => {
        if (data.code != 200) {
          alert("something went wrong");
          return false;
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        // onAssignChange();
        getCandidateLead(candidateId).then((data) => {
          console.log(data, "datasdgh");
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
  const certificationArray =
    candiateDetails.certificationCourses &&
    typeof candiateDetails.certificationCourses === "string"
      ? candiateDetails.certificationCourses.split(",")
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
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="text-light ms-3">{textHeading}</h4>
                  </div>
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
                          {candiateDetails.profilePic != null ? (
                            <img
                              src={candiateDetails.profilePic}
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
                              {capitalizeWords(candiateDetails.name) +
                                " " +
                                capitalizeWords(candiateDetails.lastName)}{" "}
                            </b>
                          </div>
                          <div>
                            {candiateDetails.jobCategory ? (
                              <>
                                {capitalizeWords(candiateDetails.jobCategory)}
                              </>
                            ) : (
                              <> {"Fresher"}</>
                            )}{" "}
                          </div>
                          <div>
                            <strong>Age : </strong>
                            {candiateDetails.age != null
                              ? candiateDetails.age
                              : "-"}
                          </div>
                          <div>
                            <strong>From Source : </strong>
                            {candiateDetails.fromSource != null
                              ? candiateDetails.fromSource
                              : "-"}
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
                                      onClick={(event) => {
                                        handleConfirmationOpenQualify(true);
                                        handleIsQualified("qualified");
                                      }}
                                    >
                                      <a className="dropdown-item" href="#">
                                        <div
                                          className={`${FBStyle.select_wrp}`}
                                          onClick={() => {
                                            handleButtonClick("qualified");
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
                                      onClick={(event) => {
                                        handleConfirmationOpen(true);
                                        handleIsQualified("notQualified");
                                      }}
                                    >
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          handleButtonClick("notQualified")
                                        }
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
                              <div>
                                {/* <div
                                  className={`${Candidatedetailstyle.scheduleinterview}`}
                                >
                                  {showScheduleInterview &&
                                    candiateDetails.id && (
                                      <ScheduleInterview
                                        candidateId={candiateDetails.id}
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
                                      {showScheduleInterview &&
                                        candiateDetails.id && (
                                          <ScheduleInterview
                                            candidateId={candiateDetails.id}
                                          />
                                        )}
                                    </button>
                                  </li>
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
                      className={`col-sm-4 pb-4 rounded ${Candidatedetailstyle.personalDetailsbuttons}`}
                    >
                      <div
                        className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}
                        // style={{ backgroundColor: "gray" ,color:"#fff",cursor:"pointer"}}
                      >
                        <div
                          className={`d-flex ${candidateTabsviewStyle.tab_hr}`}
                        >
                          <div
                            onClick={() => handlepersonalTabClick(1)}
                            className={` ${
                              detailsactiveTab === 1
                                ? candidateTabsviewStyle.activetag
                                : candidateTabsviewStyle.unactivetag
                            } `}
                          >
                            Basic Details
                          </div>
                          <div
                            onClick={() => handlepersonalTabClick(2)}
                            className={` ${
                              detailsactiveTab === 2
                                ? candidateTabsviewStyle.activetag
                                : candidateTabsviewStyle.unactivetag
                            }`}
                          >
                            Qualify Form Details
                          </div>
                        </div>
                        <hr style={{ borderTop: "10px solid #ccc" }} />
                      </div>
                      <div
                        className={`tab-content ${candidateTabsviewStyle.tab_content} ${Candidatedetailstyle.scolltabs} `}
                        style={{ height: "80vh", overflow: "auto" }}
                      >
                        {candiateDetails.id && detailsactiveTab === 1 && (
                          <>
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
                                  <div style={{ lineHeight: "2" }}>Gender</div>
                                  <div style={{ lineHeight: "2" }}>
                                    Date Of Birth
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Current Location
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Mobile Number
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Whatsapp Number
                                  </div>
                                </div>
                                <div className="col-7">
                                  <div style={{ lineHeight: "2" }}>
                                    {" "}
                                    {candiateDetails.name != null
                                      ? capitalizeWords(candiateDetails.name) +
                                        " " +
                                        capitalizeWords(
                                          candiateDetails.lastName
                                        )
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.gender != ""
                                      ? capitalizeWords(candiateDetails.gender)
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.dateOfBirth != ""
                                      ? candiateDetails.dateOfBirth
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.city != null
                                      ? candiateDetails.city
                                      : "-"}{" "}
                                    ,{" "}
                                    {candiateDetails.state != null
                                      ? candiateDetails.state
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
                                        {candiateDetails.mobileNumber}{" "}
                                      </span>
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
                                      style={{ cursor: "pointer" }}
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
                                      <img
                                        src={WhatsappImage}
                                        alt=""
                                        width={16}
                                      />
                                      <span>
                                        {candiateDetails.whatsappNumber}{" "}
                                      </span>
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
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
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
                                  <div style={{ lineHeight: "2" }}>
                                    Degree/Specialization
                                  </div>
                                </div>
                                <div className="col-7">
                                  {" "}
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.qualification != null
                                      ? candiateDetails.qualification
                                      : "-"}{" "}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.specification != null
                                      ? candiateDetails.specification
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="mt-2">
                              <h6>
                                <b>Work Details</b>
                              </h6>
                              <div
                                className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                              >
                                <div className="col-5">
                                  <div style={{ lineHeight: "2" }}>
                                    Job Category{" "}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Industry
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Experience
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Preferred Job City
                                  </div>
                                  {/* <div style={{ lineHeight: "2" }}>
                                    Preferred Job Area
                                  </div> */}
                            {/*  </div>
                                <div className="col-7">
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.jobCategory != null
                                      ? candiateDetails.jobCategory
                                      : "-"}{" "}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.industry != null
                                      ? candiateDetails.industry
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.expYears != null
                                      ? candiateDetails.expYears
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.city != null
                                      ? candiateDetails.city
                                      : "-"}
                                  </div>
                                  {/* <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.prefArea != null
                                      ? candiateDetails.prefArea
                                      : "-"}
                                  </div> 
                                </div>
                              </div>
                            </div> */}
                            {/* <div className="mt-2">
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
                                      
                                      {keySkillsArray.map((skill, index) =>
                                        skill && typeof skill === "string" ? (
                                          <div
                                            className={`${Candidatedetailstyle.KeySkills}`}
                                            key={index}
                                          >
                                            {skill.trim()}
                                          </div>
                                        ) : (
                                          "-"
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                              >
                                <div className="col-5">
                                  <div>Certification</div>
                                </div>
                                <div className="col-7 ">
                                  <div>
                                    <div>
                                   
                                      {certificationArray.map((course, index) =>
                                        course && typeof course === "string" ? (
                                          <div
                                            className={`${Candidatedetailstyle.KeySkills}`}
                                            key={index}
                                          >
                                            {course.trim()}
                                          </div>
                                        ) : (
                                          "-"
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}
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
                                                adminDetails.id[
                                                  adminNameIndex
                                                ] !== undefined
                                              ) {
                                                const adminId =
                                                  adminDetails.id[
                                                    adminNameIndex
                                                  ];
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
                          </>
                        )}
                        {(candiateDetails.candidateType !== "Experienced" ||
                          candiateDetails.experienced === null) &&
                          candiateDetails.id &&
                          detailsactiveTab === 2 && (
                            <>
                              <div className="mt-2">
                                <h6>
                                  <b>Job Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    <div style={{ lineHeight: "2" }}>
                                      Position applied for
                                    </div>
                                    <div style={{ lineHeight: "2" }}></div>
                                    <div style={{ lineHeight: "2" }}>
                                      Preferred job city
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Preferred job area
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Do we have job in this location?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.jobCategory != null
                                        ? candiateDetails.jobCategory
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.prefLocation != null
                                        ? candiateDetails.prefLocation
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.canSuitableJobLocation !=
                                            null
                                              ? capitalizeWords(
                                                  candiateDetails.canSuitableJobLocation
                                                )
                                              : "-"}
                                          </div> */}

                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingJobLocation != null
                                        ? candiateDetails.havingJobLocation
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
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
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Education
                                          </div>
                                          <div style={{ lineHeight: "2" }}>
                                            Specialization
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Mechanical related course ?
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Any arrear?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Is there a gap now after education?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candidate.education != null
                                              ? candidate.education
                                              : "-"}
                                          </div>
                                          <div style={{ lineHeight: "2" }}>
                                            {candidate.specialization != null
                                              ? candidate.specialization
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candidate.isMechanicalRelatedDegree !=
                                            null
                                              ? candidate.isMechanicalRelatedDegree
                                                ? "Yes"
                                                : "No"
                                              : "-"}
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.isHavingArrear === "Yes"
                                        ? "Yes"
                                        : "No"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingEducationalGap !=
                                      null
                                        ? candiateDetails.havingEducationalGap
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              {/* <div className="mt-2">
                                      <h6>
                                        <b>Expertise Details</b>
                                      </h6>
                                      <div
                                        className={`row ${candiateDetailsdetailstyle.CanDetailsRow}`}
                                      >
                                        <div className="col-7">
                                          <div style={{ lineHeight: "2" }}>
                                            Skills and Certifications
                                          </div>
                                        </div>
                                        <div className="col-5">
                                          <div style={{ lineHeight: "2" }}>
                                            {candidate.skillsCertifications !=
                                            null
                                              ? candidate.skillsCertifications
                                              : "-"}
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                              <div className="mt-2">
                                <h6>
                                  <b>Background Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    <div style={{ lineHeight: "2" }}>
                                      Current stay location?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Current stay type?
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Ready to relocate?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.city != null
                                        ? capitalizeWords(candiateDetails.city)
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candidate.currentStayType != null
                                              ? candidate.currentStayType
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candidate.readyToRelocate !=
                                      null
                                        ? candidate.readyToRelocate
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h6>
                                  <b>Salary Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    <div style={{ lineHeight: "2" }}>
                                      Expected Salary?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Current stay type?
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Ready to work for suggested salary ?
                                          </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.expectedSalary != null
                                        ? candiateDetails.expectedSalary
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candidate.currentStayType != null
                                              ? candidate.currentStayType
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candidate.workForSuggestedSalary !=
                                            null
                                              ? candidate.workForSuggestedSalary
                                              : "-"}
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
                                    <div style={{ lineHeight: "2" }}>
                                      Rotational shifts?
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Accomodation needed?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Transport needed?
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Updated CV/Resume?
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Reference
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Immediate Joiner
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Notice Peroid
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>Notes</div>
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.readyForShifts != null
                                        ? candiateDetails.readyForShifts
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.needAccommodation != null
                                        ? candiateDetails.needAccommodation
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.needTransport !=
                                      null
                                        ? candiateDetails.needTransport
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingUpdatedCv
                                        ? "Yes"
                                        : "No"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.reference != null
                                        ? candiateDetails.reference
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.immediateJoiner != null
                                              ? candiateDetails.immediateJoiner
                                                ? "Yes"
                                                : "No"
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.noticePeriod != null
                                        ? candiateDetails.noticePeriod
                                        : "-"}
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.notes != null
                                        ? candiateDetails.notes
                                        : "-"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                        {
                          // candidate.experienced &&
                          candiateDetails.candidateType === "Experienced" &&
                            // candiateDetails.currentlyWorking &&
                            candiateDetails.currentlyworking === true &&
                            candiateDetails.id &&
                            detailsactiveTab === 2 && (
                              <>
                                <div className="mt-2">
                                  <h6>
                                    <b>Current Status</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      <div style={{ lineHeight: "2" }}>
                                        Reason for jobchange
                                      </div>
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.reason_for_jobchange !=
                                        null
                                          ? candiateDetails.reason_for_jobchange
                                          : "-"}
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
                                      <div style={{ lineHeight: "2" }}>
                                        Position applied for
                                      </div>
                                      <div style={{ lineHeight: "2" }}></div>
                                      <div style={{ lineHeight: "2" }}>
                                        Preferred job city
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                            Preferred job area
                                          </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                        Do we have job in this location?
                                      </div> */}
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.jobCategory != null
                                          ? candiateDetails.jobCategory
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.prefLocation != null
                                          ? candiateDetails.prefLocation
                                          : "-"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.havingJobLocation !=
                                        null
                                          ? candiateDetails.havingJobLocation
                                            ? "Yes"
                                            : "No"
                                          : "-"}
                                      </div> */}
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
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Education
                                            </div>
                                            <div style={{ lineHeight: "2" }}>
                                              Specialization
                                            </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Mechanical related course?
                                            </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Any arrear?
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                      Is there a gap now after education?
                                    </div> */}
                                    </div>
                                    <div className="col-7">
                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candidate.education != null
                                                ? candidate.education
                                                : "-"}
                                            </div>
                                            <div style={{ lineHeight: "2" }}>
                                              {candidate.specialization != null
                                                ? candidate.specialization
                                                : "-"}
                                            </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candidate.isMechanicalRelatedDegree !=
                                              null
                                                ? candidate.isMechanicalRelatedDegree
                                                  ? "Yes"
                                                  : "No"
                                                : "-"}
                                            </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.isHavingArrear ===
                                        "Yes"
                                          ? "Yes"
                                          : "No"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                      {candidate.havingEducationalGap !=
                                      null
                                        ? candidate.havingEducationalGap
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <h6>
                                    <b>Experience Details</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      {/* <div style={{ lineHeight: "2" }}>
                                        Current position name?
                                      </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Current industry?
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Experience in years
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Experience in Months
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                        long work gap?
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Exp. for same industry & job category?
                                      </div> */}
                                    </div>
                                    <div className="col-7">
                                      {/* <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.jobrole != null
                                          ? candiateDetails.jobrole
                                          : "-"}
                                      </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.industry != null
                                          ? candiateDetails.industry
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.experience != null
                                          ? candiateDetails.experience +
                                            " " +
                                            "year(s)"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.expMonths != null
                                          ? candiateDetails.expMonths +
                                            " " +
                                            "month(s)"
                                          : "-"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.havingWorkGap != null
                                          ? candiateDetails.havingWorkGap
                                            ? "Yes"
                                            : "No"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.overallExperience !=
                                        null
                                          ? candiateDetails.overallExperience
                                            ? "Yes"
                                            : "No"
                                          : "-"}
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="mt-2">
                                      <h6>
                                        <b>Expertise Details</b>
                                      </h6>
                                      <div
                                        className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                      >
                                        <div className="col-5">
                                          <div style={{ lineHeight: "2" }}>
                                            Skills and Certifications
                                          </div>
                                        </div>
                                        <div className="col-7">
                                          <div style={{ lineHeight: "2" }}>
                                            {candidate.skillsCertifications !=
                                            null
                                              ? candidate.skillsCertifications
                                              : "-"}
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                <div className="mt-2">
                                  <h6>
                                    <b>Current Work Details</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      <div style={{ lineHeight: "2" }}>
                                        Current company name
                                      </div>

                                      <div style={{ lineHeight: "2" }}>
                                        Company location
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Current job type
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Current work hours
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Notice Period
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Immediate Joiner
                                            </div> */}
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.companyName != null
                                          ? candiateDetails.companyName
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.companyLocation != null
                                          ? candiateDetails.companyLocation
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.jobType != null
                                          ? candiateDetails.jobType
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.jobWorkHours != null
                                          ? candiateDetails.jobWorkHours
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.noticePeriod != null
                                          ? candiateDetails.noticePeriod
                                          : "-"}
                                      </div>

                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candidate.immediateJoiner != null
                                                ? candidate.immediateJoiner
                                                  ? "Yes"
                                                  : "No"
                                                : "-"}
                                            </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <h6>
                                    <b>Background Details</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      <div style={{ lineHeight: "2" }}>
                                        Current stay location?
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Current stay type?
                                            </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                      Ready to relocate?
                                    </div> */}
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.city != null
                                          ? candiateDetails.city
                                          : "-"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candidate.currentStayType != null
                                                ? candidate.currentStayType
                                                : "-"}
                                            </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                      {candidate.readyToRelocate !=
                                      null
                                        ? candidate.readyToRelocate
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <h6>
                                    <b>Current Salary Details</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      {/* <div style={{ lineHeight: "2" }}>
                                        current salary?
                                      </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Take home salary?
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Expected salary?
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Salary Document?
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Current stay type?
                                            </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Ready to work for suggested salary
                                              ?
                                            </div> */}
                                    </div>
                                    <div className="col-7">
                                      {/* <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.adminSuggestedSalary !=
                                        null
                                          ? candiateDetails.adminSuggestedSalary
                                          : "-"}
                                      </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.takeHomeSalary != null
                                          ? candiateDetails.takeHomeSalary
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.expectedSalary != null
                                          ? candiateDetails.expectedSalary
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.salaryProofDocumentType !=
                                        null
                                          ? candiateDetails.salaryProofDocumentType
                                          : "-"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candiateDetails.currentStayType != null
                                                ? candiateDetails.currentStayType
                                                : "-"}
                                            </div> */}
                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candiateDetails.workForSuggestedSalary !=
                                              null
                                                ? candiateDetails.workForSuggestedSalary
                                                : "-"}
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
                                      <div style={{ lineHeight: "2" }}>
                                        Rotational shifts?
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Accomodation needed?
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                      Transport needed?
                                    </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Updated CV/Resume?
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Reference
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              Immediate Joiner
                                            </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Notice Peroid
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Notes
                                      </div>
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.readyForShifts != null
                                          ? candiateDetails.readyForShifts
                                            ? "Yes"
                                            : "No"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.needAccommodation !=
                                        null
                                          ? candiateDetails.needAccommodation
                                            ? "Yes"
                                            : "No"
                                          : "-"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.needTransport !=
                                      null
                                        ? candiateDetails.needTransport
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.havingUpdatedCV
                                          ? "Yes"
                                          : "No"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.reference != null
                                          ? candiateDetails.reference
                                          : "-"}
                                      </div>
                                      {/* <div style={{ lineHeight: "2" }}>
                                              {candiateDetails.immediateJoiner != null
                                                ? candiateDetails.immediateJoiner
                                                  ? "Yes"
                                                  : "No"
                                                : "-"}
                                            </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.noticePeriod != null
                                          ? candiateDetails.noticePeriod
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.notes != null
                                          ? candiateDetails.notes
                                          : "-"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                        }

                        {candiateDetails.candidateType === "Experienced" &&
                          candiateDetails.currentlyworking === false &&
                          candiateDetails.id &&
                          detailsactiveTab === 2 && (
                            <>
                              <div className="mt-2">
                                <h6>
                                  <b>Current Status</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    <div style={{ lineHeight: "2" }}>
                                      Reason for unemployment
                                    </div>
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.reason_for_unemployment !=
                                      null
                                        ? candiateDetails.reason_for_unemployment
                                        : "-"}
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
                                    <div style={{ lineHeight: "2" }}>
                                      Position applied for
                                    </div>
                                    <div style={{ lineHeight: "2" }}></div>
                                    <div style={{ lineHeight: "2" }}>
                                      Preferred job city
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Preferred job area
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Do we have job in this location?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.jobCategory != null
                                        ? candiateDetails.jobCategory
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.prefLocation != null
                                        ? candiateDetails.prefLocation
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingJobLocation != null
                                        ? candiateDetails.havingJobLocation
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
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
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Education
                                          </div>
                                          <div style={{ lineHeight: "2" }}>
                                            Specialization
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Mechanical related course?
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Any arrear?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Is there a gap now after education?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.education != null
                                              ? candiateDetails.education
                                              : "-"}
                                          </div>
                                          <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.specialization != null
                                              ? candiateDetails.specialization
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.isMechanicalRelatedDegree !=
                                            null
                                              ? candiateDetails.isMechanicalRelatedDegree
                                                ? "Yes"
                                                : "No"
                                              : "-"}
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.isHavingArrear === "Yes"
                                        ? "Yes"
                                        : "No"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingEducationalGap !=
                                      null
                                        ? candiateDetails.havingEducationalGap
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h6>
                                  <b>Experience Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Previous position name
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Previous industry
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Experience in years
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Experience in months
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      long work gap?
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Exp. for same industry and job category?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.jobrole != null
                                        ? candiateDetails.jobrole
                                        : "-"}
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.industry != null
                                        ? candiateDetails.industry
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.experience != null
                                        ? candiateDetails.experience +
                                          " " +
                                          "year(s)"
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.expMonths != null
                                        ? candiateDetails.expMonths +
                                          " " +
                                          "month(s)"
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingWorkGap != null
                                        ? candiateDetails.havingWorkGap
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.overallExperience != null
                                        ? candiateDetails.overallExperience
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              {/* <div className="mt-2">
                                      <h6>
                                        <b>Expertise Details</b>
                                      </h6>
                                      <div
                                        className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                      >
                                        <div className="col-5">
                                          <div style={{ lineHeight: "2" }}>
                                            Skills and Certifications
                                          </div>
                                        </div>
                                        <div className="col-7">
                                          <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.skillsCertifications !=
                                            null
                                              ? candiateDetails.skillsCertifications
                                              : "-"}
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                              <div className="mt-2">
                                <h6>
                                  <b>Previous Work Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    <div style={{ lineHeight: "2" }}>
                                      Previous company name
                                    </div>

                                    <div style={{ lineHeight: "2" }}>
                                      Previous location
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Previous job type
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Previous work hours
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Notice Period
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Immediate Joiner
                                          </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.companyName != null
                                        ? candiateDetails.companyName
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.companyLocation != null
                                        ? candiateDetails.companyLocation
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.jobType != null
                                        ? candiateDetails.jobType
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.jobWorkHours != null
                                        ? candiateDetails.jobWorkHours
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.noticePeriod != null
                                        ? candiateDetails.noticePeriod
                                        : "-"}
                                    </div>

                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.immediateJoiner != null
                                              ? candiateDetails.immediateJoiner
                                                ? "Yes"
                                                : "No"
                                              : "-"}
                                          </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h6>
                                  <b>Background Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    <div style={{ lineHeight: "2" }}>
                                      current stay location?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Previous stay type?
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Ready to relocate?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.city != null
                                        ? candiateDetails.city
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.currentStayType != null
                                              ? candiateDetails.currentStayType
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.readyToRelocate !=
                                      null
                                        ? candiateDetails.readyToRelocate
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h6>
                                  <b>Previous Salary Details</b>
                                </h6>
                                <div
                                  className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                >
                                  <div className="col-5">
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Previous salary?
                                    </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Take home salary?
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Expected salary?
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Salary Document?
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Previous stay type?
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                      Exp. for same industry and job category?
                                    </div> */}
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {/* {candiateDetails.adminSuggestedSalary !=
                                      null
                                        ? candiateDetails.adminSuggestedSalary
                                        : "-"} */}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.takeHomeSalary != null
                                        ? candiateDetails.takeHomeSalary
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.expectedSalary != null
                                        ? candiateDetails.expectedSalary
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.salaryProofDocumentType !=
                                      null
                                        ? candiateDetails.salaryProofDocumentType
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.currentStayType != null
                                              ? candiateDetails.currentStayType
                                              : "-"}
                                          </div> */}
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.workForSuggestedSalary !=
                                            null
                                              ? candiateDetails.workForSuggestedSalary
                                              : "-"}
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
                                    <div style={{ lineHeight: "2" }}>
                                      Rotational shifts?
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Accomodation needed
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Transport needed
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Updated CV/Resume
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Reference
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            Immediate Joiner
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      Notice Peroid
                                    </div>
                                    <div style={{ lineHeight: "2" }}>Notes</div>
                                  </div>
                                  <div className="col-7">
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.readyForShifts != null
                                        ? candiateDetails.readyForShifts
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.needAccommodation != null
                                        ? candiateDetails.needAccommodation
                                          ? "Yes"
                                          : "No"
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.needTransport != null
                                              ? candiateDetails.needTransport
                                                ? "Yes"
                                                : "No"
                                              : "-"}
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.havingUpdatedCV
                                        ? "Yes"
                                        : "No"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.reference != null
                                        ? candiateDetails.reference
                                        : "-"}
                                    </div>
                                    {/* <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.immediateJoiner != null
                                              ? candiateDetails.immediateJoiner
                                                ? "Yes"
                                                : "No"
                                              : "-"}
                                          </div> */}
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.noticePeriod != null
                                        ? candiateDetails.noticePeriod
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.notes != null
                                        ? candiateDetails.notes
                                        : "-"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
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
                              <CandidateLeadTimeline
                                canLeadId={candiateDetails.id}
                              />
                            </p>
                          )}
                          {candiateDetails.id && activeTab === 2 && (
                            <p>
                              {/* <TimeLineForm canId={candiateDetails.id} /> */}
                              <AddNotesCandidateLead
                                canId={candiateDetails.id}
                                // close={() => {
                                //   showTimeLineDetails("addNotes", false);
                                // }}
                              />
                            </p>
                          )}
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

export default CandidateLeadDetailsview;
