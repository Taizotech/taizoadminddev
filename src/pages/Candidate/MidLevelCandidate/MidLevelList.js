/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import resume from "../../../assets/images/resume.png";
import Stack from "@mui/material/Stack";
import { tableCellClasses } from "@mui/material/TableCell";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import { styled } from "@mui/material/styles";
import FBstyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { GrNotes } from "react-icons/gr";
import { LuRefreshCcw } from "react-icons/lu";
import TimelineMidSeniorLevel from "./TimelineMidSeniorLevel";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GetAllsdminDetails,
  GetCanMidLevellist,
  PostMoveToScreening,
  PutCandidateSenior,
  UploadMidSeniorResumes,
} from "../../../apiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  MyModal,
  TimeAgo,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import {
  CandidateMidLevelActions,
  showHideDetailsActions,
} from "../../../redux-store/store";
import MidLevelFilter from "./MidLevelFilter";
import companylogo from "../../../assets/images/uploadfile.png";
import ModalContainer from "../../../components/modal_popup";
import CandidateMidLevelDetailsview from "../../../components/ModalPopups/CandidateDetails/CandidateMidLevelSenior";
import SuccessTick from "../../../components/success_tick";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import TimeLineAddNotes from "./TimeLineAddNotes";
import Midelevelseniorpostform from "./Midelevelseniorpostform";
import { MdOutlineContentCopy } from "react-icons/md";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    // width: 450,
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
}));

function MidLevelList() {
  const [candidateMidLevellist, setCandidateMidLevellist] = useState([]);
  const [pageCount, setpageCount] = useState();
  const [isTooltipOpen, setTooltipOpen] = useState({});
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [openscreening, setOpenscreening] = useState(false);
  const [successing, setSuccessing] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSrc, setUploadedFileSrc] = useState(resume);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [CanputLead, setCanputLead] = useState(null);
  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  console.log(currentMetaDetail);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [currentLeadDetail, setCurrentLeadDetail] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [isPopupOpenCanLead, setIsPopupOpenCanLead] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movetoscreening, setMovetoscreening] = useState({
    // id: Leadid,
    screeningDate: null,
    screeningTime: null,
    meetingLink: "",
  });
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [sourceprefillData, setSourceprefillData] = useState(false);

  const Dispatch = useDispatch();
  const CandidateMidLevel = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter
  );
  const ShowTimeline = useSelector(
    (state) => state.showHideDetails.candidateLead.leadTimeLine
  );
  const canmobileNumber = useSelector(
    (state) =>
      state.CandidateMidLevelDetails.CandidateMidLevelFilter.mobileNumber
  );
  const [putCandidateLead, setPutcandidateLead] = useState({
    canLeadId: "",
    qualified: false,
    notQualified: false,
  });
  const size = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter.pagSize
  );
  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;
  const [adminName, setAdminName] = useState([]);
  const [openLeadForm, setopenLeadForm] = useState(false);
  const [adminid, setAdminId] = useState([]);
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });
  }, []);

  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    // Fetch data after resetting
    GetCanMidLevellist(CandidateMidLevel, 0)
      .then((data) => {
        console.log(data, "datata");
        setCandidateMidLevellist(data.data.content);
        setpageCount(data.data.totalPages);
        setTotalCount(data.data.totalElements);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  useEffect(() => {
    console.log(CandidateMidLevel);
  }, [CandidateMidLevel]);

  useEffect(() => {
    setShowLoader(true);

    GetCanMidLevellist(CandidateMidLevel, 0)
      .then((data) => {
        console.log(data, "datata");
        setCandidateMidLevellist(data.data.content);
        setpageCount(data.data.totalPages);
        setTotalCount(data.data.totalElements);
      })
      .catch((err) => {
        setCandidateMidLevellist([]);
        setpageCount(1);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [CandidateMidLevel]);

  function candidatePagination(event, page) {
    const currentPage = page - 1;
    console.log(currentPage, "current page");
    Dispatch(
      CandidateMidLevelActions.setCandidateMidLevelFilterPage(currentPage)
    );
  }
  function candidateSize(size) {
    Dispatch(CandidateMidLevelActions.setCandidateMidLevelFilterSize(size));
    console.log(size, "size");
  }
  const handleCandidateClick = (candidateId) => {
    setSelectedCandidateId(candidateId);
    console.log(candidateId, "CandidateMidLevelDetailsview");
    setIsPopupOpenCanLead(true);
  };
  const handleClose = () => {
    // onClose();
    setIsPopupOpenCanLead(false);
  };

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

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }

  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
  }
  // const Leadid = ;
  console.log(currentLeadDetail, "currentLeadDetail");

  const handleConfirm = (e) => {
    e.preventDefault();

    // Initialize or ensure these states are available
    setDateError(false);
    setTimeError(false);

    if (!movetoscreening.screeningDate) {
      setDateError(true);
      return;
    }

    if (!movetoscreening.screeningTime) {
      setTimeError(true);
      return;
    }
    console.log("Time value:", movetoscreening.screeningTime);

    setSuccessing(true);

    PostMoveToScreening(currentLeadDetail.id, movetoscreening).then((data) => {
      console.log(data, "sending");
      setTimeout(() => {
        setSuccessing(false);
      }, 3000);
      GetCanMidLevellist(CandidateMidLevel, 0).then((data) => {
        console.log(data, "datata");
        setCandidateMidLevellist(data.data.content);
        setpageCount(data.data.totalPages);
        setTotalCount(data.data.totalElements);
      });
    });

    // Close the form after submission
    setOpenscreening(false);
  };

  const handleIsQualified = (status) => {
    console.log(currentLeadDetail.id, "jhsjhhiidddd");
    if (status === "notQualified") {
      setPutcandidateLead({
        canLeadId: currentLeadDetail.id,
        qualified: false,
        notQualified: true,
      });
    } else {
      setPutcandidateLead((prev) => ({
        ...prev,
        canLeadId: currentLeadDetail.id,
        qualified: true,
        notQualified: false,
      }));
    }
  };
  function ConfirmFormSubmit() {
    if (putCandidateLead.canLeadId) {
      setEnableSubmit(true);
      putCandidateLead.notes = CanputLead.notes;
      PutCandidateSenior(putCandidateLead).then((data) => {
        console.log(data, "senior");
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);

        GetCanMidLevellist(CandidateMidLevel, 0).then((data) => {
          console.log(data);
          setCandidateMidLevellist(data.data.content);
        });
        setEnableSubmit(false);
      });
    }
  }

  function handleTimeLinePopup(value, candidate) {
    Dispatch(
      showHideDetailsActions.setCandidateLeadDetails({
        showTimeLine: value,
        midSeniorCan: candidate,
      })
    );
  }
  console.log("MEttata", currentLeadDetail);
  const hadleUpdate = () => {
    const mobileNumber = currentMetaDetail.mobileNumber;
    // console.log(mobileNumber, "hai hello");
    setSourceprefillData(true);
  };
  let prefillData = {};

  if (currentMetaDetail) {
    const mobileNumber = currentMetaDetail.mobileNumber;
    const emailId = currentMetaDetail.emailId;
    const firstName = currentMetaDetail.firstName;
    const lastName = currentMetaDetail.lastName;
    const appliedJobrole = currentMetaDetail.appliedJobrole;
    const jobrole = currentMetaDetail.jobrole;
    const experienceInYears = currentMetaDetail.experienceInYears;
    const experienceInMonths = currentMetaDetail.experienceInMonths;
    const skills = currentMetaDetail.skills;
    const currentLocation = currentMetaDetail.currentLocation;
    const preferredJobLocation = currentMetaDetail.preferredJobLocation;
    const adminPreferredCompany = currentMetaDetail.adminPreferredCompany;
    const resumeLink = currentMetaDetail.resumeLink;
    // const fileNameParts = resumeLink.split("_");
    // const firstNameFromLink = fileNameParts[1] || null;
    // const lastNameFromLink = fileNameParts[2] || null;
    // Assign values to prefillData
    prefillData = {
      mobileNumber: currentMetaDetail.mobileNumber,
      firstName: currentMetaDetail.firstName,
      lastName: currentMetaDetail.lastName,
      emailId: currentMetaDetail.emailId,
      whatsappNumber: currentMetaDetail.whatsappNumber,
      educationalQualification: currentMetaDetail.educationalQualification,
      prefJobLocation: currentMetaDetail.prefJobLocation,
      expInManufacturing: currentMetaDetail.expInManufacturing
        ? "true"
        : "false",
      expInYears: currentMetaDetail.expInYears,
      expInMonths: currentMetaDetail.expInMonths,
      jobCategory: currentMetaDetail.jobCategory,
      noticePeriod: currentMetaDetail.noticePeriod,
      currentlyworking: currentMetaDetail.currentlyWorking ? "true" : "false",
      currentSalary: currentMetaDetail.currentSalary,
      expectedSalary: currentMetaDetail.expectedSalary,
      linkedinUrl: currentMetaDetail.linkedinUrl,
      currentLocation: currentMetaDetail.currentLocation,
      file: currentMetaDetail.resumeLink,
      // Add other fields as needed
    };
  }
  // const cadidatenumber = currentMetaDetail.mobileNumber;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setErrorMessage("");
    setUploadedFileName(file.name);
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedFileSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     // Handle error, show message, etc.
  //     console.error("No file selected.");
  //     return;
  //   }

  //   try {
  //     const response = await UploadMidSeniorResumes(
  //       selectedFile,
  //       currentMetaDetail.mobileNumber
  //     );
  //     console.log(
  //       currentMetaDetail.mobileNumber,
  //       "currentMetaDetail.mobileNumber"
  //     );
  //     setShowSuccess(true);
  //     setTimeout(() => {
  //       setShowSuccess(false);
  //     }, 3000);
  //   } catch (error) {
  //     // Handle error, show message, etc.
  //     console.error("Error uploading file:", error.message);
  //   }
  // };
  const handleUpload = () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file.");
      return;
    }
    setErrorMessage("");
    UploadMidSeniorResumes(selectedFile, currentMetaDetail.mobileNumber).then(
      (Data) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setUploadedFileName("");
          setSelectedFile("");
          setOpenscreening(false);
        }, 3000);
        GetCanMidLevellist(CandidateMidLevel, 0).then((data) => {
          console.log(data);
          setCandidateMidLevellist(data.data.content);
        });
      }
    );
  };
  const handleUploadButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setOpenscreening(false);
    setErrorMessage("");
    setUploadedFileName("");
    setSelectedFile("");
  };
  // const onclose = () => {
  //   setSourceprefillData(false);
  //   setopenLeadForm(false);
  // };
  const reloadingpagelead = () => {
    setSourceprefillData(false);
    setopenLeadForm(false);
    GetCanMidLevellist(CandidateMidLevel, 0).then((data) => {
      console.log(data);
      setCandidateMidLevellist(data.data.content);
    });
  };

  const handleCopyClick = (emailId, candidateId) => {
    navigator.clipboard.writeText(emailId);

    setTooltipOpen((prevState) => ({
      ...prevState,
      [candidateId]: true,
    }));
    setTimeout(() => {
      setTooltipOpen((prevState) => ({
        ...prevState,
        [candidateId]: false,
      }));
    }, 1500);
  };
  return (
    <>
      <div>
        <div className={`${FBstyle.FilterHead}`}>
          {" "}
          <div className="d-flex ">
            <div>
              Show {"  "}
              <select
                name=""
                id=""
                className="px-1 py-1 mx-2"
                onChange={(event) => candidateSize(event.target.value)}
              >
                <option selected value="10">
                  10
                </option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              {"   "}
              Entries
            </div>
            <div
              className="p-1 success ms-3 mx-2 "
              onClick={handleReset}
              style={{ cursor: "pointer" }}
            >
              <LuRefreshCcw />
            </div>
          </div>
          <div className={`${canLeadStyle.filterAdduser}`}>
            {/* <div className="mt-1 me-2 ">Total Count : {totalCount}</div> */}

            <div>
              <MidLevelFilter />
            </div>
            <div>
              {/* <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/Midelevelseniorpostform" }}
              > */}
              <button
                className={`ms-2 mt-1 ${canLeadStyle.NewLead}`}
                onClick={() => {
                  setopenLeadForm(true);
                }}
              >
                <AiOutlineUserAdd /> Add New Lead
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <>
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
        </>
        <div>
          <div>
            <div className={`table-responsive-sm ${FBstyle.responsive}`}>
              <TableContainer className={`${FBstyle.TableContainer}`}>
                <Table
                  stickyHeader
                  aria-label="simple table"
                  // style={{ width: "1500px", overflowX: "auto" }}
                >
                  <TableHead>
                    <TableRow className="">
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Mobile Number</StyledTableCell>
                      {/* <StyledTableCell>Whatsapp Number</StyledTableCell> */}
                      <StyledTableCell>Job Catagory</StyledTableCell>
                      {/* <StyledTableCell>Qualification</StyledTableCell> */}
                      <StyledTableCell>Job Location</StyledTableCell>
                      {isSuperAdmin && (
                        <StyledTableCell>Assigned To</StyledTableCell>
                      )}
                      <StyledTableCell> Email Id</StyledTableCell>
                      <StyledTableCell>Created on</StyledTableCell>
                      <StyledTableCell>Resume</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidateMidLevellist.length > 0 ? (
                      <>
                        {candidateMidLevellist.map((candidate, i) => {
                          return (
                            <>
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                onClick={() => {
                                  //   currentCanDetails(Employer);
                                  setCurrentLeadDetail(candidate);
                                  setCurrentMetaDetail(candidate);
                                }}
                              >
                                <StyledTableCell
                                  sx={{ color: "#0b7af0", cursor: "pointer" }}
                                  title={
                                    candidate.firstName +
                                    " " +
                                    candidate.lastName
                                  }
                                  onClick={(e) => {
                                    // setSelectedCandidateName(candidate);
                                    setIsPopupOpenCanLead(true);
                                    handleCandidateClick(candidate.id);
                                  }}
                                >
                                  {candidate.firstName != null
                                    ? textTruncate(
                                        capitalizeWords(candidate.firstName),
                                        15
                                      ) +
                                      " " +
                                      (candidate.lastName != null
                                        ? textTruncate(
                                            capitalizeWords(candidate.lastName),
                                            5
                                          )
                                        : "")
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {" "}
                                  {candidate.mobileNumber
                                    ? String(candidate.mobileNumber).slice(
                                        0,
                                        10
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {/* <StyledTableCell>
                                  {" "}
                                  {candidate.whatsappNumber
                                    ? String(candidate.whatsappNumber).slice(
                                        0,
                                        10
                                      )
                                    : "-"}
                                </StyledTableCell> */}
                                <StyledTableCell title={candidate.jobCategory}>
                                  {candidate.jobCategory
                                    ? textTruncate(
                                        capitalizeWords(candidate.jobCategory),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {/* <StyledTableCell
                                  title={candidate.educationalQualification}
                                >
                                  {candidate.educationalQualification
                                    ? textTruncate(
                                        candidate.educationalQualification,
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell> */}
                                <StyledTableCell
                                  title={candidate.prefJobLocation}
                                >
                                  {candidate.prefJobLocation
                                    ? textTruncate(
                                        capitalizeWords(
                                          candidate.prefJobLocation
                                        ),
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {isSuperAdmin && (
                                  <StyledTableCell
                                    align="left"
                                    title={candidate.adminId}
                                  >
                                    <>
                                      {
                                        adminName[
                                          adminid.indexOf(
                                            candidate.adminId
                                              ? textTruncate(
                                                  candidate.adminId,
                                                  10
                                                )
                                              : "-"
                                          )
                                        ]
                                      }
                                    </>
                                  </StyledTableCell>
                                )}
                                <StyledTableCell title={candidate.emailId}>
                                  {candidate.emailId != null ? (
                                    <>
                                      <Tooltip
                                        key={candidate.id}
                                        open={
                                          isTooltipOpen[candidate.id] || false
                                        }
                                        className="ms-0"
                                        title="Email ID copied!"
                                        placement="top"
                                        id={candidate.id}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            handleCopyClick(
                                              candidate.emailId,
                                              candidate.id
                                            )
                                          }
                                          aria-label="Copy Email ID"
                                        >
                                          <MdOutlineContentCopy />
                                        </IconButton>
                                      </Tooltip>{" "}
                                      {textTruncate(candidate.emailId, 25)}
                                      {/* <ClickAwayListener
                                        onClickAway={() =>
                                          setTooltipOpen(false)
                                        }
                                      >
                                        <Tooltip
                                          open={isTooltipOpen}
                                          title="Copied to clipboard"
                                          placement="top"
                                        ></Tooltip>
                                      </ClickAwayListener> */}
                                    </>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <TimeAgo dateValue={candidate.createdTime} />
                                </StyledTableCell>
                                <StyledTableCell>
                                  {candidate.resumeLink ? (
                                    <Tooltip title="View Resume" arrow>
                                      <a
                                        href={candidate.resumeLink}
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
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div>
                                    <div className={`${FBstyle.Popper}`}>
                                      <div className={`${FBstyle.StatusStyle}`}>
                                        <div>
                                          <>
                                            {/* {candidate.qualified === true && (
                                              <div
                                                className={`${FBstyle.Green_wrp}`}
                                              >
                                                <input
                                                  type="radio"
                                                  name={`status_${candidate.id}`}
                                                  checked={candidate.qualified}
                                                  id={`qualified_${candidate.id}`}
                                                />
                                                <label
                                                  htmlFor={`qualified_${candidate.id}`}
                                                >
                                                  Qualified
                                                </label>
                                              </div>
                                            )} */}

                                            {candidate.notQualified ===
                                              true && (
                                              <div
                                                className={`${FBstyle.chips_wrp}`}
                                              >
                                                <input
                                                  type="radio"
                                                  checked={
                                                    candidate.notQualified
                                                  }
                                                  name={`status_${candidate.id}`}
                                                  id={`notQualified_${candidate.id}`}
                                                />
                                                <label
                                                  htmlFor={`notQualified_${candidate.id}`}
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
                                            {/* <AiOutlineEdit /> */}
                                          </button>{" "}
                                          <ul
                                            className="dropdown-menu"
                                            style={{ textAlign: "left" }}
                                            // ref={dropdownRef}
                                          >
                                            {/* {candidate.fromFbMetaLeadAd !==
                                              true && (
                                              <li
                                                onClick={(event) => {
                                                  handleConfirmationOpenQualify(
                                                    true
                                                  );
                                                  handleIsQualified(
                                                    "qualified"
                                                  );
                                                }}
                                              >
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                >
                                                  <div
                                                    className={`${FBstyle.select_wrp}`}
                                                    // onClick={() => {
                                                    //   handleButtonClick(
                                                    //     "qualified"
                                                    //   );
                                                    // }}
                                                  >
                                                    <input
                                                      type="radio"
                                                      // ref={inputRef.qualified}
                                                      name={`status_${candidate.id}`}
                                                      checked={
                                                        candidate.qualified
                                                      }
                                                      id={`qualified_${candidate.id}`}
                                                    />

                                                    <label
                                                      htmlFor={`qualified_${candidate.id}`}
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
                                            )} */}
                                            <li
                                              onClick={() => {
                                                setOpenscreening(true);
                                              }}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                style={{ cursor: "pointer" }}
                                              >
                                                <label
                                                  htmlFor={`${candidate.id}`}
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#169c50",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Move to Screening
                                                </label>
                                              </a>
                                            </li>
                                            {candidate.notQualified ===
                                              false && (
                                              <>
                                                <li
                                                  onClick={(event) => {
                                                    handleConfirmationOpen(
                                                      true
                                                    );
                                                    handleIsQualified(
                                                      "notQualified"
                                                    );
                                                  }}
                                                >
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <div
                                                      className={`${FBstyle.select_wrp}`}
                                                    >
                                                      <input
                                                        // ref={inputRef.notQualified}
                                                        type="radio"
                                                        checked={
                                                          candidate.notQualified
                                                        }
                                                        name={`status_${candidate.id}`}
                                                        id={`notQualified_${candidate.id}`}
                                                      />
                                                      <label
                                                        htmlFor={`notQualified_${candidate.id}`}
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
                                              </>
                                            )}
                                            {/* <li>
                                              <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                  handleTimeLinePopup(
                                                    true,
                                                    candidate.id
                                                  );
                                                }}
                                              >
                                                <label
                                                  htmlFor=""
                                                  // className={`${canLeadStyle.Register}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#16617b",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Show Timeline
                                                </label>
                                              </button>
                                            </li> */}
                                            {/* <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <MoreOptionPopper
                                                leadId={candidate.id}
                                              />
                                            </a>
                                          </li> */}
                                            {/* {candidate.qualified ===
                                            true && (
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href={`${profileBaseUrl}/?MN=${candidate.mobileNumber}&adminId=${adminId}`}
                                              >
                                                <label
                                                  htmlFor=""
                                                  className={`${canLeadStyle.Register}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#16609c",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Register
                                                </label>
                                              </a>
                                            </li>
                                          )} */}

                                            <li>
                                              <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                  setOpenNotes(true);
                                                }}
                                              >
                                                <label
                                                  htmlFor=""
                                                  className={`${canLeadStyle.Register}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#16617b",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Add Notes
                                                </label>
                                              </button>
                                            </li>
                                            <li onClick={hadleUpdate}>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                style={{ cursor: "pointer" }}
                                              >
                                                <div
                                                  className={`${FBstyle.select_wrp}`}
                                                >
                                                  <input />
                                                  <label htmlFor="">
                                                    <GoDotFill
                                                      style={{
                                                        color: "#000",
                                                        fontSize: 20,
                                                      }}
                                                    />{" "}
                                                    Update
                                                  </label>
                                                </div>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </StyledTableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <h6 className="text-danger">Not Found</h6>
                    )}
                  </TableBody>
                  {isPopupOpenCanLead && selectedCandidateId && (
                    <MyModal>
                      <ModalContainer
                        childComponent={
                          <>
                            {/* <CanMidLevelPopup
                              id={selectedCandidateId}
                              onClose={handleClose}
                            /> */}
                            <CandidateMidLevelDetailsview
                              Id={selectedCandidateId}
                              onClose={handleClose}
                            />
                          </>
                        }
                      />
                    </MyModal>
                  )}
                </Table>
              </TableContainer>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x py-2 mt-3">
              <Stack spacing={2}>
                <Pagination
                  count={pageCount}
                  // page={page}
                  onChange={candidatePagination}
                  variant="outlined"
                  shape="rounded"
                  color="success"
                  size="medium"
                />
              </Stack>
            </div>
          </div>
        </div>

        {showConfirmationqualifiedPopup && (
          <MyModal>
            <ModalContainer
              // zIndex={2}
              childComponent={
                <>
                  <div>
                    <div className="text-center mb-3">Qualify Candidate</div>
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
              // zIndex={2}
              childComponent={
                <>
                  <div>
                    <div className="text-center mb-3">Disqualify Candidate</div>
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

        {ShowTimeline.show && (
          <MyModal>
            <ModalContainer
              zIndex={1001}
              childComponent={
                <TimelineMidSeniorLevel midSeniorCan={currentMetaDetail.id} />
              }
            />
          </MyModal>
        )}
        {openscreening && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  {currentMetaDetail.resumeLink != null ? (
                    <div style={{ width: "600px" }}>
                      <div style={{ marginBottom: "20px" }}>
                        Are you sure you want to move{" "}
                        <b>
                          {currentMetaDetail.firstName +
                            " " +
                            (currentMetaDetail.lastName != null
                              ? currentMetaDetail.lastName
                              : "")}
                        </b>{" "}
                        to screening ?{" "}
                      </div>
                      <form onSubmit={handleConfirm}>
                        {" "}
                        <div className="row">
                          <div>
                            <TextField
                              label="Meeting Link"
                              variant="outlined"
                              fullWidth
                              required
                              value={movetoscreening.meetingLink}
                              onChange={(e) => {
                                setMovetoscreening((prev) => ({
                                  ...prev,
                                  meetingLink: e.target.value,
                                }));
                              }}
                              margin="normal"
                            />
                          </div>
                          <div className="col-sm-6">
                            {" "}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <FormControl
                                  fullWidth
                                  required
                                  error={Boolean(dateError)}
                                >
                                  <DatePicker
                                    sx={{ width: "100%" }}
                                    label="Meeting Date"
                                    // value={dayjs(movetoscreening.screeningDate)}

                                    onChange={(event) => {
                                      setMovetoscreening((prev) => ({
                                        ...prev,
                                        screeningDate: event.$d,
                                      }));
                                      setDateError(false);
                                      console.log(event, "ghjgajhdghj");
                                    }}
                                  />
                                  {dateError && (
                                    <FormHelperText error>
                                      Please select a date
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </DemoContainer>{" "}
                            </LocalizationProvider>
                          </div>
                          <div className="col-sm-6">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["TimePicker"]}>
                                <FormControl fullWidth error={timeError}>
                                  <TimePicker
                                    sx={{ width: "100%" }}
                                    label="Meeting Time"
                                    required
                                    // value={movetoscreening.screeningTime}
                                    onChange={(event) => {
                                      setMovetoscreening((prev) => ({
                                        ...prev,
                                        screeningTime: event.$d,
                                      }));
                                      console.log(event, "ghjgajhdghj");
                                    }}
                                  />
                                  {timeError && (
                                    <FormHelperText error>
                                      Please select a Time
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </DemoContainer>
                            </LocalizationProvider>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setDateError(false);
                              setTimeError(false);
                              setOpenscreening(false);
                              setMovetoscreening((prev) => ({
                                ...prev,
                                meetingLink: "",
                              }));
                            }}
                          >
                            Close
                          </button>
                          <button
                            className="btn text-light"
                            style={{ backgroundColor: "#169c50" }}
                            type="submit"
                          >
                            Move to screening
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div style={{ width: "400px" }}>
                        <div>
                          Please upload resume{" "}
                          <b> {currentMetaDetail.firstName}</b>
                        </div>
                        {/* <Button
                          style={{ marginBottom: "5px" }}
                          variant="outlined"
                          
                        >handleUploadButtonClick
                          Upload Resume
                        </Button> */}
                        <div className="text-center">
                          <label htmlFor="fileInput">
                            {uploadedFileName ? (
                              <img
                                src={resume}
                                alt="Upload Icon"
                                className="mt-3"
                                style={{
                                  cursor: "pointer",
                                  width: "100px", // Adjust the width as needed
                                  height: "100px", // Adjust the height as needed
                                }}
                              />
                            ) : (
                              <>
                                <img
                                  className="mt-3"
                                  src={companylogo}
                                  alt="Upload Icon"
                                  style={{
                                    // border: "10px solid gray",
                                    cursor: "pointer",
                                    width: "150px", // Adjust the width as needed
                                    height: "150px", // Adjust the height as needed
                                  }}
                                />
                                {/* Upload file */}
                              </>
                            )}
                          </label>
                          <input
                            id="fileInput"
                            type="file"
                            required
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          {uploadedFileName && (
                            <p>Uploaded File: {uploadedFileName}</p>
                          )}
                          {errorMessage && (
                            <p style={{ color: "#d44349" }}>{errorMessage}</p>
                          )}
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-1">
                          <button
                            className="btn btn-danger"
                            onClick={handleCloseModal}
                          >
                            Close
                          </button>
                          <button
                            className="btn text-light"
                            style={{ backgroundColor: "#169c50" }}
                            onClick={handleUpload}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              }
            />
          </MyModal>
        )}
        {openNotes && (
          <MyModal>
            <ModalContainer
              zIndex="1002"
              childComponent={
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <b>Add Notes</b>
                    </div>
                    <div
                      className="btn btn-danger"
                      onClick={() => {
                        setOpenNotes(false);
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                  <TimeLineAddNotes Id={currentMetaDetail.id} />
                </>
              }
            />
          </MyModal>
        )}
        {successing && (
          <MyModal>
            <ModalContainer
              zIndex="1002"
              childComponent={
                <>
                  <SuccessTick HeadText="Moved to screening" />
                </>
              }
            />
          </MyModal>
        )}
        {openLeadForm && (
          <MyModal>
            <ModalContainer
              zIndex="1002"
              childComponent={
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <b className="fs-5">Mid/Senior Level </b>
                    </div>{" "}
                    <div
                      className="btn btn-danger"
                      onClick={() => {
                        setopenLeadForm(false);
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                  <Midelevelseniorpostform
                    // onclose={onclose}
                    reloadpage={reloadingpagelead}
                  />
                </>
              }
            />
          </MyModal>
        )}

        {showSuccess && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={<SuccessTick HeadText="Successfully" />}
            />
          </MyModal>
        )}
        {sourceprefillData && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <>
                  {" "}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <b className="fs-5">Mid/Senior Level </b>
                    </div>{" "}
                    <div
                      className="btn btn-danger"
                      onClick={() => {
                        setSourceprefillData(false);
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                  <Midelevelseniorpostform
                    // onclose={onclose}
                    prefillData={prefillData}
                    reloadpage={reloadingpagelead}
                    // reload={OnReloadingPage}
                  />
                </>
              }
            />
          </MyModal>
        )}
        {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleLoaderClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </div>
    </>
  );
}

export default MidLevelList;
