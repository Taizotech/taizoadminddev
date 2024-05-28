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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import resume from "../../../assets/images/resume.png";
import Stack from "@mui/material/Stack";
import { tableCellClasses } from "@mui/material/TableCell";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import { styled } from "@mui/material/styles";
import midLeadSass from "./midLead.module.scss";
import FBstyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { AiOutlineClose } from "react-icons/ai";
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
  GetDownloadReport,
  PostsendToEmployer,
  PutCandidateSenior,
  SendEmailCandidate,
} from "../../../apiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  MyModal,
  TimeAgoPlusFiveHours,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import {
  CandidateMidLevelActions,
  showHideDetailsActions,
} from "../../../redux-store/store";
import MidLevelFilter from "./MidLevelFilter";
import ModalContainer from "../../../components/modal_popup";
import CandidateMidLevelDetailsview from "../../../components/ModalPopups/CandidateDetails/CandidateMidLevelSenior";
import SuccessTick from "../../../components/success_tick";
import TimeLineAddNotes from "./TimeLineAddNotes";
import { FiSend } from "react-icons/fi";
import Midelevelseniorpostform from "./Midelevelseniorpostform";
import { base_url_node } from "../../../App";
import { MdOutlineContentCopy } from "react-icons/md";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
    // width: "500px",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
}));

function MidLevelSeniorShortlist() {
  const [candidateMidLevellist, setCandidateMidLevellist] = useState([]);
  const [pageCount, setpageCount] = useState();
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [openscreening, setOpenscreening] = useState(false);
  const [successing, setSuccessing] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendReportCandidate, setsendReportCandidate] = useState(false);
  const [uploadedFileSrc, setUploadedFileSrc] = useState(resume);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobCategoryErrors, setJobCategoryErrors] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [sourceprefillData, setSourceprefillData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CanputLead, setCanputLead] = useState(null);
  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  console.log(currentMetaDetail);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [currentLeadDetail, setCurrentLeadDetail] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [ccEmailId, setccEmailId] = useState("");
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [isPopupOpenCanLead, setIsPopupOpenCanLead] = useState(false);
  const [adminSignaturenot, setadminSignaturenot] = useState(false);
  const adminDetails = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetails.roleID == 1;
  const adminId = localStorage.getItem("adminID");
  const [sendtoEmployer, setsendtoEmployer] = useState({
    midSeniorDetails: "",
    empContactName: "",
    toEmail: "",
    ccEmailId: "",
    adminId: adminId == 1 ? "" : adminId,
  });

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

  const [adminName, setAdminName] = useState([]);
  const [selectedCandidateShow, setselectedCandidateShow] = useState(false);
  const [adminid, setAdminId] = useState([]);
  const adminID = localStorage.getItem("adminID");
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
    Dispatch(CandidateMidLevelActions.setSlectedCandidatesEmpty());
    GetCanMidLevellist(CandidateMidLevel, 2)
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

    GetCanMidLevellist(CandidateMidLevel, 2)
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
  function candidatePagination(event, page) {
    const currentPage = page - 1;
    console.log(currentPage, "current page");
    Dispatch(
      CandidateMidLevelActions.setCandidateMidLevelFilterPage(currentPage)
    );
  }
  const selectedCandidates = useSelector(
    (state) => state.CandidateMidLevelDetails.selectedCandidates
  );
  const enteredJobCategory = useSelector(
    (state) => state.CandidateMidLevelDetails.enteredJobCategory
  );
  useEffect(() => {
    console.log(selectedCandidates, "Selected Candidates");
  }, [selectedCandidates]);
  const candidateSelectID = (candidate) => {
    Dispatch(CandidateMidLevelActions.toggleCandidateSelection(candidate));
    // console.log(selectedCandidates, "Selected Candidates");
    // Perform other actions if needed
    setCurrentLeadDetail(candidate);
    setCurrentMetaDetail(candidate);
  };

  const handleJobCategoryChange = (event, candidateId) => {
    const enteredJobCategory = event.target.value;
    const capitalizedJobCategory = enteredJobCategory
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    Dispatch(
      CandidateMidLevelActions.setEnteredJobCategory({
        candidateId,
        enteredJobCategory: capitalizedJobCategory,
      })
    );
    setJobCategoryErrors((prevErrors) => ({
      ...prevErrors,
      [candidateId]: "",
    }));
  };

  const handleSendButtonClick = () => {
    const newErrors = {};

    selectedCandidates.forEach((candidate) => {
      if (!candidate.jobCatagory || candidate.jobCatagory == "") {
        console.error(
          `Candidate ${candidate.id} ${candidate.jobCatagory} has an empty job category.`
        );
        newErrors[candidate.id] = "Job category cannot be empty";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setJobCategoryErrors(newErrors);
      return;
    } else {
      setJobCategoryErrors("");
    }
    // If no errors, proceed with sending candidates
    setsendtoEmployer((prev) => ({
      ...prev,
      midSeniorDetails: selectedCandidates,
    }));
    setOpenscreening(true);
  };
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

  function handleDownloadReport(id) {
    GetDownloadReport(id).then((response) => {
      // Replace the placeholder with the actual raw PDF content
      if (response.statusCode == 400) {
        return;
      }
      const pdfBlob = new Blob([response], { type: "application/pdf" });

      // Create a download link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfBlob);
      // downloadLink.download = "output.pdf";
      downloadLink.download = `${currentMetaDetail.firstName}_Report.pdf`;
      downloadLink.click();
    });
  }
  const sendtoCandidate = (e) => {
    e.preventDefault();
    if (!confirmClicked && !loading) {
      setConfirmClicked(true);
      setLoading(true);

      // Simulate API call with a delay
      setTimeout(() => {
        SendEmailCandidate(
          currentMetaDetail.id,
          currentMetaDetail.emailId,
          ccEmailId
        )
          .then((data) => {
            console.log(data, "data");
            if (data.statusCode === 400) {
              setadminSignaturenot(true);
              return;
            }
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);
            setsendReportCandidate(false);
            setConfirmClicked(false);
            GetCanMidLevellist(CandidateMidLevel, 2).then((data) => {
              console.log(data);
              setCandidateMidLevellist(data.data.content);
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }, 1000); // Replace this with the actual API call
    }
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

        GetCanMidLevellist(CandidateMidLevel, 2).then((data) => {
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

  const handleSendEmployer = (e) => {
    e.preventDefault();
    setLoading(true);
    const ccEmailArray = sendtoEmployer.ccEmailId
      .split(",")
      .map((email) => email.trim());
    PostsendToEmployer(
      { ...sendtoEmployer, ccEmailId: ccEmailArray },
      currentMetaDetail.id
    )
      .then((data) => {
        if (data.statusCode === 400) {
          setadminSignaturenot(true);
          return;
        }
        console.log(data, "data");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        setsendtoEmployer({
          empContactName: "",
          midSeniorDetails: "",
          toEmail: "",
          ccEmailId: "",
        });
        setOpenscreening(false);
        setselectedCandidateShow(false);
        // selectedCandidates[{}];
        setShowLoader(true);
        Dispatch(CandidateMidLevelActions.setSlectedCandidatesEmpty());

        GetCanMidLevellist(CandidateMidLevel, 2).then((data) => {
          console.log(data);
          setCandidateMidLevellist(data.data.content);
        });
        setShowLoader(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
      file: currentMetaDetail.resumeLink,
      currentLocation: currentMetaDetail.currentLocation,
      // Add other fields as needed
    };
  }
  const reloadingpagelead = () => {
    setSourceprefillData(false);
    // setopenLeadForm(false);
    GetCanMidLevellist(CandidateMidLevel, 2).then((data) => {
      console.log(data);
      setCandidateMidLevellist(data.data.content);
    });
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
            <button
              className="btn btn-warning"
              onClick={() => {
                setselectedCandidateShow(true);
              }}
              disabled={!selectedCandidates.length}
            >
              <FiSend /> Send Alert
            </button>
          </div>
          <div className={`${canLeadStyle.filterAdduser}`}>
            {/* <div className="mt-1 me-2 ">Total Count : {totalCount}</div> */}

            <div>
              <MidLevelFilter />
            </div>
            {/* <div>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/Midelevelseniorpostform" }}
              >
                <button className={`ms-2 mt-1 ${canLeadStyle.NewLead}`}>
                  <AiOutlineUserAdd /> Add New Lead
                </button>
              </Link>
            </div> */}
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
                    <TableRow>
                      <StyledTableCell>Select</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Mobile&nbsp;Number</StyledTableCell>
                      {/* <StyledTableCell>Whatsapp&nbsp;Number</StyledTableCell> */}
                      <StyledTableCell>Job&nbsp;Catagory</StyledTableCell>
                      {/* <StyledTableCell>Qualification</StyledTableCell> */}
                      <StyledTableCell>Job&nbsp;Location</StyledTableCell>
                      {isSuperAdmin && (
                        <StyledTableCell>Assigned&nbsp;To</StyledTableCell>
                      )}
                      <StyledTableCell>Email&nbsp;Id</StyledTableCell>
                      <StyledTableCell>Resource&nbsp;On</StyledTableCell>
                      <StyledTableCell>Resume</StyledTableCell>
                      <StyledTableCell>Report</StyledTableCell>
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
                                  setCurrentLeadDetail(candidate);
                                  setCurrentMetaDetail(candidate);
                                }}
                              >
                                <StyledTableCell>
                                  {" "}
                                  <input
                                    type="checkbox"
                                    name="checkbox"
                                    id={candidate.id}
                                    onChange={() =>
                                      candidateSelectID(candidate)
                                    }
                                    className={`fs-4 ${midLeadSass.checkbox} ${
                                      selectedCandidates.some(
                                        (selectedCandidate) =>
                                          selectedCandidate.id === candidate.id
                                      )
                                        ? "checked"
                                        : ""
                                    }`}
                                    checked={selectedCandidates.some(
                                      (selectedCandidate) =>
                                        selectedCandidate.id === candidate.id
                                    )}
                                  />
                                </StyledTableCell>
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
                                  // className="d-flex"
                                >
                                  {candidate.firstName !== null
                                    ? capitalizeWords(candidate.firstName) +
                                      (candidate.lastName !== null
                                        ? " " +
                                          capitalizeWords(candidate.lastName)
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
                                    ? textTruncate(candidate.jobCategory, 20)
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
                                        candidate.prefJobLocation,
                                        20
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {isSuperAdmin && (
                                  <StyledTableCell align="left">
                                    <>
                                      {
                                        adminName[
                                          adminid.indexOf(candidate.adminId)
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
                                    </>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {/* <Ddmmmyyyy_date
                                    dateValue={candidate.shortlistedAt}
                                  /> */}
                                  <TimeAgoPlusFiveHours
                                    dateValue={candidate.shortlistedAt}
                                  />
                                  {/* <TimeAgo dateValue={candidate.shortlistedAt} /> */}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {candidate.resumeLink ? (
                                    // <a
                                    //   className="text-light text-decoration-none"
                                    //   href={candidate.resumeLink}
                                    //   target="_blank"
                                    //   rel="noopener noreferrer"
                                    // >
                                    //   {/* {textTruncate(candidate.resumeLink, 20)} */}
                                    //   <button className="btn btn-primary ">
                                    //     <GrNotes />
                                    //   </button>
                                    // </a>
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
                                  {candidate.report === true ? (
                                    <Tooltip title="View Report" arrow>
                                      <a
                                        href={`${base_url_node}/admin/midSeniorReport?midSeniorId=${candidate.id}&adminId=${adminID}
`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-light text-decoration-none"
                                      >
                                        <button
                                          className="btn "
                                          style={{
                                            backgroundColor: "#805fa8",
                                            cursor: "pointer",
                                            color: "#fff",
                                          }}
                                        >
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

                                            {/* {candidate.notQualified ===
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
                                            )} */}
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
                                            {/* <li
                                              onClick={() => {
                                                setOpenscreening(true);
                                              }}
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                              >
                                                <label
                                                  htmlFor={`${candidate.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#169c50",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Send Employer
                                                </label>
                                              </a>
                                            </li> */}
                                            {/* <li
                                              onClick={(event) => {
                                                handleConfirmationOpen(true);
                                                handleIsQualified(
                                                  "notQualified"
                                                );
                                              }}
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                // onClick={() =>
                                                //   handleButtonClick(
                                                //     "notQualified"
                                                //   )
                                                // }
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
                                            </li> */}
                                            {candidate.report === true && (
                                              <>
                                                <li>
                                                  <button
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                      handleDownloadReport(
                                                        candidate.id
                                                      );
                                                    }}
                                                  >
                                                    <label htmlFor="">
                                                      <GoDotFill
                                                        style={{
                                                          color: "#805fa8",
                                                          fontSize: 20,
                                                        }}
                                                      />{" "}
                                                      Download Report
                                                    </label>
                                                  </button>
                                                </li>
                                                <li>
                                                  <div
                                                    className={`${FBstyle.select_wrp} text-center`}
                                                  >
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() => {
                                                        setsendReportCandidate(
                                                          true
                                                        );
                                                      }}
                                                    >
                                                      <label htmlFor="Candidate">
                                                        <GoDotFill
                                                          style={{
                                                            color: "#169c50",
                                                            fontSize: 20,
                                                          }}
                                                        />{" "}
                                                        Send to Candidate
                                                      </label>
                                                    </a>
                                                  </div>
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
            <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
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
                  {currentMetaDetail.resumeLink != null &&
                  currentMetaDetail.report != false ? (
                    <div style={{ width: "400px" }}>
                      <p>Employer details</p>
                      <form
                        action=""
                        method="post"
                        onSubmit={handleSendEmployer}
                      >
                        {isSuperAdmin && (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              From Admin
                            </InputLabel>
                            <Select
                              MenuProps={{
                                style: {
                                  zIndex: 2000,
                                },
                              }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="fromAdminId"
                              value={sendtoEmployer.adminId}
                              label="From Admin"
                              onChange={(e) => {
                                setsendtoEmployer((prev) => ({
                                  ...prev,
                                  adminId: e.target.value,
                                }));
                              }}
                              required
                              autoComplete="off"
                            >
                              <MenuItem value={2}>Sowmiya</MenuItem>
                              <MenuItem value={4}>Anees</MenuItem>
                              <MenuItem value={7}>Saravanan</MenuItem>
                              <MenuItem value={13}>Nirmala</MenuItem>
                              <MenuItem value={19}>Dinesh</MenuItem>
                              {/* <MenuItem value={16}>Ziya</MenuItem> */}
                            </Select>
                          </FormControl>
                        )}
                        <TextField
                          id="employerName"
                          label="Employer Name"
                          variant="outlined"
                          value={sendtoEmployer.empContactName}
                          onChange={(e) =>
                            setsendtoEmployer((prev) => ({
                              ...prev,
                              empContactName: e.target.value,
                            }))
                          }
                          fullWidth
                          required
                          margin="normal"
                        />

                        <TextField
                          id="employerEmail"
                          label="Employer Email ID"
                          variant="outlined"
                          value={sendtoEmployer.toEmail}
                          onChange={(e) =>
                            setsendtoEmployer((prev) => ({
                              ...prev,
                              toEmail: e.target.value,
                            }))
                          }
                          fullWidth
                          required
                          type="email"
                          margin="normal"
                        />
                        <TextField
                          id="employerEmail"
                          label="CC Mail"
                          variant="outlined"
                          value={sendtoEmployer.ccEmailId}
                          onChange={(e) =>
                            setsendtoEmployer((prev) => ({
                              ...prev,
                              ccEmailId: e.target.value,
                            }))
                          }
                          fullWidth
                          // required
                          type=""
                          margin="normal"
                        />

                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => setOpenscreening(false)}
                          >
                            Close
                          </button>
                          <button
                            className="btn text-light"
                            style={{ backgroundColor: "#169c50" }}
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Sending..." : "Send"}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div style={{ width: "400px" }}>
                        <div>
                          <p>Not Found Resume or Report</p>
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => setOpenscreening(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
        {showSuccess && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={<SuccessTick HeadText="Successfully sent" />}
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
        {selectedCandidateShow && (
          <>
            {" "}
            <MyModal>
              <ModalContainer
                childComponent={
                  <>
                    <div
                      className=""
                      style={{
                        width: "500px",
                      }}
                    >
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-center">
                          Send alert to employer{" "}
                        </div>
                        <div
                          className="btn btn-outline-danger"
                          onClick={() => {
                            setselectedCandidateShow(false);
                            setJobCategoryErrors("");
                          }}
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                      <TableContainer className={`${FBstyle.TableContainer}`}>
                        <Table stickyHeader aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              {" "}
                              {/* <StyledTableCell>ID</StyledTableCell> */}
                              <StyledTableCell>S.No</StyledTableCell>
                              <StyledTableCell>Candidate Name</StyledTableCell>
                              <StyledTableCell>Job Category</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody
                          // style={{ height: "10vh", overflow: "auto" }}
                          >
                            {selectedCandidates.map(
                              (selectedCandidate, index) => (
                                <TableRow key={index}>
                                  {/* <StyledTableCell>
                              {selectedCandidate.id}
                            </StyledTableCell> */}
                                  <StyledTableCell>{index + 1}</StyledTableCell>
                                  <StyledTableCell>
                                    {selectedCandidate.candidateName}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {/* {selectedCandidate.jobCategory} */}
                                    <TextField
                                      label="Job Category"
                                      required
                                      value={selectedCandidate.jobCatagory}
                                      onChange={(event) =>
                                        handleJobCategoryChange(
                                          event,
                                          selectedCandidate.id
                                        )
                                      }
                                      error={Boolean(
                                        jobCategoryErrors[selectedCandidate.id]
                                      )}
                                      helperText={
                                        jobCategoryErrors[
                                          selectedCandidate.id
                                        ] || ""
                                      }
                                    />
                                  </StyledTableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <div className="d-flex justify-content-end mt-2">
                        <div
                          className="btn "
                          style={{ backgroundColor: "#169c50", color: "white" }}
                          onClick={() => {
                            handleSendButtonClick();
                          }}
                        >
                          Send to Employer
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </MyModal>
          </>
        )}
        {sendReportCandidate && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div style={{ width: "400px" }}>
                    <div style={{ marginBottom: "20px" }}>
                      Are you sure you want to send report to{" "}
                      <b>
                        {currentMetaDetail.firstName}{" "}
                        {currentMetaDetail.lastName != null
                          ? currentMetaDetail.lastName
                          : ""}
                      </b>{" "}
                      ?
                      <TextField
                        id="employerEmail"
                        label="CC Mail (optional)"
                        variant="outlined"
                        value={ccEmailId}
                        onChange={(e) => setccEmailId(e.target.value)}
                        fullWidth
                        // required
                        type="email"
                        margin="normal"
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setsendReportCandidate(false);
                          setConfirmClicked(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="btn text-light"
                        style={{ backgroundColor: "#169c50" }}
                        onClick={sendtoCandidate}
                        disabled={confirmClicked || loading}
                      >
                        {loading ? "Loading..." : "Confirm"}
                      </button>
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
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
      </div>
    </>
  );
}

export default MidLevelSeniorShortlist;
