/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import {
  DDMMYYYY_formate,
  Detailsshow,
  MyModal,
  emailValidation,
} from "../../../utility";
import ModalContainer from "../../modal_popup";
import DetailsContainer from "../../DetailsContainer";
import EmployerDetailsStyle from "./EmployerDetailsview.module.scss";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  PostIntroMail,
  PutEmployerIsQualified,
  PutEmployerLeadCheck,
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
import WhatsappImage from "../../../assets/images/whatsapp-logo-removebg-preview.png";
import { MdCall, MdEmail, MdOutlineContentCopy } from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import { styled as muiStyled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  Box,
  InputLabel,
} from "@mui/material";
import ScheduleInterview from "../../../pages/Candidate/CandidateInterview/scheduleInterview";
import { webConsoleBaseUrl } from "../../../App";
import { commonPopupActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
import ConfirmationPopup from "../confirmationPopup";
import { LoadingButton } from "@mui/lab";
import EmployerSendSLA from "../../../pages/Employer/employerLead/sendSLA";
import EmployerLeadTimeline from "../../../pages/Employer/employerLead/LeadTimeLine/TimelineView";
import EmpLeadAddTimeLineForm from "../../../pages/Employer/employerLead/LeadTimeLine/addTimelines";
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
const EmployerLeadDetailsView = ({ employerDetails, onClose }) => {
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [assignToName, setAssignToName] = useState("");
  //   const EmpId = Id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailsendshow, setEmailsendshow] = useState(false);
  //   const [employerDetails, setEmployerDetails] = useState({});
  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    qualified: "",
    notQualified: "",
    openPopup: false,
    empLeadId: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmployerSendSLA, setShowEmployerSendSLA] = useState(false);
  const [ShowModal, SetShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const adminId = localStorage.getItem("adminID");
  const [adminSignaturenot, setadminSignaturenot] = useState(false);

  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID === 1;
  const [assignAdminto, setAssignAdminto] = useState({
    candidateId: "",
    adminId: "",
  });
  const [adminDetails, setAdminDetails] = useState({
    id: null,
    adminName: [],
  });
  const Dispatch = useDispatch();
  function handleEmployerDetailsClose() {
    // Use history.goBack() to go back one page in the browser history
    // navigate("/candidate_Job");
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "hide",
      })
    );
  }
  const [mailDetails, setMailDetails] = useState({
    ccMail: { val: "", err: "" },
    paymentDays: { val: "", err: "" },
    leadId: employerDetails.id,
    fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
  });
  const [show, setShow] = useState({
    resendIntro: false,
    showSuccess: false,
  });

  useEffect(() => {
    console.log(show, "show");
  }, [show]);

  function handleIntroMailResend(e) {
    e.preventDefault();
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
    // setShowSuccess(true);
    if (error == 0) {
      setIsLoading(true);
      PostIntroMail(mailDetails)
        .then((data) => {
          if (data.statusCode === 400) {
            setadminSignaturenot(true);
            return;
          }
          setShow((prev) => ({ ...prev, showSuccess: true }));
        })
        .catch((err) => {
          alert("Something went wrong " + err);
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            // setShowSuccess(false);
            handleClose();
          }, 3000);
        });
    }
  }

  function handleIntroMailChange(e) {
    let { value } = e.target;
    setMailDetails((prev) => ({ ...prev, ccMail: { val: value, err: "" } }));
  }
  function handlePaymentChange(e) {
    let { value } = e.target;
    setMailDetails((prev) => ({
      ...prev,
      paymentDays: { val: value, err: "" },
    }));
  }
  function handleClose() {
    setShow({
      resendIntro: false,
      showSuccess: false,
    });
  }

  const [showScheduleInterview, setShowScheduleInterview] = useState(true);

  useEffect(() => {
    const params = window.location.href;

    let isShowScheduleInterview = params.includes("interview_schedule_list");
    console.log(params, "parameterrrs");
    setShowScheduleInterview(!isShowScheduleInterview);
  }, []);

  const [documentTitles, setDocumentTitles] = useState([]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  console.log(employerDetails.id, "Employer ids");

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
  const closeSLA = () => {
    setShowEmployerSendSLA(false);
  };
  function openIsQualifyPopup(status) {
    let confirmText = "";
    let isQualified;
    if (status == "qualify") {
      confirmText = `Are you sure you want to qualify <b>${employerDetails.companyName}</b> `;
      isQualified = true;
    } else {
      confirmText = `Are you sure you want to not qualify <b>${employerDetails.companyName}</b> `;
      isQualified = false;
    }
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: true,
      confirmtext: confirmText,
      qualified: isQualified,
      notQualified: !isQualified,
      empLeadId: employerDetails.id,
    }));
  }

  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }

  function ConfirmFormSubmit() {
    PutEmployerLeadCheck(isQualifiedDetails)
      .then((data) => {
        // setShowLoader(true);
        setIsQualifiedDetails((prev) => ({
          ...prev,
          openPopup: false,
        }));

        employerDetails();
      })

      .catch((err) => {
        console.log(err);
      });
  }
  function getEmployerStatus(employer) {
    console.log(employer);
    if (employer.contactDetailsFilled && employer.regProofNumber != null) {
      return <span className="text-success"> Completed</span>;
    } else if (!employer.contactDetailsFilled) {
      return <span className="text-danger"> Step 2</span>;
    } else if (
      employer.contactDetailsFilled &&
      employer.regProofNumber == null
    ) {
      return <span className="text-warning"> Step 3</span>;
    } else {
    }
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
  function handleFromAdminChange(e) {
    let { value } = e.target;
    setMailDetails((prev) => ({
      ...prev,
      fromAdminId: { val: value, err: false },
    }));
  }
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });
  }, []);
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
              <div className={`${EmployerDetailsStyle.boxcross}`}>
                <div
                  className={` ${EmployerDetailsStyle.CrossStyle} pe-5 pe-lg-4`}
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
              <div className={`${EmployerDetailsStyle.boxwidth}`}>
                <div className="container-fluid">
                  <div className={`row ${EmployerDetailsStyle.topcontainer}`}>
                    <div className="col-sm-4">
                      <div className="row">
                        <div className="col-sm-4">
                          {" "}
                          {employerDetails.companyLogo ? (
                            <img
                              src={employerDetails.companyLogo}
                              alt="employer Profile"
                              width={80}
                            />
                          ) : (
                            <img src={companylogo} alt="Profile" width={80} />
                          )}
                        </div>
                        <div className="col-sm-6">
                          <div>
                            <b>{employerDetails.companyName}</b>
                          </div>
                          <div>
                            {employerDetails.industry ? (
                              <>{employerDetails.industry}</>
                            ) : (
                              <> </>
                            )}{" "}
                          </div>
                          <div>
                            <div className={``}>
                              <div className={`${FBStyle.StatusStyle}`}>
                                <div>
                                  <>
                                    {employerDetails.qualified === true && (
                                      <div className={`${FBStyle.Green_wrp}`}>
                                        <input
                                          type="radio"
                                          name={`status_${employerDetails.id}`}
                                          checked={employerDetails.qualified}
                                          id={`qualified_${employerDetails.id}`}
                                        />
                                        <label
                                          htmlFor={`qualified_${employerDetails.id}`}
                                        >
                                          Qualified
                                        </label>
                                      </div>
                                    )}

                                    {employerDetails.notQualified === true && (
                                      <div className={`${FBStyle.chips_wrp}`}>
                                        <input
                                          type="radio"
                                          checked={employerDetails.notQualified}
                                          name={`status_${employerDetails.id}`}
                                          id={`notQualified_${employerDetails.id}`}
                                        />
                                        <label
                                          htmlFor={`notQualified_${employerDetails.id}`}
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
                                          //   onClick={() => {
                                          //     handleButtonClick("qualified");
                                          //     handleConfirmationOpenQualify(true);
                                          //   }}
                                        >
                                          <input
                                            type="radio"
                                            // ref={inputRef.qualified}
                                            name={`status_${employerDetails.id}`}
                                            checked={employerDetails.qualified}
                                            id={`qualified_${employerDetails.id}`}
                                          />

                                          <label
                                            htmlFor={`qualified_${employerDetails.id}`}
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
                                      <a className="dropdown-item" href="#">
                                        <div
                                          className={`${FBStyle.select_wrp}`}
                                        >
                                          <input
                                            // ref={inputRef.notQualified}
                                            type="radio"
                                            checked={
                                              employerDetails.notQualified
                                            }
                                            name={`status_${employerDetails.id}`}
                                            id={`notQualified_${employerDetails.id}`}
                                          />
                                          <label
                                            htmlFor={`notQualified_${employerDetails.id}`}
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
                        <div className={`${EmployerDetailsStyle.Createdon}`}>
                          Created on :{" "}
                          <DDMMYYYY_formate
                            dateValue={employerDetails.createdTime}
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
                            className={`${EmployerDetailsStyle.verticalLine}`}
                          ></div> */}
                          {/* <div
                            className={`${EmployerDetailsStyle.CandidatepastDetails}`}
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
                            {/* ${EmployerDetailsStyle.flexContainer} */}
                            <div
                              className={`col-sm-12 ${EmployerDetailsStyle.flexContainer}`}
                            >
                              {/* <a
                                href={`${webConsoleBaseUrl}/waNotifications/customCompanyDetailsUpload.html?empId=${employerDetails.id}&adminId=${adminId}`}
                                target="_blank"
                                // className="nav-link"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <div
                                  className={`${EmployerDetailsStyle.LiaUserEditSolid}`}
                                >
                                  <div className="mb-1">
                                    {" "}
                                    <LiaUserEditSolid />
                                  </div>
                                </div>
                              </a> */}
                              <div
                                className={`${EmployerDetailsStyle.LiaUserEditSolid}`}
                              >
                                <div
                                  className="mb-1"
                                  onClick={() =>
                                    handleWhatsAppIconClick(
                                      employerDetails.whatsappNumber
                                    )
                                  }
                                >
                                  <FaWhatsapp />
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`${EmployerDetailsStyle.SendEmail}`}
                                  onClick={() => setEmailsendshow(true)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <MdEmail className="me-2" /> Send Email
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
                                  className={`${EmployerDetailsStyle.ThreeOutline}`}
                                >
                                  <PiDotsThreeOutlineVerticalFill />
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      {showScheduleInterview &&
                                        employerDetails.id && (
                                          <ScheduleInterview
                                            candidateId={employerDetails.id}
                                          />
                                        )}
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <MdCall /> +91{" "}
                                      {employerDetails.mobileNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(
                                            employerDetails.mobileNumber
                                          )
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item" type="button">
                                      <FaWhatsapp /> +91{" "}
                                      {employerDetails.whatsappNumber}{" "}
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(
                                            employerDetails.whatsappNumber
                                          )
                                        }
                                        className="ms-5"
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <a
                                      href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${employerDetails.id}&adminId=${adminId}`}
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
                      className={`col-sm-4 pb-4 rounded ${EmployerDetailsStyle.personalDetails}`}
                    >
                      <div className="mt-2">
                        <h6>
                          <b>Company Details</b>
                        </h6>
                        <div
                          className={`row ${EmployerDetailsStyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              No.of Employees
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              Reg.proof No.
                            </div>
                            <div style={{ lineHeight: "2" }}>KYC status</div>
                            <div style={{ lineHeight: "2" }}>Year Founded</div>
                            <div style={{ lineHeight: "2" }}>Reference</div>
                            <div style={{ lineHeight: "2" }}>Address</div>
                          </div>
                          <div className="col-7">
                            {" "}
                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.noOfEmployees != null
                                ? employerDetails.noOfEmployees
                                : "-"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.regProofNumber != null
                                ? employerDetails.regProofNumber
                                : "-"}{" "}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.kycStatus != null
                                ? employerDetails.kycStatus
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.yearFounded != null
                                ? employerDetails.yearFounded
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.reference != null
                                ? employerDetails.reference
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.address != null
                                ? employerDetails.address
                                : "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        {" "}
                        <h6>
                          <b>Other Details</b>
                        </h6>
                        <div
                          className={`row ${EmployerDetailsStyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div style={{ lineHeight: "2" }}>Lead Id </div>
                            <div style={{ lineHeight: "2" }}>Name </div>
                            <div style={{ lineHeight: "2" }}>Email Id</div>
                            <div style={{ lineHeight: "2" }}>
                              Current Location
                            </div>
                            <div style={{ lineHeight: "2" }}>Mobile Number</div>
                            <div style={{ lineHeight: "2" }}>
                              Whatsapp Number
                            </div>
                            <div style={{ lineHeight: "3" }}>Status</div>
                          </div>
                          <div className="col-7">
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {employerDetails.id != null
                                ? employerDetails.id
                                : "-"}
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {" "}
                              {employerDetails.contactPersonName != null
                                ? employerDetails.contactPersonName
                                : "-"}
                            </div>

                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.emailId != null
                                ? employerDetails.emailId
                                : "-"}
                            </div>

                            <div style={{ lineHeight: "2" }}>
                              {employerDetails.city != null
                                ? employerDetails.city
                                : "-"}{" "}
                              ,{" "}
                              {employerDetails.state != null
                                ? employerDetails.state
                                : "-"}
                            </div>
                            <div
                              className="d-flex "
                              style={{ lineHeight: "2" }}
                            >
                              <div
                                className={`me-3 ${EmployerDetailsStyle.numbersstyle}`}
                              >
                                <img src={flag} alt="" width={15} />{" "}
                                <span>{employerDetails.mobileNumber} </span>
                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(
                                      employerDetails.mobileNumber
                                    )
                                  }
                                />
                              </div>
                              <div
                                className={`${EmployerDetailsStyle.Phonecall}`}
                              >
                                <MdCall />
                              </div>
                            </div>

                            <div className="d-flex" style={{ lineHeight: "2" }}>
                              <div
                                className={`me-3 ${EmployerDetailsStyle.Whatsapnumbersstyle}`}
                              >
                                <img src={WhatsappImage} alt="" width={16} />
                                <span>{employerDetails.whatsappNumber} </span>
                                <MdOutlineContentCopy
                                  onClick={() =>
                                    handleCopyNumber(
                                      employerDetails.whatsappNumber
                                    )
                                  }
                                />
                              </div>
                              <div
                                className={`${EmployerDetailsStyle.Phonecall}`}
                              >
                                <FaWhatsapp
                                  onClick={() =>
                                    handleWhatsAppIconClick(
                                      employerDetails.whatsappNumber
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ lineHeight: "2" }}>
                              {getEmployerStatus(employerDetails)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <h6>
                          <b>Other Details</b>
                        </h6>
                        <div
                          className={`row ${EmployerDetailsStyle.CanDetailsRow}`}
                        >
                          <div className="col-5">
                            <div>Form</div>
                          </div>
                          <div className="col-7 ">
                            <div>
                              <div>
                                {employerDetails.fromWeb
                                  ? "Web"
                                  : employerDetails.fromApp
                                  ? "App"
                                  : employerDetails.fromAdmin
                                  ? "Admin"
                                  : "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isSuperAdmin && (
                        <div className="mt-2">
                          <h6>
                            <b>Admin Details</b>
                          </h6>
                          <div
                            className={`row ${EmployerDetailsStyle.CanDetailsRow}`}
                          >
                            <div className="col-5">
                              <div>Assigned To</div>
                            </div>
                            <div className="col-7">
                              {
                                adminName[
                                  adminid.indexOf(employerDetails.assignTo)
                                ]
                              }
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={` col-sm-8 rounded  ${EmployerDetailsStyle.DailyDetailsupdate}`}
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
                          </div>
                          <hr style={{ borderTop: "10px solid #ccc" }} />
                        </div>

                        <div
                          className={`tab-content ${candidateTabsviewStyle.tab_content}`}
                        >
                          {employerDetails.id && activeTab === 1 && (
                            <p>
                              <EmployerLeadTimeline id={employerDetails.id} />
                            </p>
                          )}
                          {employerDetails.id && activeTab === 2 && (
                            <p>
                              <EmpLeadAddTimeLineForm
                                empLeadId={employerDetails.id}
                              />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={showLoader}
                onClick={() => {}} // Prevent closing on backdrop click
              >
                <CircularProgress color="inherit" />
              </Backdrop>

              {emailsendshow && (
                <MyModal>
                  <ModalContainer
                    zIndex={2000}
                    childComponent={
                      <>
                        <div
                          className={`${EmployerDetailsStyle.BoxWidthchildComponent}`}
                        >
                          <>
                            <div className="row">
                              <div className="col-sm-6">Send Email</div>
                              <div className="col-sm-6 d-flex justify-content-end">
                                <RxCrossCircled
                                  className="text-danger fs-3"
                                  onClick={() => setEmailsendshow(false)}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            </div>
                            <div>
                              <a href="#" className="text-decoration-none">
                                {employerDetails.emailId}
                              </a>
                            </div>
                            <div className="p-3">
                              <div className="mt-2 mb-3">
                                <button
                                  className={
                                    EmployerDetailsStyle.Emailsendbutton
                                  }
                                  onClick={() => {
                                    setShowEmployerSendSLA(
                                      !showEmployerSendSLA
                                    );
                                    setEmailsendshow(false);
                                  }}
                                >
                                  SLA Email
                                </button>
                              </div>

                              <div>
                                {" "}
                                <button
                                  className={`text-center ${EmployerDetailsStyle.Emailsendbutton}`}
                                  onClick={() =>
                                    setShow((prev) => ({
                                      ...prev,
                                      resendIntro: true,
                                    }))
                                  }
                                >
                                  Intro Email
                                </button>
                              </div>
                            </div>
                          </>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )}
              {showEmployerSendSLA && (
                <EmployerSendSLA
                  Id={employerDetails.id}
                  onClose={closeSLA}
                  onSuccess={closeSLA}
                  toEmail={employerDetails.emailId}
                  companyName={employerDetails.companyName}
                />
              )}
              {adminSignaturenot && (
                <MyModal>
                  <ModalContainer
                    zIndex={5000}
                    childComponent={
                      <>
                        <div style={{ width: "300px" }}>
                          <div className="">This admin has no signature </div>
                          <div className="d-flex justify-content-end mt-2">
                            <div
                              className="btn btn-danger "
                              onClick={() => {
                                setadminSignaturenot(false);
                              }}
                            >
                              Ok
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )}
              {isQualifiedDetails.openPopup && (
                <MyModal>
                  <ModalContainer
                    zIndex={10000}
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

              {show.resendIntro && (
                <MyModal>
                  <ModalContainer
                    zIndex={10006}
                    childComponent={
                      <>
                        <div>
                          <div className=" my-3">
                            Resend Intro mail to
                            <b> {employerDetails.companyName}</b>
                          </div>

                          <div className="d-grid justify-content-center">
                            <form
                              onSubmit={(e) => {
                                handleIntroMailResend(e);
                              }}
                              className="d-grid justify-content-center "
                              action=""
                            >
                              {/* {isSuperAdmin && ( */}
                              <>
                                <Box sx={{ minWidth: 120 }}>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                      Intro Mail From
                                    </InputLabel>
                                    <Select
                                      MenuProps={{
                                        style: {
                                          zIndex: 10007,
                                        },
                                      }}
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="fromAdminId"
                                      value={mailDetails.fromAdminId.val}
                                      label="Intro Mail From"
                                      onChange={(e) => {
                                        handleFromAdminChange(e);
                                      }}
                                      required
                                      autoComplete="off"
                                    >
                                      <MenuItem value={2}>Sowmiya</MenuItem>
                                      <MenuItem value={4}>Anees</MenuItem>
                                      <MenuItem value={7}>Saravanan</MenuItem>
                                      <MenuItem value={13}>Nirmala</MenuItem>
                                      <MenuItem value={19}>Dinesh</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </>
                              {/* )} */}
                              <div className="mt-3">
                                <TextField
                                  id="outlined-basic"
                                  label="CC mail"
                                  variant="outlined"
                                  // required
                                  onChange={handleIntroMailChange}
                                  value={mailDetails.ccMail.val}
                                  // helperText={"Plase"}
                                  // error={true}
                                  helperText={mailDetails.ccMail.err}
                                  error={Boolean(mailDetails.ccMail.err)}
                                />
                              </div>
                              <div className="mt-3">
                                <TextField
                                  id="outlined-basic"
                                  label="Payment Policy (in days)"
                                  variant="outlined"
                                  required
                                  inputProps={{ maxLength: 2 }}
                                  onChange={handlePaymentChange}
                                  value={mailDetails.paymentDays.val}
                                  // helperText={"Plase"}
                                  // error={true}
                                  helperText={mailDetails.paymentDays.err}
                                  error={Boolean(mailDetails.paymentDays.err)}
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
                    zIndex={10010}
                    childComponent={
                      <>
                        <SuccessTick HeadText="Into mail send" />
                      </>
                    }
                  />
                </MyModal>
              )}
              {/* {showSuccess && (
                <MyModal>
                  <ModalContainer
                    zIndex={10000}
                    childComponent={<SuccessTick HeadText="Successfully" />}
                  />
                </MyModal>
              )} */}
            </>
          }
        />
      </Detailsshow>
    </div>
  );
};

export default EmployerLeadDetailsView;
