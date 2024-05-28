import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import {
  PutCandidateIsQualified,
  getcandidateDetails,
  getCandidateDocument,
  PutCandidateDocument,
  getDocumentCandidate,
} from "../../apiServices";
import candidateStyle from "./Candidatedetails.module.scss";
import jobListStyle from "../../pages/Filter/Jobs/components/jobList.module.scss";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import jobDetailsStyle from "./jobDetail.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import companylogo from "../../assets/images/Company-Logo.png";
import Documents from "../../assets/images/Documents.png";
import DocumentsEd from "../../assets/images/pdf_img.png";
import DocumentsD from "../../assets/images/word_img.png";
import DocumentsA from "../../assets/images/img_img.png";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { commonPopupActions } from "../../redux-store/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch } from "react-redux";
import CandidateTimeline from "../../pages/Candidate/CandidateTimeLine/CandidateTimeline";
import { webConsoleBaseUrl } from "../../App";
import { styled as muiStyled } from "@mui/material/styles";
import TimeLineForm from "../../pages/Candidate/CandidateTimeLine/components/timeLinePost";
import { Ddmmmyyyy_date, MyModal } from "../../utility";
import ModalContainer from "../../components/modal_popup";
import ConfirmationPopup from "../../components/ModalPopups/confirmationPopup";
import ScheduleInterview from "../../pages/Candidate/CandidateInterview/scheduleInterview";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

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
// import { useNavigate } from "react-router-dom";

const CandidatePopup = ({ Id }) => {
  const [fileError, setFileError] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [documents, setDocuments] = useState([]);
  const [ShowModal, SetShowModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClos = () => {
    setOpen(false);
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
      PutCandidateDocument(
        candiateDetails.mobileNumber, // Replace with the actual mobile number
        selectedDocumentType,
        adminId, // Replace with the actual admin ID
        selectedFile // Pass the selected file to the function
      )
        .then((result) => {
          // Close the backdrop
          setOpen(false);
          fetchDocuments();

          // Handle the result as needed
          console.log(result);

          // want to make field anme empty
          setFileName("");
          setSelectedFile(null);

          // Close the modal
          SetShowModal(false);
        })
        .catch(() => {});
    } catch (error) {
      console.error("Error submitting form:", error);

      // Close the backdrop in case of an error
      setOpen(false);
    }
  };

  const [showContainedButton, setShowContainedButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [candiateDetails, setCandidateDetails] = useState({});
  const [activeTab, setActiveTab] = useState("tab1");
  const [toolTip, setToolTip] = useState(false);

  const [fileName, setFileName] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
  }, [candiateDetails.id]);

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
    setDocumentTypeError("");
  };
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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

  const candiateId = Id;

  const [isQualifiedDetails, setIsQualifiedDetails] = useState({
    confirmtext: "",
    isQualified: "",
    openPopup: false,
    candidateId: "",
  });

  const adminId = localStorage.getItem("adminID");
  const Dispatch = useDispatch();

  const style = {
    position: "fixed",
    top: "0",
    left: "0",
    // bgcolor: "rgb(211, 211, 211)",
    border: "2px solid white",
    width: "100vw",
    height: "100vh",
    boxShadow: 24,
    pt: 5,
    // p: 4,
    // overflow: "scroll",
  };

  const handleClick = (tab) => {
    setActiveTab(tab);
    if (tab === "tab4") {
      setShowContainedButton(true);
    }
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

  function ConfirmFormSubmit() {
    PutCandidateIsQualified(isQualifiedDetails)
      .then(() => {
        setIsQualifiedDetails((prev) => ({
          ...prev,
          openPopup: false,
        }));
        getcandidateDetails(candiateId).then((data) => {
          console.log(data);
          setCandidateDetails(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClose() {
    // Use history.goBack() to go back one page in the browser history
    // navigate("/candidate_Job");
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "hide",
      })
    );
  }

  useEffect(() => {
    getcandidateDetails(candiateId).then((data) => {
      console.log(data);
      setCandidateDetails(data);
    });
  }, []);

  const handlePhoneIconClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };
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
  // const location = useLocation();

  return (
    <>
      <div
        className={`ps-4 ps-sm-0 container-fluid ${candidateStyle.container}`}
      >
        <div className="text-center">
          <h3 className="text-bold py-2">Candidate Details</h3>
        </div>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        ></Typography>
        <div id="modal-modal-description " sx={{ mt: 2 }}>
          <div className="">
            <div className={`d-grid justify-content-center    `}>
              <div className="d-grid justify-content-end mx-sm-4">
                <button
                  className=" btn btn-outline-danger "
                  style={{
                    marginTop: "-40px",
                    // marginBottom: "-40px",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
              <div
                className="px-sm-4 px-2 pt-2 bg-white"
                style={{
                  overflowY: "auto",
                  height: "90vh",
                }}
              >
                <div className="row ">
                  <div className=" bg-darkk col-md-7  d-flex flex-column flex-sm-row align-items-start gap-2">
                    {/* <img src={logo} alt=" " width={60} /> */}
                    <div className="rounded-3 p-3 ">
                      {candiateDetails.profilePic ? (
                        <img
                          src={candiateDetails.profilePic}
                          alt="Candidate Profile"
                          width={70}
                        />
                      ) : (
                        <img src={companylogo} alt="Profile" width={50} />
                      )}
                    </div>
                    <div className="row d-flex flex-column">
                      <div>
                        <b>Name : </b>
                        {candiateDetails.firstName}
                      </div>{" "}
                      <div>
                        {" "}
                        <b>Age : </b> {candiateDetails.age}
                      </div>
                      <div>
                        {" "}
                        <b>Gender : </b> {candiateDetails.gender}
                      </div>
                      <div>
                        {" "}
                        <b>Candidate Id : </b>
                        {candiateDetails.id}
                      </div>
                      <div>
                        <b>Location : </b>
                        {candiateDetails.currentCity ? (
                          <>{candiateDetails.currentCity}</>
                        ) : (
                          <>Null</>
                        )}
                        ,
                        {candiateDetails.state ? (
                          <>{candiateDetails.state}</>
                        ) : (
                          <>Null</>
                        )}
                        <div>
                          <b>Preferred Job Location: </b>
                          {candiateDetails.prefLocation != null
                            ? candiateDetails.prefLocation
                            : "Null"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 ">
                    <div>
                      <div className="">
                        {candiateDetails.whatsappNumber && (
                          <>
                            <div
                              className={`btn rounded-2 ms-1 ${jobListStyle.buttom_candi_list}`}
                              onClick={() =>
                                handleWhatsAppIconClick(
                                  candiateDetails.whatsappNumber
                                )
                              }
                            >
                              {/* <FontAwesomeIcon icon={faWhatsapp} /> */}
                              <WhatsAppIcon
                                sx={{ color: "green" }}
                                className="me-2"
                              />
                              {candiateDetails.whatsappNumber}
                            </div>
                            <button
                              className="btn btn-body btn-sm "
                              onClick={() =>
                                handleCopyNumber(candiateDetails.whatsappNumber)
                              }
                            >
                              <ContentCopyIcon />{" "}
                            </button>
                          </>
                        )}
                        {candiateDetails.mobileNumber && (
                          <>
                            <div
                              className={`btn rounded-2 ms-1 mt-2 ${jobListStyle.buttom_candi_list}`}
                              onClick={() =>
                                handlePhoneIconClick(
                                  candiateDetails.mobileNumber
                                )
                              }
                            >
                              <LocalPhoneRoundedIcon
                                sx={{ color: "green" }}
                                className="me-2"
                              />
                              {candiateDetails.mobileNumber}
                            </div>
                            <button
                              className="btn btn-body btn-sm"
                              onClick={() =>
                                handleCopyNumber(candiateDetails.mobileNumber)
                              }
                            >
                              <ContentCopyIcon />
                            </button>
                          </>
                        )}
                      </div>
                      <div
                        className={`btn rounded-2 btn-success px-5 ms-2 mt-2`}
                      >
                        <a
                          href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${candiateDetails.id}&adminId=${adminId}`}
                          target="_blank"
                          // className="nav-link"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          {/* <b>
                            <RxUpdate />
                          </b>{" "} */}
                          Update {"  "}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid justify-content-end  my-2 ">
                    <div
                      className="d-flex flex-sm-row align-items-center justfy-content-center flex-column"
                      // style={{ width: "x" }}
                    >
                      <span className="mt-2">
                        {showScheduleInterview && (
                          <ScheduleInterview candidateId={candiateId} />
                        )}
                      </span>
                      {/* )} */}
                      <span className="mt-2">
                        {(candiateDetails.notQualified ||
                          candiateDetails.qualified) && (
                          <>
                            {candiateDetails.qualified && (
                              <>
                                <button
                                  // variant="contained"
                                  // color="primary"
                                  className="mx-2 btn btn-primary"
                                >
                                  {/* <CheckCircleIcon /> */}
                                  <FaThumbsUp /> Qualified
                                </button>
                              </>
                            )}
                            {candiateDetails.notQualified && (
                              <>
                                <button
                                  // variant="contained"
                                  // color="error"
                                  className="mx-2 btn btn-danger"
                                >
                                  {/* <NotInterestedIcon /> */}
                                  <FaThumbsDown /> Not Qualified
                                </button>
                              </>
                            )}
                          </>
                        )}

                        {!(
                          candiateDetails.notQualified ||
                          candiateDetails.qualified
                        ) && (
                          <FormControl
                            sx={{ width: "150px" }}
                            className="mx-2"
                            fullWidth
                          >
                            <InputLabel id="demo-simple-select-label">
                              Select Status
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="select status"
                            >
                              <MenuItem>
                                <>
                                  <div
                                  // className={`${candidateFBmeta.select_wrp}`}
                                  >
                                    <div
                                      onClick={() => {
                                        openIsQualifyPopup("qualify");
                                      }}
                                      sx={{
                                        mr: isSmallScreen ? 2 : 5, // Use mx:2 for small screens, mx:5 for others
                                      }}
                                      variant="contained"
                                      color="primary"
                                    >
                                      {/* <CheckCircleIcon /> */}
                                      <label htmlFor="">Qualify</label>
                                    </div>{" "}
                                  </div>
                                </>
                              </MenuItem>
                              <MenuItem>
                                <>
                                  <div
                                  // className={`${candidateFBmeta.select_wrp}`}
                                  >
                                    <div
                                      onClick={() => {
                                        openIsQualifyPopup("notQualify");
                                      }}
                                      sx={{
                                        mr: isSmallScreen ? 2 : 5, // Use mx:2 for small screens, mx:5 for others
                                        my: isSmallScreen && 1,
                                      }}
                                      variant="contained"
                                      color="error"
                                    >
                                      {/* <NotInterestedIcon /> */}
                                      <label htmlFor=""> Not Qualify</label>
                                    </div>
                                  </div>
                                </>
                              </MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <ul className={`nav nav-tabs ${jobDetailsStyle.nav_tabr}`}>
                    <li
                      className={`nav-item ${jobDetailsStyle.nav_items} ${
                        activeTab === "tab1" ? jobDetailsStyle.active : ""
                      }`}
                    >
                      <button
                        className={`nav-link ${jobDetailsStyle.nav_links}`}
                        onClick={() => handleClick("tab1")}
                      >
                        Details
                      </button>
                    </li>
                    <li
                      className={`nav-item mx-1 ${jobDetailsStyle.nav_items} ${
                        activeTab === "tab2" ? jobDetailsStyle.active : ""
                      }`}
                    >
                      <button
                        className={`nav-link ${jobDetailsStyle.nav_links}`}
                        onClick={() => handleClick("tab2")}
                      >
                        Timeline
                      </button>
                    </li>

                    <li
                      className={`nav-item mx-1 ${jobDetailsStyle.nav_items} ${
                        activeTab === "tab3" ? jobDetailsStyle.active : ""
                      }`}
                    >
                      <button
                        className={`nav-link ${jobDetailsStyle.nav_links}`}
                        onClick={() => handleClick("tab3")}
                      >
                        Notes
                      </button>
                    </li>
                    <li
                      className={`nav-item mx-1 ${jobDetailsStyle.nav_items} ${
                        activeTab === "tab4" ? jobDetailsStyle.active : ""
                      }`}
                    >
                      <button
                        className={`nav-link ${jobDetailsStyle.nav_links}`}
                        onClick={() => handleClick("tab4")}
                      >
                        Files
                      </button>
                    </li>
                  </ul>
                </div>
                <div className={` ${candidateStyle.tab_content1}`}>
                  {activeTab === "tab1" && (
                    <div className={`tab-pane ${style.active}`}>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <h5>
                            <b>Work</b>
                          </h5>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="col-sm-4">
                                  <b>Job Role</b>
                                </div>
                                <div className="col-sm-8">
                                  {candiateDetails.jobCategory ? (
                                    <>{candiateDetails.jobCategory}</>
                                  ) : (
                                    <> Fresher</>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-4">
                                  <b>Industry </b>
                                </div>
                                <div className="col-sm-8">
                                  {candiateDetails.industry ? (
                                    <>{candiateDetails.industry}</>
                                  ) : (
                                    <> </>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-4">
                                  <b>Experience</b>
                                </div>
                                <div className="col-sm-8">
                                  {" "}
                                  {candiateDetails.experience} year(s) and{" "}
                                  {candiateDetails.expMonths} Month(s)
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-4">
                                  <b>Key skill</b>
                                </div>
                                <div className="col-sm-8">
                                  {candiateDetails.keySkill}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 d-flex flex-column ">
                          <h5>
                            <b>Personal</b>
                          </h5>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="col-sm-6">
                                  <b>Qualification</b>
                                </div>
                                <div className="col-sm-6">
                                  {candiateDetails.qualification}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6">
                                  <b>Degree/Specialization</b>
                                </div>
                                <div className="col-sm-6">
                                  {candiateDetails.specification}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6">
                                  <b>Certification Courses</b>
                                </div>
                                <div className="col-sm-6">
                                  {candiateDetails.certificationSpecialization}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6">
                                  <b>Languages known</b>
                                </div>
                                <div className="col-sm-6">
                                  {candiateDetails.languageKey}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row">
                            <div className="col-sm-6">
                              <h5>
                                <b>Interview Details</b>
                              </h5>
                              <div className="row">
                                <div className="col-sm-10">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <b>Schedule on</b>
                                    </div>
                                    <div className="col-sm-6">Schedule</div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <b>Documents Required</b>
                                    </div>
                                    <div className="col-sm-6">{candiateDetails.documents} </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <b>Contact person name</b>
                                    </div>
                                    <div className="col-sm-6">{candiateDetails.firstName}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                      <p></p>
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className={`tab-pane ${style.active}`}>
                      <CandidateTimeline canId={candiateDetails.id} />{" "}
                    </div>
                  )}

                  {activeTab === "tab3" && (
                    <div className={`tab-pane ${style.active}`}>
                      {/* <EventForm canId={candiateDetails.id} />{" "} */}
                      <TimeLineForm canId={candiateDetails.id} />
                    </div>
                  )}
                  {activeTab === "tab4" && (
                    <div className={`tab-pane ${style.active}`}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          uploadButtonClick();
                        }}
                        style={{
                          width: "200px",
                          margin: "0 auto",
                          display: "block",
                        }}
                      >
                        Upload
                      </Button>

                      <div>
                        <hr style={{ margin: "8px 0" }} />
                        {documents.map((document) => (
                          <div key={document.id}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
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
                      {/* <EventForm canId={candiateDetails.id} />{" "} */}
                      {/* <TimeLineForm canId={candiateDetails.id} /> */}
                      {ShowModal && (
                        <>
                          <MyModal>
                            <ModalContainer
                              open={ShowModal}
                              onClose={() => SetShowModal(false)}
                              style={{ width: "50%", height: "50%" }}
                              childComponent={
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div style={{ textAlign: "center" }}>
                                      <h4>Upload Resume</h4>
                                    </div>
                                    {/* <div style={{ marginLeft: '10px' }}>
                                    <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                    setShowForm(false);
                                    }}
                                    size="small"
                                    disableRipple
                                  >
                                <CloseIcon />
                                </Button>
                                </div> */}
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
                                      onChange={handleDocumentTypeChange}
                                    >
                                      {documentTitles.map((title, index) => (
                                        <MenuItem key={index} value={title}>
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
                                      <div>Uploaded File: {fileName}</div>
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
                                        SetShowModal(false);
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
                          ;
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isQualifiedDetails.openPopup && (
            <MyModal>
              <ModalContainer
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
        </div>
      </div>
    </>
  );
};

export default CandidatePopup;
