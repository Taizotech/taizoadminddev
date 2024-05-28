/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  DDMMYYYY_formate,
  Ddmmmyyyy_date,
  Detailsshow,
  MyModal,
  calculateAge,
  capitalizeWords,
  dateFormateDD,
} from "../../../utility";
import ModalContainer from "../../modal_popup";
import DetailsContainer from "../../DetailsContainer";
import Candidatedetailstyle from "./CandidateDetails.module.scss";
import { useEffect } from "react";
import {
  GetAllsdminDetails,
  getJobRole,
  GetCandidateQualifyForm,
  GetQualifiedForm,
  PutCandidateInterviewFollowup,
  PutCandidateAssignto,
  PutCandidateDocument,
  PutCandidateIsQualified,
  getCandidateDocument,
  getDocumentCandidate,
  getcandidateDetails,
  GetCompanyName,
  PutCandidateType,
  PutCandidateJoinedFollowUp,
} from "../../../apiServices";
import companylogo from "../../../assets/images/user.png";
import { GrDocumentUpdate } from "react-icons/gr";
import accordionstyle from "../../../pages/Candidate/CandidateQualifyForm/QualifyForm.module.scss";
import FBStyle from "../../../pages/Candidate/FacebookMeta/candidateFacebookMeta.module.scss";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
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
import {
  CandidatePipelineActions,
  commonPopupActions,
} from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessTick from "../../success_tick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {
//   GetCandidateQualifyDetials,
//   PutCandidateType,
// } from "../../../apiQualifyForm";
import ExperienceForm from "../../../pages/Candidate/CandidateQualifyForm/ExperienceForm";
import QualifyFresherform from "../../../pages/Candidate/CandidateQualifyForm/FresherForm";
import { TbCalendarUser } from "react-icons/tb";
import UpdateFresherForm from "../../../pages/Candidate/CandidateUpdateQualifyForm/UpdateFresherForm";
import UpdateExperienceForm from "../../../pages/Candidate/CandidateUpdateQualifyForm/UpdateExperienceForm";
import { SlCalender } from "react-icons/sl";
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
const CandidateDetailsview = ({ Id, textHeading }) => {
  const [adminName, setAdminName] = useState([]);
  const [options, setOptions] = useState({ jobRoles: [] });
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
  const [detailsactiveTab, setDetailsActiveTab] = useState(1);
  const [fileName, setFileName] = useState("");
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [oponUpdateForm, setoponUpdateForm] = useState(false);
  const [followUpDateopen, setfollowUpDateopen] = useState(false);
  const [followUpDateopenupdate, setfollowUpDateopenupdate] = useState(false);
  const [joiningFollowupdateupdate, setJoiningFollowupdateupdate] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [fileError, setFileError] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [documents, setDocuments] = useState([]);
  const [candiateQualifyDetails, setcandiateQualifyDetails] = useState([]);
  const [ShowModal, SetShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const adminId = localStorage.getItem("adminID");
  const [selectedDate, setSelectedDate] = useState({
    tentativeInterviewDate: null,
    followUpDate1: null,
  });
  const [joiningselectedDate, setjoiningSelectedDate] = useState({
    tentativeJoinedDate: null,
    followUpDate1: null,
  });
  const [validity, setValidity] = useState({
    isFollowDate1: true,
    isFollowDate2: true,
  });
  const [joiningvalidity, setjoiningValidity] = useState({
    isFollowDate1: true,
    isFollowDate2: true,
  });
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
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);
  const [jobCategoryError, setJobCategoryError] = useState(false);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  // const CanList = useSelector(
  //   (state) => state.CandidateRegistered.RegisterCandidateList
  // );
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

  useEffect(() => {
    getJobRole(1).then((data) => {
      let jobRoles = data.results.map((el) => el.jobRoles);
      setOptions((prev) => ({ ...prev, jobRoles: [...jobRoles] }));
    });
  }, []);

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
  // useEffect(() => {}, [CanList]);
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
  }, [candiateDetails]);

  useEffect(() => {
    GetQualifiedForm(" ", candidateId).then((data) => {
      console.log(data, "uuuy");
      setcandiateQualifyDetails(data);
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await GetCompanyName();
      setCompanyNames(data);
    }
    fetchData();
  }, []);

  const handleopenCandidateUpdate = () => {
    handleupdateConfirmationOpen();
  };
  function handleupdateConfirmationOpen() {
    setoponUpdateForm(true);
    GetCandidateQualifyForm(candiateDetails.mobileNumber)
      .then((data) => {
        console.log(data, "dataAAAAAAAAAAAAAAAAAAAAAAAAA");
        if (data) {
          setSelectedOption(
            data?.candidateType === "Experienced" ? "experience" : "fresher"
          );
        } else {
          console.error("CanLeadDetails not available in data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching candidate details:", error);
      });
  }
  function handleCloseupdateForm() {
    setSelectedOption("");
    setoponUpdateForm(false);
    getcandidateDetails(candidateId).then((data) => {
      console.log(data, "datasdgh");
      setCandidateDetails(data);
    });
  }
  function handleQualifyFormSubmit() {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setSelectedOption("");
      setoponUpdateForm(false);
    }, 1000);
    getcandidateDetails(candidateId).then((data) => {
      console.log(data, "datasdgh");
      setCandidateDetails(data);
    });
  }
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    let experiencedValue = false;
    if (selectedValue === "experience") {
      experiencedValue = true;
    }

    PutCandidateType(experiencedValue, candiateDetails.mobileNumber, "").then(
      (data) => {
        console.log(
          "Data Format",
          data,
          "mobile number ",
          candiateDetails.mobileNumber
        );
      }
    );
  };
  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
    setDocumentTypeError("");
  };

  // const navigate = useNavigate();

  const [showScheduleInterview, setShowScheduleInterview] = useState(true);
  const [showInterviewdateupdate, setShowInterviewdateupdate] = useState(true);

  useEffect(() => {
    const params = window.location.href;

    let isShowScheduleInterview =
      params.includes("CandidateTabsview#Joined") ||
      params.includes("CandidateTabsview#interviews");
    // console.log(params, "parameterrrs");
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
    getcandidateDetails(candidateId).then((data) => {
      console.log(data, "datasdgh");
      setCandidateDetails(data);
    });
  }, [candidateId]);

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
  const keySkillsArray =
    candiateDetails.keySkill && typeof candiateDetails.keySkill === "string"
      ? candiateDetails.keySkill.split(",")
      : [];
  const certificationArray =
    candiateDetails.certificationCourses &&
    typeof candiateDetails.certificationCourses === "string"
      ? candiateDetails.certificationCourses.split(",")
      : [];
  const AgeCalculate = calculateAge(candiateDetails.dateOfBirth);

  const handleDateChange = (date, type) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      [type]: date,
    }));

    if (type === "tentativeInterviewDate") {
      if (
        selectedDate.followUpDate1 &&
        date &&
        selectedDate.followUpDate1 < date
      ) {
        setSelectedDate((prevState) => ({
          ...prevState,
          followUpDate1: null,
        }));
        setValidity((prevState) => ({
          ...prevState,
          isFollowDate2: false,
        }));
      }
      setValidity((prevState) => ({
        ...prevState,
        isFollowDate1: !!date,
      }));
    } else if (type === "followUpDate1") {
      setValidity((prevState) => ({
        ...prevState,
        isFollowDate2: !!date,
      }));
    }
  };
  const handlejoiningDateChange = (date, type) => {
    setjoiningSelectedDate((prevState) => ({
      ...prevState,
      [type]: date,
    }));

    if (type === "tentativeJoinedDate") {
      if (
        joiningselectedDate.followUpDate1 &&
        date &&
        joiningselectedDate.followUpDate1 < date
      ) {
        setjoiningSelectedDate((prevState) => ({
          ...prevState,
          followUpDate1: null,
        }));
        setjoiningValidity((prevState) => ({
          ...prevState,
          isFollowDate2: false,
        }));
      }
      setjoiningValidity((prevState) => ({
        ...prevState,
        isFollowDate1: !!date,
      }));
    } else if (type === "followUpDate1") {
      setjoiningValidity((prevState) => ({
        ...prevState,
        isFollowDate2: !!date,
      }));
    }
  };

  const dateDiff = Math.ceil(
    (selectedDate.tentativeInterviewDate - new Date()) / (1000 * 60 * 60 * 24)
  );
  const dateDiff1 = Math.ceil(
    (joiningselectedDate.tentativeJoinedDate - new Date()) /
      (1000 * 60 * 60 * 24)
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate.tentativeInterviewDate) {
      setValidity((prevState) => ({
        ...prevState,
        isFollowDate1: false,
      }));
      return;
    } else if (dateDiff >= 4 && !selectedDate.followUpDate1) {
      setValidity((prevState) => ({
        ...prevState,
        isFollowDate2: false,
      }));
      return;
    } else if (!selectedCompany) {
      setCompanyNameError(true);
      return;
    } else if (!selectedJobCategory) {
      setJobCategoryError(true);
      return;
    }

    PutCandidateInterviewFollowup(
      candidateId,
      selectedDate,
      selectedCompany,
      selectedJobCategory,
      false
    )
      .then((data) => {
        setShowSuccess(true);
        console.log(data, "interviewFollowDate");
        setTimeout(() => {
          setShowSuccess(false);
          setfollowUpDateopen(false);
          setSelectedDate((prev) => ({
            ...prev,
            tentativeInterviewDate: "",
            followUpDate1: "",
          }));
          setSelectedCompany((prev) => ({
            ...prev,
            selectedCompany: "",
          }));
          setSelectedCompany("");
          setSelectedJobCategory((prev) => ({
            ...prev,
            selectedJobCategory: "",
          }));
          setSelectedJobCategory("");
        }, 1000);
        getcandidateDetails(candidateId).then((data) => {
          console.log(data, "datasdgh");
          setCandidateDetails(data);
        });
        Dispatch(CandidatePipelineActions.setRefreshCount());
      })
      .catch((error) => {
        console.error("Error submitting interview follow-up:", error);
      });
  };
  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    if (!selectedDate.tentativeInterviewDate) {
      setValidity((prevState) => ({
        ...prevState,
        isFollowDate1: false,
      }));
      return;
    } else if (dateDiff >= 4 && !selectedDate.followUpDate1) {
      setValidity((prevState) => ({
        ...prevState,
        isFollowDate2: false,
      }));
      return;
    } else if (!selectedCompany) {
      setCompanyNameError(true);
      return;
    } else if (!selectedJobCategory) {
      setJobCategoryError(true);
      return;
    }

    PutCandidateInterviewFollowup(
      candidateId,
      selectedDate,
      selectedCompany,
      selectedJobCategory,
      false
    )
      .then((data) => {
        setShowSuccess(true);
        console.log(data, "interviewFollowDate");
        setTimeout(() => {
          setShowSuccess(false);
          setfollowUpDateopenupdate(false);
          setSelectedDate((prev) => ({
            ...prev,
            tentativeInterviewDate: "",
            followUpDate1: "",
          }));
          setSelectedCompany((prev) => ({
            ...prev,
            selectedCompany: "",
          }));
          setSelectedCompany("");
          setSelectedJobCategory((prev) => ({
            ...prev,
            selectedJobCategory: "",
          }));
          setSelectedJobCategory("");
        }, 1000);
        getcandidateDetails(candidateId).then((data) => {
          console.log(data, "datasdgh");
          setCandidateDetails(data);
        });
        Dispatch(CandidatePipelineActions.setRefreshCount());
      })
      .catch((error) => {
        console.error("Error submitting interview follow-up:", error);
      });
  };
  const handlejoiningSubmitUpdate = (e) => {
    e.preventDefault();

    if (!joiningselectedDate.tentativeJoinedDate) {
      setjoiningValidity((prevState) => ({
        ...prevState,
        isFollowDate1: false,
      }));
      return;
    } else if (dateDiff1 >= 4 && !joiningselectedDate.followUpDate1) {
      setjoiningValidity((prevState) => ({
        ...prevState,
        isFollowDate2: false,
      }));
      return;
    }

    PutCandidateJoinedFollowUp(candidateId, joiningselectedDate)
      .then((data) => {
        setShowSuccess(true);
        console.log(data, "interviewFollowDate");
        setTimeout(() => {
          setShowSuccess(false);
          setJoiningFollowupdateupdate(false);
          setjoiningSelectedDate((prev) => ({
            ...prev,
            tentativeJoinedDate: "",
            followUpDate1: "",
          }));
        }, 1000);
        getcandidateDetails(candidateId).then((data) => {
          console.log(data, "datasdgh");
          setCandidateDetails(data);
        });
        Dispatch(CandidatePipelineActions.setRefreshCount());
      })
      .catch((error) => {
        console.error("Error submitting interview follow-up:", error);
      });
  };

  const handleCompanyNameChange = (event, value) => {
    setSelectedCompany(value);
    setCompanyNameError(false); // Clear error when the field changes
  };

  function handleInterviewDateClose() {
    setfollowUpDateopen(false);
    setSelectedDate((prev) => ({
      ...prev,
      tentativeInterviewDate: "",
      followUpDate1: "",
    }));
    setSelectedCompany((prev) => ({
      ...prev,
      selectedCompany: "",
    }));
    setSelectedCompany("");
    setSelectedJobCategory((prev) => ({
      ...prev,
      selectedJobCategory: "",
    }));
    setSelectedJobCategory("");
    setCompanyNameError("");
    setJobCategoryError("");
  }
  function handleInterviewDateCloseupdate() {
    setfollowUpDateopenupdate(false);
    setSelectedDate((prev) => ({
      ...prev,
      tentativeInterviewDate: "",
      followUpDate1: "",
    }));
    setSelectedCompany((prev) => ({
      ...prev,
      selectedCompany: "",
    }));
    setSelectedCompany("");
    setSelectedJobCategory((prev) => ({
      ...prev,
      selectedJobCategory: "",
    }));
    setSelectedJobCategory("");
    setCompanyNameError("");
    setJobCategoryError("");
  }
  function handleJoiningDateCloseupdate() {
    setJoiningFollowupdateupdate(false);
    setSelectedDate((prev) => ({
      ...prev,
      tentativeJoinedDate: "",
      followUpDate1: "",
    }));
  }
  // console.log(AgeCalculate,"agecalute");
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
                        <div className="col-sm-6">
                          <div>
                            <b>
                              {capitalizeWords(candiateDetails.firstName) +
                                " " +
                                (candiateDetails.lastName != null
                                  ? capitalizeWords(candiateDetails.lastName) +
                                    ""
                                  : "")}
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
                            {" "}
                            <strong>Age : </strong>
                            {AgeCalculate}
                          </div>
                          <div>
                            {" "}
                            <strong>From Source : </strong>
                            {candiateDetails.fromSource != null
                              ? candiateDetails.fromSource
                              : "-"}
                          </div>
                          {/* <div>
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
                          {/* </div>
                            </div>
                          </div> */}
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
                                href={`https://www.taizo.in/waNotifications/customCandidateupdate.html?id=${candiateDetails.id}&adminId=${adminId}`}
                                target="_blank"
                                // className="nav-link"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                rel="noreferrer"
                              > */}
                              <div
                                className={`${Candidatedetailstyle.LiaUserEditSolid}`}
                                onClick={handleopenCandidateUpdate}
                              >
                                <div className="mb-1">
                                  {" "}
                                  <LiaUserEditSolid />
                                </div>
                              </div>
                              {/* </a> */}
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
                                {candiateDetails.tentativeInterviewDate !=
                                null ? (
                                  showScheduleInterview &&
                                  candiateDetails.id && (
                                    <div
                                      className={`${Candidatedetailstyle.scheduleinterview}`}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <SlCalender className="me-2" />
                                      {"   "}
                                      <ScheduleInterview
                                        candidateId={candiateDetails.id}
                                        relationName={
                                          candiateDetails.relationName
                                        }
                                        relationType={
                                          candiateDetails.relationshipType
                                        }
                                        relationNumber={
                                          candiateDetails.emergencyContactNumber
                                        }
                                      />
                                    </div>
                                  )
                                ) : (
                                  <div
                                    className="btn btn-primary "
                                    onClick={() => {
                                      setfollowUpDateopen(true);
                                    }}
                                  >
                                    <TbCalendarUser /> Interview Date
                                  </div>
                                )}{" "}
                              </div>
                              {candiateDetails.tentativeInterviewDate != null &&
                                candiateDetails.joiningTentativeDate != null &&
                                showInterviewdateupdate &&
                                candiateDetails.id && (
                                  <div
                                    className="btn btn-primary "
                                    onClick={() => {
                                      setJoiningFollowupdateupdate(true);
                                    }}
                                  >
                                    Update Joining Date <GrDocumentUpdate />
                                  </div>
                                )}
                              {candiateDetails.tentativeInterviewDate != null &&
                                candiateDetails.joiningTentativeDate === null &&
                                showInterviewdateupdate &&
                                candiateDetails.id && (
                                  <div
                                    className="btn btn-primary "
                                    onClick={() => {
                                      setfollowUpDateopenupdate(true);
                                    }}
                                  >
                                    Update Tentative Date <GrDocumentUpdate />
                                  </div>
                                )}
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
                                            candidateNameShow={
                                              candiateDetails.id
                                            }
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
                                  <li>
                                    <a
                                      href={`${webConsoleBaseUrl}/waNotifications/customCandidateupdate.html?id=${candiateDetails.id}&adminId=${adminId}`}
                                      target="_blank"
                                      // className="nav-link"
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                      rel="noreferrer"
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
                      className={`col-sm-4 pb-4 rounded  ${Candidatedetailstyle.personalDetails}`}
                      style={{ position: "relative" }}
                    >
                      <div style={{ position: "sticky", top: "0px" }}>
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
                      </div>

                      <div
                        className={`tab-content ${candidateTabsviewStyle.tab_content} ${Candidatedetailstyle.scolltabs} `}
                        style={{ height: "80vh", overflow: "auto" }}
                      >
                        {candiateDetails.id && detailsactiveTab === 1 && (
                          <>
                            <div className="mt-2">
                              <h6>
                                <b>Admin Details</b>
                              </h6>
                              <div
                                className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                              >
                                <div className="col-5">
                                  <div style={{ lineHeight: "2" }}>
                                    Assigned To
                                  </div>
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
                            </div>{" "}
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
                                  {/* <div style={{ lineHeight: "2" }}>
                                    Current Location
                                  </div> */}

                                  <div style={{ lineHeight: "2" }}>
                                    Mobile Number
                                  </div>
                                  <div style={{ lineHeight: "2.5" }}>
                                    Whatsapp Number
                                  </div>
                                  {/* <div style={{ lineHeight: "2.3" }}>
                                    Relationship type
                                  </div> */}
                                  <div style={{ lineHeight: "2" }}>
                                    Relation Name
                                  </div>
                                  <div style={{ lineHeight: "2.5" }}>
                                    Emergency Contact
                                  </div>
                                </div>
                                <div className="col-7">
                                  <div style={{ lineHeight: "2" }}>
                                    {" "}
                                    {candiateDetails.firstName != null
                                      ? capitalizeWords(
                                          candiateDetails.firstName
                                        ) +
                                        " " +
                                        (candiateDetails.lastName != null
                                          ? capitalizeWords(
                                              candiateDetails.lastName
                                            ) + ""
                                          : "")
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.gender != null
                                      ? candiateDetails.gender
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.dateOfBirth != null
                                      ? candiateDetails.dateOfBirth
                                      : "-"}
                                  </div>
                                  {/* <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.currentCity != null
                                      ? candiateDetails.currentCity
                                      : "-"}{" "}
                                    ,{" "}
                                    {candiateDetails.currentState != null
                                      ? candiateDetails.currentState
                                      : "-"}
                                  </div> */}

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
                                      />{" "}
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
                                      />
                                    </div>
                                    {/* <div
                                className={`${Candidatedetailstyle.Phonecall}`}
                              > */}

                                    {/* </div> */}
                                  </div>

                                  {/* <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.relationshipType != null
                                      ? candiateDetails.relationshipType
                                      : "-"}
                                  </div> */}
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.relationName != null
                                      ? candiateDetails.relationName
                                      : "-"}
                                  </div>
                                  <div
                                    className="d-flex"
                                    style={{ lineHeight: "2" }}
                                  >
                                    <div
                                      className={`me-3 ${Candidatedetailstyle.Whatsapnumbersstyle}`}
                                    >
                                      <img src={flag} alt="" width={16} />{" "}
                                      <span>
                                        {candiateDetails.emergencyContactNumber}
                                      </span>
                                      <MdOutlineContentCopy
                                        onClick={() =>
                                          handleCopyNumber(
                                            candiateDetails.emergencyContactNumber
                                          )
                                        }
                                      />
                                    </div>

                                    <div
                                      className={`${Candidatedetailstyle.Phonecall}`}
                                    >
                                      <MdCall />
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
                                  <div style={{ lineHeight: "2" }}>
                                    Degree/Specialization
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    Completed Year
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
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.passed_out_year != null
                                      ? candiateDetails.passed_out_year
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
                                  
                                </div>
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
                                    {candiateDetails.experience != null
                                      ? candiateDetails.experience
                                      : "-"}
                                  </div>
                                  <div style={{ lineHeight: "2" }}>
                                    {candiateDetails.city != null
                                      ? candiateDetails.city
                                      : "-"}
                                  </div>
                                  
                                </div>
                              </div>
                            </div> */}
                            <div className="mt-2">
                              <h6>
                                <b>Other Details</b>
                              </h6>
                              <div
                                className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                              >
                                <div className="col-5">
                                  <div>
                                    <b>Key Skills</b>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <div>
                                    <div>
                                      {/* {candiateDetails.keySkill} */}
                                      <div
                                        className={`${Candidatedetailstyle.keySkillsContainer}`}
                                      >
                                        {" "}
                                        {/* Add a container */}
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
                              </div>
                              <div
                                className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                              >
                                {candiateDetails.certificationCourses !=
                                  null && (
                                  <>
                                    {" "}
                                    <div className="col-5">
                                      <div>
                                        <b>Certification</b>
                                      </div>
                                    </div>
                                    <div className="mt-3">
                                      <div>
                                        <div>
                                          {/* {candiateDetails.keySkill} */}
                                          <div
                                            className={`${Candidatedetailstyle.keySkillsContainer}`}
                                          >
                                            {certificationArray.map(
                                              (course, index) =>
                                                course &&
                                                typeof course === "string" ? (
                                                  <div
                                                    className={`${Candidatedetailstyle.KeySkills}`}
                                                    key={index}
                                                  >
                                                    {course.trim()}
                                                  </div>
                                                ) : null
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {/* // <React.Fragment key={index}> */}
                        {(candiateDetails.candidateType !== "Experienced" ||
                          candiateDetails.experienced === null) &&
                          candiateDetails.id &&
                          detailsactiveTab === 2 && (
                            <>
                              {candiateDetails.joiningTentativeDate === null ? (
                                <div className="mt-2">
                                  <h6>
                                    <b>Follow up Status</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      <div style={{ lineHeight: "2" }}>
                                        Suggested Company{" "}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Suggested Job Category{" "}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Interview Date
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 1
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 2
                                      </div>
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.suggestedCompanyName !=
                                        null
                                          ? candiateDetails.suggestedCompanyName
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.suggestedJobcategory !=
                                        null
                                          ? candiateDetails.suggestedJobcategory
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.tentativeInterviewDate !=
                                        null
                                          ? dateFormateDD(
                                              candiateDetails.tentativeInterviewDate
                                            ) + "(tentative)"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.followUpDate1 != null
                                          ? dateFormateDD(
                                              candiateDetails.followUpDate1
                                            )
                                          : "-"}
                                      </div>
                                      {candiateDetails.tentativeInterviewDate !=
                                      null ? (
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.followUpDate2 != null
                                            ? dateFormateDD(
                                                candiateDetails.followUpDate2
                                              )
                                            : "-"}
                                        </div>
                                      ) : (
                                        "-"
                                      )}

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
                              ) : (
                                <div className="mt-2">
                                  <h6>
                                    <b>Joining Follow up Status</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      {/* <div style={{ lineHeight: "2" }}>
                                      Suggested Company{" "}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Suggested Job Category{" "}
                                    </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Joining Date
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 1
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 2
                                      </div>
                                    </div>
                                    <div className="col-7">
                                      {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.suggestedCompanyName !=
                                      null
                                        ? candiateDetails.suggestedCompanyName
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.suggestedJobcategory !=
                                      null
                                        ? candiateDetails.suggestedJobcategory
                                        : "-"}
                                    </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.joiningTentativeDate !=
                                        null
                                          ? dateFormateDD(
                                              candiateDetails.joiningTentativeDate
                                            ) + "(tentative)"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.joiningFollowUpDate1 !=
                                        null
                                          ? dateFormateDD(
                                              candiateDetails.joiningFollowUpDate1
                                            )
                                          : "-"}
                                      </div>
                                      {candiateDetails.joiningTentativeDate !=
                                      null ? (
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.joiningFollowUpDate2 !=
                                          null
                                            ? dateFormateDD(
                                                candiateDetails.joiningFollowUpDate2
                                              )
                                            : "-"}
                                        </div>
                                      ) : (
                                        "-"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

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
                            candiateDetails.currentlyworking === "Yes" &&
                            candiateDetails.id &&
                            detailsactiveTab === 2 && (
                              <>
                                {candiateDetails.joiningTentativeDate ===
                                null ? (
                                  <div className="mt-2">
                                    <h6>
                                      <b>Follow up Status</b>
                                    </h6>
                                    <div
                                      className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                    >
                                      <div className="col-5">
                                        <div style={{ lineHeight: "2" }}>
                                          Suggested Company{" "}
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          Suggested Job Category{" "}
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          Interview Date
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          Follow up 1
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          Follow up 2
                                        </div>
                                      </div>
                                      <div className="col-7">
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.suggestedCompanyName !=
                                          null
                                            ? candiateDetails.suggestedCompanyName
                                            : "-"}
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.suggestedJobcategory !=
                                          null
                                            ? candiateDetails.suggestedJobcategory
                                            : "-"}
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.tentativeInterviewDate !=
                                          null
                                            ? dateFormateDD(
                                                candiateDetails.tentativeInterviewDate
                                              ) + "(tentative)"
                                            : "-"}
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.followUpDate1 != null
                                            ? dateFormateDD(
                                                candiateDetails.followUpDate1
                                              )
                                            : "-"}
                                        </div>
                                        {candiateDetails.tentativeInterviewDate !=
                                        null ? (
                                          <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.followUpDate2 !=
                                            null
                                              ? dateFormateDD(
                                                  candiateDetails.followUpDate2
                                                )
                                              : "-"}
                                          </div>
                                        ) : (
                                          "-"
                                        )}

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
                                ) : (
                                  <div className="mt-2">
                                    <h6>
                                      <b>Joining Follow up Status</b>
                                    </h6>
                                    <div
                                      className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                    >
                                      <div className="col-5">
                                        {/* <div style={{ lineHeight: "2" }}>
                                      Suggested Company{" "}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Suggested Job Category{" "}
                                    </div> */}
                                        <div style={{ lineHeight: "2" }}>
                                          Joining Date
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          Follow up 1
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          Follow up 2
                                        </div>
                                      </div>
                                      <div className="col-7">
                                        {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.suggestedCompanyName !=
                                      null
                                        ? candiateDetails.suggestedCompanyName
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.suggestedJobcategory !=
                                      null
                                        ? candiateDetails.suggestedJobcategory
                                        : "-"}
                                    </div> */}
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.joiningTentativeDate !=
                                          null
                                            ? dateFormateDD(
                                                candiateDetails.joiningTentativeDate
                                              ) + "(tentative)"
                                            : "-"}
                                        </div>
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.joiningFollowUpDate1 !=
                                          null
                                            ? dateFormateDD(
                                                candiateDetails.joiningFollowUpDate1
                                              )
                                            : "-"}
                                        </div>
                                        {candiateDetails.joiningTentativeDate !=
                                        null ? (
                                          <div style={{ lineHeight: "2" }}>
                                            {candiateDetails.joiningFollowUpDate2 !=
                                            null
                                              ? dateFormateDD(
                                                  candiateDetails.joiningFollowUpDate2
                                                )
                                              : "-"}
                                          </div>
                                        ) : (
                                          "-"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                          candiateDetails.currentlyworking === "No" &&
                          candiateDetails.id &&
                          detailsactiveTab === 2 && (
                            <>
                              {candiateDetails.joiningTentativeDate === null ? (
                                <div className="mt-2">
                                  <h6>
                                    <b>Follow up Status</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      <div style={{ lineHeight: "2" }}>
                                        Suggested Company{" "}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Suggested Job Category{" "}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Interview Date
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 1
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 2
                                      </div>
                                    </div>
                                    <div className="col-7">
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.suggestedCompanyName !=
                                        null
                                          ? candiateDetails.suggestedCompanyName
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.suggestedJobcategory !=
                                        null
                                          ? candiateDetails.suggestedJobcategory
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.tentativeInterviewDate !=
                                        null
                                          ? dateFormateDD(
                                              candiateDetails.tentativeInterviewDate
                                            ) + "(tentative)"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.followUpDate1 != null
                                          ? dateFormateDD(
                                              candiateDetails.followUpDate1
                                            )
                                          : "-"}
                                      </div>
                                      {candiateDetails.tentativeInterviewDate !=
                                      null ? (
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.followUpDate2 != null
                                            ? dateFormateDD(
                                                candiateDetails.followUpDate2
                                              )
                                            : "-"}
                                        </div>
                                      ) : (
                                        "-"
                                      )}

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
                              ) : (
                                <div className="mt-2">
                                  <h6>
                                    <b>Joining Follow up Status</b>
                                  </h6>
                                  <div
                                    className={`row ${Candidatedetailstyle.CanDetailsRow}`}
                                  >
                                    <div className="col-5">
                                      {/* <div style={{ lineHeight: "2" }}>
                                      Suggested Company{" "}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      Suggested Job Category{" "}
                                    </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        Joining Date
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 1
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        Follow up 2
                                      </div>
                                    </div>
                                    <div className="col-7">
                                      {/* <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.suggestedCompanyName !=
                                      null
                                        ? candiateDetails.suggestedCompanyName
                                        : "-"}
                                    </div>
                                    <div style={{ lineHeight: "2" }}>
                                      {candiateDetails.suggestedJobcategory !=
                                      null
                                        ? candiateDetails.suggestedJobcategory
                                        : "-"}
                                    </div> */}
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.joiningTentativeDate !=
                                        null
                                          ? dateFormateDD(
                                              candiateDetails.joiningTentativeDate
                                            ) + "(tentative)"
                                          : "-"}
                                      </div>
                                      <div style={{ lineHeight: "2" }}>
                                        {candiateDetails.joiningFollowUpDate1 !=
                                        null
                                          ? dateFormateDD(
                                              candiateDetails.joiningFollowUpDate1
                                            )
                                          : "-"}
                                      </div>
                                      {candiateDetails.joiningTentativeDate !=
                                      null ? (
                                        <div style={{ lineHeight: "2" }}>
                                          {candiateDetails.joiningFollowUpDate2 !=
                                          null
                                            ? dateFormateDD(
                                                candiateDetails.joiningFollowUpDate2
                                              )
                                            : "-"}
                                        </div>
                                      ) : (
                                        "-"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
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

                        {/* </React.Fragment> */}

                        {/* {Array.isArray(candiateQualifyDetails) &&
                          candiateQualifyDetails.map((candidate, index) => (
                            <React.Fragment key={index}>
                            
                            </React.Fragment>
                          ))} */}

                        {/* {Array.isArray(candiateQualifyDetails) &&
                          candiateQualifyDetails.map((candidate, index) => (
                            <React.Fragment key={index}>
                              
                            </React.Fragment>
                          ))} */}
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
                                    <div key={document.id}>
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
                                              dateValue={document.createdTime}
                                            />
                                          </p>
                                        </div>
                                      </div>
                                      <hr style={{ margin: "8px 0" }} />
                                    </div>
                                  ))}
                                </div>

                                {ShowModal && (
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
                                                {documentTitles.map(
                                                  (title, index) => (
                                                    <MenuItem
                                                      key={index}
                                                      value={title}
                                                    >
                                                      {title}
                                                    </MenuItem>
                                                  )
                                                )}
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
                                  </>
                                )}
                              </>
                            </p>
                          )}
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
              {followUpDateopen && candiateDetails.id && (
                <MyModal>
                  <ModalContainer
                    zIndex={"1500"}
                    childComponent={
                      <>
                        <div style={{ width: "450px" }}>
                          {" "}
                          <p className="text-center">
                            <b>Tentative Interview Date</b>
                          </p>
                          <form action="#" onSubmit={handleSubmit}>
                            <div className="row mt-2">
                              <div className="col-sm-12 d-flex gap-3 align-item-center">
                                <label
                                  htmlFor="currentpositionDropdown"
                                  className="form-label"
                                >
                                  <strong>Tentative Date : </strong>
                                </label>
                                <div>
                                  <DatePicker
                                    selected={
                                      selectedDate.tentativeInterviewDate
                                    }
                                    onChange={(date) =>
                                      handleDateChange(
                                        date,
                                        "tentativeInterviewDate"
                                      )
                                    }
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    // withPortal={true}
                                  />
                                  {validity.isFollowDate1 ? null : (
                                    <div className="" style={{ color: "red" }}>
                                      Please select a date.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              {dateDiff >= 4 && (
                                <div className="col-sm-12 mt-2 d-flex gap-3 align-item-center">
                                  <label
                                    htmlFor="currentpositionDropdown"
                                    className="form-label"
                                  >
                                    <strong>Follow up Date :</strong>
                                  </label>
                                  <div>
                                    <DatePicker
                                      selected={selectedDate.followUpDate1}
                                      onChange={(date) =>
                                        handleDateChange(date, "followUpDate1")
                                      }
                                      minDate={new Date()}
                                      maxDate={
                                        new Date(
                                          selectedDate.tentativeInterviewDate.getTime() -
                                            2 * 24 * 60 * 60 * 1000
                                        )
                                      }
                                      dateFormat="dd/MM/yyyy"
                                      className="form-control"
                                      // withPortal={true}
                                    />
                                    {validity.isFollowDate2 ? null : (
                                      <div
                                        className=""
                                        style={{ color: "red" }}
                                      >
                                        Please select a date.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="row mt-2">
                              <label htmlFor="">
                                <b>
                                  Enter company name and select job category :
                                </b>
                              </label>
                              <div className="col-sm-12 mt-2 d-flex gap-3 align-item-center">
                                {/* <label
                                  htmlFor="currentpositionDropdown"
                                  className="form-label"
                                >
                                  <strong>Company Name:</strong>
                                </label> */}
                                {/* <div className="w-100">
                                  <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={companyNames}
                                    value={selectedCompany}
                                    onChange={handleCompanyNameChange}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Company Name"
                                        fullWidth
                                        error={companyNameError}
                                        helperText={
                                          companyNameError
                                            ? "Please select a company name"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </div> */}
                                <div className="w-100">
                                  <TextField
                                    label="Company Name"
                                    fullWidth
                                    error={companyNameError} // Apply error state
                                    helperText={
                                      companyNameError
                                        ? "Please select a company name"
                                        : ""
                                    }
                                    value={selectedCompany} // Assuming selectedCompany is the value of the TextField
                                    onChange={(event) =>
                                      handleCompanyNameChange(
                                        event,
                                        event.target.value
                                      )
                                    }
                                    // onChange={handleCompanyNameChange} // Assuming handleCompanyNameChange is the onChange handler for the TextField
                                  />
                                </div>
                                <div className="w-100">
                                  <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={options.jobRoles}
                                    value={selectedJobCategory}
                                    onChange={(event, newValue) => {
                                      setSelectedJobCategory(newValue);
                                      setJobCategoryError(false); // Clear error when selection changes
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Job Category"
                                        fullWidth
                                        error={jobCategoryError}
                                        helperText={
                                          jobCategoryError
                                            ? "Job Category is required"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-3 ">
                              <div
                                className="btn btn-danger px-4"
                                onClick={handleInterviewDateClose}
                              >
                                Close
                              </div>
                              <button
                                className="btn btn-success px-4"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )}
              {followUpDateopenupdate && candiateDetails.id && (
                <MyModal>
                  <ModalContainer
                    zIndex={"1500"}
                    childComponent={
                      <>
                        <div style={{ width: "450px" }}>
                          {" "}
                          <p className="text-center">
                            <b>Tentative Interview Date Update</b>
                          </p>
                          <form action="#" onSubmit={handleSubmitUpdate}>
                            <div className="row mt-2">
                              <div className="col-sm-12 d-flex gap-3 align-item-center">
                                <label
                                  htmlFor="currentpositionDropdown"
                                  className="form-label"
                                >
                                  <strong>Tentative Date : </strong>
                                </label>
                                <div>
                                  <DatePicker
                                    selected={
                                      selectedDate.tentativeInterviewDate
                                    }
                                    onChange={(date) =>
                                      handleDateChange(
                                        date,
                                        "tentativeInterviewDate"
                                      )
                                    }
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    // withPortal={true}
                                  />
                                  {validity.isFollowDate1 ? null : (
                                    <div className="" style={{ color: "red" }}>
                                      Please select a date.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              {dateDiff >= 4 && (
                                <div className="col-sm-12 mt-2 d-flex gap-3 align-item-center">
                                  <label
                                    htmlFor="currentpositionDropdown"
                                    className="form-label"
                                  >
                                    <strong>Follow up Date :</strong>
                                  </label>
                                  <div>
                                    <DatePicker
                                      selected={selectedDate.followUpDate1}
                                      onChange={(date) =>
                                        handleDateChange(date, "followUpDate1")
                                      }
                                      minDate={new Date()}
                                      maxDate={
                                        new Date(
                                          selectedDate.tentativeInterviewDate.getTime() -
                                            2 * 24 * 60 * 60 * 1000
                                        )
                                      }
                                      dateFormat="dd/MM/yyyy"
                                      className="form-control"
                                      // withPortal={true}
                                    />
                                    {validity.isFollowDate2 ? null : (
                                      <div
                                        className=""
                                        style={{ color: "red" }}
                                      >
                                        Please select a date.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="row mt-2">
                              <label htmlFor="">
                                <b>
                                  Enter company name and select job category :
                                </b>
                              </label>
                              <div className="col-sm-12 mt-2 d-flex gap-3 align-item-center">
                                {/* <label
                                  htmlFor="currentpositionDropdown"
                                  className="form-label"
                                >
                                  <strong>Company Name:</strong>
                                </label> */}
                                {/* <div className="w-100">
                                  <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={companyNames}
                                    value={selectedCompany}
                                    onChange={handleCompanyNameChange}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Company Name"
                                        fullWidth
                                        error={companyNameError} // Apply error state
                                        helperText={
                                          companyNameError
                                            ? "Please select a company name"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </div> */}
                                <div className="w-100">
                                  <TextField
                                    label="Company Name"
                                    fullWidth
                                    error={companyNameError} // Apply error state
                                    helperText={
                                      companyNameError
                                        ? "Please select a company name"
                                        : ""
                                    }
                                    value={selectedCompany} // Assuming selectedCompany is the value of the TextField
                                    // onChange={handleCompanyNameChange} // Assuming handleCompanyNameChange is the onChange handler for the TextField
                                    onChange={(event) =>
                                      handleCompanyNameChange(
                                        event,
                                        event.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="w-100">
                                  <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={options.jobRoles}
                                    value={selectedJobCategory}
                                    onChange={(event, newValue) => {
                                      setSelectedJobCategory(newValue);
                                      setJobCategoryError(false); // Clear error when selection changes
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Job Category"
                                        fullWidth
                                        error={jobCategoryError}
                                        helperText={
                                          jobCategoryError
                                            ? "Job Category is required"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-3 ">
                              <div
                                className="btn btn-danger px-4"
                                onClick={handleInterviewDateCloseupdate}
                              >
                                Close
                              </div>
                              <button
                                className="btn btn-success px-4"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    }
                  />
                </MyModal>
              )}
              {joiningFollowupdateupdate && candiateDetails.id && (
                <MyModal>
                  <ModalContainer
                    zIndex={"1500"}
                    childComponent={
                      <>
                        <div style={{ width: "450px" }}>
                          {" "}
                          <p className="text-center">
                            <b>Joining Tentative Date Update</b>
                          </p>
                          <form action="#" onSubmit={handlejoiningSubmitUpdate}>
                            <div className="row mt-2">
                              <div className="col-sm-12 d-flex gap-3 align-item-center">
                                <label
                                  htmlFor="currentpositionDropdown"
                                  className="form-label"
                                >
                                  <strong>Tentative Date : </strong>
                                </label>
                                <div>
                                  <DatePicker
                                    selected={
                                      joiningselectedDate.tentativeJoinedDate
                                    }
                                    onChange={(date) =>
                                      handlejoiningDateChange(
                                        date,
                                        "tentativeJoinedDate"
                                      )
                                    }
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    // withPortal={true}
                                  />
                                  {joiningvalidity.isFollowDate1 ? null : (
                                    <div className="" style={{ color: "red" }}>
                                      Please select a date.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              {dateDiff1 >= 4 && (
                                <div className="col-sm-12 mt-2 d-flex gap-3 align-item-center">
                                  <label
                                    htmlFor="currentpositionDropdown"
                                    className="form-label"
                                  >
                                    <strong>Follow up Date :</strong>
                                  </label>
                                  <div>
                                    <DatePicker
                                      selected={
                                        joiningselectedDate.followUpDate1
                                      }
                                      onChange={(date) =>
                                        handlejoiningDateChange(
                                          date,
                                          "followUpDate1"
                                        )
                                      }
                                      minDate={new Date()}
                                      maxDate={
                                        new Date(
                                          joiningselectedDate.tentativeJoinedDate.getTime() -
                                            2 * 24 * 60 * 60 * 1000
                                        )
                                      }
                                      dateFormat="dd/MM/yyyy"
                                      className="form-control"
                                      // withPortal={true}
                                    />
                                    {joiningvalidity.isFollowDate2 ? null : (
                                      <div
                                        className=""
                                        style={{ color: "red" }}
                                      >
                                        Please select a date.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-3 ">
                              <div
                                className="btn btn-danger px-4"
                                onClick={handleJoiningDateCloseupdate}
                              >
                                Close
                              </div>
                              <button
                                className="btn btn-success px-4"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
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
              {oponUpdateForm && (
                <>
                  <MyModal>
                    <ModalContainer
                      zIndex={"1500"}
                      childComponent={
                        <>
                          <div
                            className={`container d-flex align-itmes-center justify-content-between`}
                          >
                            <div className="">
                              <p>
                                <b>Candidate qualify form</b>
                              </p>
                              <div className="d-flex">
                                {" "}
                                <div
                                  className={`me-2  ${accordionstyle.radioInput}`}
                                >
                                  {/* <label className="form-check-label me-3"> */}
                                  <input
                                    type="radio"
                                    name="fresher"
                                    id="fresherYes"
                                    value="fresher"
                                    className={`form-check-input `}
                                    checked={selectedOption === "fresher"}
                                    onChange={handleOptionChange}
                                  />
                                  <label for="fresherYes">Fresher</label>
                                  {/* </label> */}
                                </div>
                                <div
                                  className={`me-2  ${accordionstyle.radioInput}`}
                                >
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      name="experience"
                                      id="experienceNo"
                                      value="experience"
                                      className={`form-check-input `}
                                      checked={selectedOption === "experience"}
                                      onChange={handleOptionChange}
                                    />
                                    <label for="experienceNo">Experience</label>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ms-5">
                              <div
                                className="btn btn-outline-danger"
                                onClick={handleCloseupdateForm}
                              >
                                <AiOutlineClose />{" "}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div>
                              {selectedOption === "fresher" ? (
                                <>
                                  {/* <div className={`${accordionstyle.Container}`}> */}{" "}
                                  <UpdateFresherForm
                                    mobilenumber={candiateDetails.mobileNumber}
                                    whatsappNumber={
                                      candiateDetails.whatsappNumber
                                    }
                                    Reloadpage={handleQualifyFormSubmit}
                                  />
                                  {/* </div> */}
                                </>
                              ) : selectedOption === "experience" ? (
                                // <ExperinenceWorkingform
                                //   mobilenumber={currentMetaDetail.mobileNumber}
                                // />
                                <UpdateExperienceForm
                                  mobileNumber={candiateDetails.mobileNumber}
                                  whatsappNumber={
                                    candiateDetails.whatsappNumber
                                  }
                                  Reloadpage={handleQualifyFormSubmit}
                                />
                              ) : null}
                            </div>
                          </div>
                        </>
                      }
                    />
                  </MyModal>
                </>
              )}
            </>
          }
        />
      </Detailsshow>
    </div>
  );
};

export default CandidateDetailsview;
