/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { DDMMYYYY_formate, Detailsshow, MyModal } from "../../../utility";
import ModalContainer from "../../modal_popup";
import DetailsContainer from "../../DetailsContainer";
import Candidatedetailstyle from "./CandidateDetails.module.scss";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  PutCandidateLeadCheck,
  PutMetaLeadAssign,
  getCandidateLead,
} from "../../../apiServices";
import companylogo from "../../../assets/images/user.png";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import flag from "../../../assets/images/flag.png";
// import companylogo from "../../assets/images/Company-Logo.png";
import WhatsappImage from "../../../assets/images/whatsapp-logo-removebg-preview.png";
import { MdCall, MdOutlineContentCopy } from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import { Autocomplete, Card, CardContent, TextField } from "@mui/material";
import ScheduleInterview from "../../../pages/Candidate/CandidateInterview/scheduleInterview";
import { useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
import TimelineFacebookMeta from "../../../pages/Candidate/FacebookMeta/TimelineFacebookMeta";
import AddNotesFBLead from "../../../pages/Candidate/FacebookMeta/PostCandidateNotes";

const CandidateFBLeadDetailsview = ({
  data,
  onClose,
  onAssignChange,
  textHeading,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [candiateDetails, setCandidateDetails] = useState({});
  const [putCandidateLead, setPutcandidateLead] = useState({
    canLeadId: "",
    qualified: false,
    notQualified: false,
  });
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID === 1;
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [CanputLead, setCanputLead] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);

  console.log(data, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

  const [assignAdminto, setAssignAdminto] = useState({
    metaLeadId: "",
    adminId: "",
  });

  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });

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

  const handleLeadAssignfromAdmin = (metaLeadId, adminId) => {
    // let selectedAdminName = event.target.value;
    setAssignAdminto((prev) => ({
      ...prev,
      adminId: adminId,
      metaLeadId: metaLeadId,
    }));
  };

  function ConfirmFormSubmit() {
    if (putCandidateLead.canLeadId) {
      setEnableSubmit(true);
      putCandidateLead.notes = CanputLead.notes;
      PutCandidateLeadCheck(putCandidateLead).then(() => {
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);

        getCandidateLead().then((data) => {
          console.log(data);
          setCandidateDetails(data);
        });
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
                          onClose();
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
                            <b>{data.candidateName} </b>
                          </div>
                          <div>
                            {data.jobCategory ? (
                              <>{data.jobCategory}</>
                            ) : (
                              <> {"Fresher"}</>
                            )}{" "}
                          </div>
                          <div>
                            <div className={``}>
                              <div className={`${FBStyle.StatusStyle}`}>
                                <div>
                                  <>
                                    {data.qualified === true && (
                                      <div className={`${FBStyle.Green_wrp}`}>
                                        <input
                                          type="radio"
                                          name={`status_${data.id}`}
                                          checked={data.qualified}
                                          id={`qualified_${data.id}`}
                                        />
                                        <label htmlFor={`qualified_${data.id}`}>
                                          Qualified
                                        </label>
                                      </div>
                                    )}

                                    {data.notQualified === true && (
                                      <div className={`${FBStyle.chips_wrp}`}>
                                        <input
                                          type="radio"
                                          checked={data.notQualified}
                                          name={`status_${data.id}`}
                                          id={`notQualified_${data.id}`}
                                        />
                                        <label
                                          htmlFor={`notQualified_${data.id}`}
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
                                      onClick={() => {
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
                                            name={`status_${data.id}`}
                                            checked={data.qualified}
                                            id={`qualified_${data.id}`}
                                          />

                                          <label
                                            htmlFor={`qualified_${data.id}`}
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
                                            checked={data.notQualified}
                                            name={`status_${data.id}`}
                                            id={`notQualified_${data.id}`}
                                          />
                                          <label
                                            htmlFor={`notQualified_${data.id}`}
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
                          <DDMMYYYY_formate dateValue={data.createdTime} />
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
                                href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${data.id}&adminId=${adminId}`}
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
                                    handleWhatsAppIconClick(data.whatsappNumber)
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
                                    data.id && (
                                      <ScheduleInterview
                                        candidateId={data.id}
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
                                      {showScheduleInterview && data.id && (
                                        <ScheduleInterview
                                          candidateId={data.id}
                                        />
                                      )}
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <MdCall /> +91 {data.mobileNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(data.mobileNumber)
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <FaWhatsapp /> +91 {data.whatsappNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(data.whatsappNumber)
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
                            {/* <div style={{ lineHeight: "2" }}>Gender</div> */}
                            {/* <div style={{ lineHeight: "2" }}>
                              Current Location
                            </div> */}
                            <div style={{ lineHeight: "2" }}>Mobile Number</div>
                            <div style={{ lineHeight: "2" }}>
                              Whatsapp Number
                            </div>
                          </div>
                          <div className="col-7">
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {data.candidateName != null
                                ? data.candidateName
                                : "-"}
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              {data.gender != null ? data.gender : "-"}
                            </div> */}
                            {/* <div style={{ lineHeight: "2" }}>
                              {data.city != null ? data.city : "-"} ,{" "}
                              {data.state != null ? data.state : "-"}
                            </div> */}
                            <div
                              className="d-flex "
                              style={{ lineHeight: "2" }}
                            >
                              <div
                                className={`me-3 ${Candidatedetailstyle.numbersstyle}`}
                              >
                                <img src={flag} alt="" width={15} />{" "}
                                <span>{data.mobileNumber} </span>
                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(data.mobileNumber)
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
                                <img src={WhatsappImage} alt="" width={16} />
                                <span>
                                  {data.whatsappNumber
                                    ? data.whatsappNumber.slice(-10)
                                    : ""}
                                </span>

                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(data.whatsappNumber)
                                  }
                                />
                              </div>
                              <div
                                className={`${Candidatedetailstyle.Phonecall}`}
                              >
                                <FaWhatsapp
                                  onClick={() =>
                                    handleWhatsAppIconClick(data.whatsappNumber)
                                  }
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
                              {data.educationQualification != null
                                ? data.educationQualification
                                : "-"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data.specification != null
                                ? data.specification
                                : "-"}
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
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>Job Category </div>
                            <div style={{ lineHeight: "2" }}>Industry</div>
                            <div style={{ lineHeight: "2" }}>Experience</div>
                            <div style={{ lineHeight: "2" }}>
                              Preferred Job City
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              Preferred Job Area
                            </div> */}
                          </div>
                          <div className="col-7">
                            <div style={{ lineHeight: "2" }}>
                              {data.jobCategory != null
                                ? data.jobCategory
                                : "-"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data.industry != null ? data.industry : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data.experience != null ? data.experience : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {data.preferredLocation != null
                                ? data.preferredLocation
                                : "-"}
                            </div>
                            {/* <div style={{ lineHeight: "2" }}>
                              {data.prefArea != null ? data.prefArea : "-"}
                            </div> */}
                          </div>
                        </div>
                      </div>
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
                                {/* {data.keySkill} 
                                {keySkillsArray.map((skill, index) =>
                                  skill && typeof skill === "string" ? (
                                    <div
                                      className={`${Candidatedetailstyle.KeySkills}`}
                                      key={index}
                                    >
                                      {skill.trim()}
                                    </div>
                                  ) : null
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {isSuperAdmin && (
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
                                      variant="standard"
                                    />
                                  )}
                                />
                              </div>
                              {/* {!isSuperAdmin && (
                              <div style={{ lineHeight: "2" }}>
                                {adminDetails.adminName &&
                                  adminDetails.id &&
                                  adminDetails.adminName[
                                    adminDetails.id.indexOf(data.assignTo)
                                  ]}
                              </div>
                            )} */}
                            </div>
                          </div>
                        </div>
                      )}
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
                          {data.id && activeTab === 1 && (
                            <p>
                              <TimelineFacebookMeta facebookId={data.id} />
                            </p>
                          )}
                          {data.id && activeTab === 2 && (
                            <p>
                              {/* <TimeLineForm canId={data.id} /> */}
                              <Card
                                style={{
                                  maxWidth: 700,
                                  minWidth: 350,
                                  margin: "0 auto",
                                }}
                              >
                                <CardContent>
                                  <AddNotesFBLead
                                    facebookId={data.id}

                                    // close={() => {
                                    //   showTimeLineDetails("addNotes", false);
                                    // }}
                                  />
                                </CardContent>
                              </Card>
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

export default CandidateFBLeadDetailsview;
