/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import {
  DDMMYYYY_formate,
  Ddmmmyyyy_date,
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
  GetEmployerDetailsByid,
  PutEmployerIsQualified,
  PostEmployerDocument,
  getEmployerDocument,
  getAllDocumentEmployer,
  PostIntroMailEmployer,
} from "../../../apiServices";
import companylogo from "../../../assets/images/Company-Logo.png";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { GoDotFill } from "react-icons/go";
import { BsFileEarmarkPostFill, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react";
import {
  PiDotsThreeOutlineVerticalFill,
  PiWarningCircleLight,
} from "react-icons/pi";
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
  MdEmail,
  MdOutlineContentCopy,
  MdOutlineUploadFile,
} from "react-icons/md";
import candidateTabsviewStyle from "../../../pages/Tabsview/Candidate/CandidateTabsview.module.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  Box,
} from "@mui/material";
import ScheduleInterview from "../../../pages/Candidate/CandidateInterview/scheduleInterview";
import { webConsoleBaseUrl } from "../../../App";
import { commonPopupActions } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
import EmployerTimeline from "../../../pages/Employer/EmployerTimeLine/employerTimeLine";
import EmployerAddTimeLineForm from "../../../pages/Employer/EmployerTimeLine/components/addTimeLine";
import ConfirmationPopup from "../confirmationPopup";
import EmployerEmailSendSLA from "../../../pages/Employer/EmployerRegisterTable/EmployerSendEmail";
import { LoadingButton } from "@mui/lab";
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
const EmployerDetailsView = ({ Id }) => {
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  const [ShowModal1, SetShowModal1] = useState(false);
  const [fileName, setFileName] = useState("");
  const [documents, setDocuments] = useState([]);
  const [filesShow, setFilesShow] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [assignToName, setAssignToName] = useState("");
  const EmpId = Id;
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailsendshow, setEmailsendshow] = useState(false);
  const [employerDetails, setEmployerDetails] = useState({});
  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    isQualified: "",
    openPopup: false,
    empId: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmployerSendSLA, setShowEmployerSendSLA] = useState(false);
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
    Empid: EmpId,
    fromAdminId: { val: adminId == 1 ? "" : adminId, err: false },
  });
  const [show, setShow] = useState({
    resendIntro: false,
    showSuccess: false,
  });

  useEffect(() => {
    console.log(show, "show");
  }, [show]);
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
  function handleFromAdminChange(e) {
    let { value } = e.target;
    setMailDetails((prev) => ({
      ...prev,
      fromAdminId: { val: value, err: false },
    }));
  }
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

    if (error == 0) {
      setIsLoading(true);
      PostIntroMailEmployer(mailDetails)
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

  useEffect(() => {
    async function fetchDocumentTitles() {
      try {
        const response = await getEmployerDocument();
        console.log(Id, "idFor files");
        setDocumentTitles(response.map((doc) => doc.docTitle));
        setFilesShow(response);
        console.log(response, "response");
      } catch (error) {
        console.error("Error fetching document titles:", error);
      }
    }

    fetchDocumentTitles();
  }, []);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  console.log(EmpId, "Employer ids");
  useEffect(() => {
    GetEmployerDetailsByid(EmpId).then((data) => {
      console.log(data.data, "data");
      setEmployerDetails(data.employer);
    });
  }, [EmpId]);

  const success = () => {
    GetEmployerDetailsByid(EmpId).then((data) => {
      console.log(data.data, "data");
      setEmployerDetails(data.employer);
    });
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
      isQualified: isQualified,
      confirmtext: confirmText,
      empId: EmpId,
    }));
  }

  function handleConfirmationClose() {
    setIsQualifiedDetails((prev) => ({
      ...prev,
      openPopup: false,
    }));
  }

  const fetchDocuments = async () => {
    try {
      const data = await getAllDocumentEmployer(Id);
      console.log("Fetched documents:", data);
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, [Id]);

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

  const submitForm = async () => {
    try {
      // Open the backdrop
      const errors = validateForm();

      if (Object.keys(errors).length > 0) {
        // Display error messages and do not proceed with form submission
        setDocumentTypeError(errors.selectedDocumentType || "");
        setFileError(errors.selectedFile || "");

        return;
      }
      setOpen(true);

      // Call the API function with the required parameters
      PostEmployerDocument(
        Id, // Replace with the actual mobile number
        selectedDocumentType,
        adminId, // Replace with the actual admin ID
        selectedFile // Pass the selected file to the function
      )
        .then((result) => {
          // Close the backdrop
          setOpen(false);

          // Handle the result as needed
          console.log(result);

          // want to make field anme empty
          setFileName("");
          setSelectedFile(null);

          // Close the modal
          SetShowModal1(false);
          fetchDocuments();
        })
        .catch(() => {});
    } catch (error) {
      console.error("Error submitting form:", error);

      // Close the backdrop in case of an error
      setOpen(false);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      // You can also perform additional actions with the selectedFile if needed
    } else {
      // User canceled file selection
      setSelectedFile(null);
      setFileName(""); // Clear the file name
    }
  };

  const uploadButtonClick = () => {
    SetShowModal1(true);
  };

  const handleClos = () => {
    setOpen(false);
  };

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
    setDocumentTypeError("");
  };

  function renderDocumentImage(docKey) {
    switch (docKey.toUpperCase()) {
      case "A":
        return (
          <img
            src={DocumentsA}
            alt="Aadhaar Card"
            style={{ width: "50px", height: "50px" }}
          />
        );
      case "D":
        return (
          <img
            src={DocumentsD}
            alt="Driving License"
            style={{ width: "50px", height: "50px" }}
          />
        );
      case "ED":
        return (
          <img
            src={DocumentsEd}
            alt="Education Certificate"
            style={{ width: "50px", height: "50px" }}
          />
        );
      case "V":
        return (
          <img
            src={DocumentsD}
            alt="Voter ID"
            style={{ width: "50px", height: "50px" }}
          />
        );
      case "Re":
        return (
          <img
            src={DocumentsEd}
            alt="Resume"
            style={{ width: "50px", height: "50px" }}
          />
        );
      case "Ex":
        return (
          <img
            src={DocumentsEd}
            alt="Experience Certificate"
            style={{ width: "50px", height: "50px" }}
          />
        );
      // Add cases for other docKey values and their respective images
      default:
        return (
          <img
            src={Documents}
            alt="Default Image"
            style={{ width: "50px", height: "50px" }}
          />
        );
    }
  }

  function ConfirmFormSubmit() {
    PutEmployerIsQualified(isQualifiedDetails)
      .then((data) => {
        setIsQualifiedDetails((prev) => ({
          ...prev,
          openPopup: false,
        }));
        GetEmployerDetailsByid(EmpId).then((data) => {
          setEmployerDetails(data.employer);
        });
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
                        handleEmployerDetailsClose();
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
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        // onClick={() => {
                                        //   handleButtonClick("notQualified");
                                        //   handleConfirmationOpen(true);
                                        // }}
                                      >
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
                          <div
                            className={`${EmployerDetailsStyle.CandidatepastDetails} d-flex  align-items-center`}
                          >
                            <div>
                              {" "}
                              <div className="row d-flex justify-content-between p-2">
                                {" "}
                                <div className="col-sm-10">
                                  {" "}
                                  SLA Mail Status <PiWarningCircleLight />
                                </div>
                                <div className="col-sm-2 ">
                                  {" "}
                                  {employerDetails.slaEmailNotification !=
                                  false ? (
                                    <span className="text-success">
                                      <b>Yes</b>
                                    </span>
                                  ) : (
                                    <span className="text-danger">
                                      <b>No</b>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-8 ">
                          <div className={`row `}>
                            <div
                              className={`col-sm-12 ${EmployerDetailsStyle.flexContainer}`}
                            >
                              <a
                                href={`https://www.taizo.in/waNotifications/customCompanyDetailsUpload.html?empId=${employerDetails.id}&adminId=${adminId}`}
                                target="_blank"
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
                              </a>
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
                              <div
                                className={`${EmployerDetailsStyle.LiaUserEditSolid}`}
                                onClick={() => setEmailsendshow(true)}
                                style={{ cursor: "pointer" }}
                              >
                                <MdEmail className="" />
                              </div>
                              <button
                                className="btn px-3"
                                variant="outlined"
                                style={{
                                  backgroundColor: "#169c50",
                                  color: "white",
                                }}
                              >
                                <a
                                  className="dropdown-item"
                                  href={`https://www.taizo.in/waNotifications/customPostJobPage.html?employer_id=${
                                    employerDetails.id
                                  }&adminId=${localStorage.getItem("adminID")}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                  target="_blank"
                                >
                                  <BsFileEarmarkPostFill className="me-2" /> New
                                  Job post
                                </a>
                              </button>

                              <div></div>
                              <div class="btn-group">
                                <button
                                  type="button"
                                  s
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
                                      href={`${webConsoleBaseUrl}/waNotifications/customCompanyDetailsUpload.html?id=${employerDetails.id}&adminId=${adminId}`}
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
                            <div style={{ lineHeight: "2" }}>Employer Id </div>
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
                            <div
                              onClick={() => handleTabClick(4)}
                              className={` ${
                                activeTab === 4
                                  ? candidateTabsviewStyle.activetag
                                  : candidateTabsviewStyle.unactivetag
                              }`}
                            >
                              Files
                            </div>
                          </div>
                          <hr style={{ borderTop: "10px solid #ccc" }} />
                        </div>

                        <div
                          className={`tab-content ${candidateTabsviewStyle.tab_content}`}
                        >
                          {employerDetails.id && activeTab === 1 && (
                            <p>
                              <EmployerTimeline id={employerDetails.id} />
                            </p>
                          )}
                          {employerDetails.id && activeTab === 2 && (
                            <p>
                              <EmployerAddTimeLineForm
                                // onSuccess={() => {
                                //   getEmpTimeline();
                                // }}
                                empId={employerDetails.id}
                              />
                            </p>
                          )}
                          {/* {activeTab === 3 && <p>Content for Tab 3</p>} */}
                          {activeTab === 4 && (
                            <p>
                              <div
                                variant="contained"
                                onClick={() => {
                                  uploadButtonClick();
                                }}
                                style={{
                                  width: "100%",
                                  margin: "0 auto",
                                  display: "block",
                                  backgroundColor: "#169c5030",
                                  textAlign: "center",
                                  borderColor: " #169C50",
                                  borderStyle: "dotted",
                                  padding: "10px",
                                  color: "#169C50",
                                  cursor: "pointer",
                                }}
                              >
                                <MdOutlineUploadFile /> Upload
                              </div>
                              <>
                                <div>
                                  <hr style={{ margin: "8px 0" }} />
                                  {documents.map((document) => (
                                    <div key={document.empId}>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <a
                                          href={document.docLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {renderDocumentImage(document.docKey)}
                                        </a>
                                        <div style={{ marginLeft: "10px" }}>
                                          <strong>{document.docTitle}</strong>
                                          <p
                                            style={{
                                              margin: 0,
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            Registered:{" "}
                                            <Ddmmmyyyy_date
                                              dateValue={document.created_time}
                                            />
                                          </p>
                                        </div>
                                      </div>
                                      <hr style={{ margin: "8px 0" }} />
                                    </div>
                                  ))}
                                </div>

                                {ShowModal1 && (
                                  <>
                                    <MyModal>
                                      <ModalContainer
                                        zIndex={1005}
                                        open={ShowModal}
                                        onClose={() => SetShowModal(false)}
                                        style={{
                                          width: "500px",
                                          height: "50%",
                                        }}
                                        childComponent={
                                          <>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{ textAlign: "center" }}
                                              >
                                                <h4>Upload Documents</h4>
                                              </div>
                                            </div>
                                            <FormControl
                                              fullWidth
                                              error={!!documentTypeError}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                Select Document
                                              </InputLabel>
                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Select Document"
                                                style={{ minWidth: "200px" }}
                                                onChange={
                                                  handleDocumentTypeChange
                                                }
                                              >
                                                {documentTitles.map((title) => (
                                                  <MenuItem
                                                    key={title}
                                                    value={title}
                                                  >
                                                    {title}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                              <FormHelperText>
                                                {documentTypeError}
                                              </FormHelperText>
                                            </FormControl>
                                            <div style={{ marginTop: "20px" }}>
                                              <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                style={{
                                                  backgroundColor: "#169c5030",
                                                  textAlign: "center",
                                                  borderColor: " #169C50",
                                                  borderStyle: "dotted",
                                                  padding: "10px",
                                                  color: "#169C50",
                                                  cursor: "pointer",
                                                }}
                                              >
                                                Upload file
                                                <VisuallyHiddenInput
                                                  type="file"
                                                  onChange={handleFileChange}
                                                />
                                              </Button>
                                              {fileError && (
                                                <div style={{ color: "red" }}>
                                                  {fileError}
                                                </div>
                                              )}
                                              {fileName && (
                                                <div>
                                                  Uploaded File: {fileName}
                                                </div>
                                              )}
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "5px",
                                              }}
                                            >
                                              {/* cancel button on the left */}
                                              <Button
                                                onClick={() => {
                                                  setFileName("");
                                                  setSelectedFile(null);
                                                  SetShowModal1(false);
                                                }}
                                                variant="outlined"
                                                style={{
                                                  ...buttonStyle,
                                                  color: "red",
                                                  borderColor: "red",
                                                }}
                                              >
                                                Cancel
                                              </Button>

                                              {/* submit button on the right */}
                                              <Button
                                                variant="outlined"
                                                style={buttonStyle}
                                                onClick={submitForm}
                                              >
                                                Submit
                                              </Button>
                                              <Backdrop
                                                sx={{
                                                  color: "#fff",
                                                  zIndex: (theme) =>
                                                    theme.zIndex.drawer + 1,
                                                }}
                                                open={open}
                                                onClick={handleClos} // You can add your own close logic here if needed
                                              >
                                                <CircularProgress color="inherit" />
                                              </Backdrop>
                                            </div>
                                          </>
                                        }
                                      />
                                    </MyModal>
                                  </>
                                )}
                              </>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                              </a>{" "}
                            </div>
                            <div className="mt-2 mb-3">
                              <button
                                className={EmployerDetailsStyle.Emailsendbutton}
                                onClick={() => {
                                  setShowEmployerSendSLA(!showEmployerSendSLA);
                                  setEmailsendshow(false);
                                }}
                              >
                                SLA Email
                              </button>
                            </div>

                            <div>
                              {" "}
                              <button
                                className={EmployerDetailsStyle.Emailsendbutton}
                                onClick={() => {
                                  setShow((prev) => ({
                                    ...prev,
                                    resendIntro: true,
                                  }));
                                  setEmailsendshow(false);
                                }}
                              >
                                Intro Email
                              </button>
                            </div>
                          </>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )}
              {showEmployerSendSLA && (
                <EmployerEmailSendSLA
                  Id={employerDetails.id}
                  onClose={closeSLA}
                  onSuccess={success}
                  toEmail={employerDetails.emailId}
                />
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
                    zIndex={10005}
                    childComponent={
                      <>
                        <div>
                          <div className=" my-3">
                            Intro mail to
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
                              <div className=" d-flex justify-content-center gap-3 flex-row mt-4">
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
                        <SuccessTick HeadText="Intro mail send" />
                      </>
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

export default EmployerDetailsView;
