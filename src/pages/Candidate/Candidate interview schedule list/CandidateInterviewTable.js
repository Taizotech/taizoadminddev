/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  GetAllsdminDetails,
  GetcanInterviews,
  PutInterviewStatus,
  getCandidateLead,
  getcandidateDetails,
  PostinterviewInactive,
} from "../../../apiServices";
import { LuRefreshCcw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  DMMMYYYY_formate,
  MyModal,
  capitalizeWords,
  convertDateDDMMYYY,
  convertDateYYYYMMDD,
  textTruncate,
} from "../../../utility";
import interviewStyle from "./candidateInterviewSchedule.module.scss";
import { styled } from "@mui/material/styles";
import { Pagination, Stack, TextField, Tooltip } from "@mui/material";
import {
  commonPopupActions,
  interviewListActions,
} from "../../../redux-store/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import Nojoid from "./Nojoid";
import ModalContainer from "../../../components/modal_popup";
import ScheduleInterviewFilter from "./interviewFilter";
import InterviewReschedule from "../CandidateInterview/interviewReschedule.";
import { Box, isWidthDown } from "@material-ui/core";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import SuccessTick from "../../../components/success_tick";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CandidateInterviewCard from "../interviewCard/interviewCard";

// import { Dropdown } from "bootstrap";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e2dedeed",
    color: "#545454f0",
    maxWidth: "350px",
    padding: "8px",
    "@media (max-width: 992px)": {
      // backgroundColor: "red",
      // padding: "5px 50px",
      // textAlign: "left",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    "@media (max-width: 992px)": {
      // backgroundColor: "red",
      // padding: "5px 50px",
      // textAlign: "center",
    },
  },
}));

function RecentActivity({ data }) {
  const date = {
    rescheduledDateTime: data.rescheduledDateTime,
    joinedOn: data.joinedOn,
    selectedOn: data.selectedOn,
    notSelectedOn: data.notSelectedOn,
    offerRejectedOn: data.offerRejectedOn,
    notAttendedOn: data.notAttendedOn,
    attendedOn: data.attendedOn,
    leftTheCompanyAt: data.leftTheCompanyAt,
    awaitingOn: data.awaitingOn,
    willJoiningOn: data.willJoiningOn,
    callNotAttendOn: data.callNotAttendOn,
  };
  if (date.rescheduledDateTime) {
    date.rescheduledDateTime = date.rescheduledDateTime
      .replace("T", " ")
      .replace(".000+0000", "");
  }
  let mostRecentDate = null;
  let mostRecentKey = null;

  for (const key in date) {
    const dateStr = date[key];
    if (dateStr && dateStr.includes("-")) {
      const currentDate = new Date(dateStr);

      if (!mostRecentDate || currentDate > mostRecentDate) {
        mostRecentDate = currentDate;
        mostRecentKey = key;
        // console.log(mostRecentKey);
        // console.log(mostRecentDate);
      }
    }
  }

  if (mostRecentKey) {
    if (mostRecentKey === "selectedOn") {
      return <div className={`${interviewStyle.Selected}`}>Selected</div>;
    } else if (mostRecentKey === "notSelectedOn") {
      return (
        <div className={`${interviewStyle.Notselected}`}>Not Selected</div>
      );
    } else if (mostRecentKey === "notAttendedOn") {
      return (
        <div className={`${interviewStyle.NotAttended}`}>Not Attended</div>
      );
    } else if (mostRecentKey === "offerRejectedOn") {
      return (
        <div className={`${interviewStyle.rejected_label}`}>Offer Rejected</div>
      );
    } else if (mostRecentKey === "joinedOn") {
      return <div className={`${interviewStyle.joined}`}>Joined</div>;
    } else if (mostRecentKey === "rescheduledDateTime") {
      return (
        <div className={`${interviewStyle.rescheduledChips}`}>Rescheduled</div>
      );
    } else if (mostRecentKey === "attendedOn") {
      return <div className={`${interviewStyle.Attended}`}>Attending</div>;
    } else if (mostRecentKey === "leftTheCompanyAt") {
      return (
        <div className={`${interviewStyle.leftCompany}`}>Left company</div>
      );
    } else if (mostRecentKey === "willJoiningOn") {
      return <div className={`${interviewStyle.willJoining}`}>Will Join</div>;
    } else if (mostRecentKey === "awaitingOn") {
      return <div className={`${interviewStyle.Awaitingchips}`}>Awaiting</div>;
    } else if (mostRecentKey === "callNotAttendOn") {
      return (
        <div className={`${interviewStyle.callNotAttend}`}>
          Call Not Attended
        </div>
      );
    }
  }

  return "";
}

export default function CandidateInterviewTable({ width }) {
  const isSmallScreen = isWidthDown("md", width);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [CandidateInterviewList, setCandidateInterviewList] = React.useState(
    []
  );
  // const [isDateSelected, setIsDateSelected] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [currentInterviewId, setCurrentInterviewId] = useState("");

  const [interviewCard, setInterviewCard] = useState({
    show: false,
    id: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [candidatename, setcandidate] = useState(false);
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactID, setcontactID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccessinactive, setshowSuccessinactive] = useState(false);
  const [pageCount, setPageCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
  });
  const interviewFilter = useSelector(
    (state) => state.interviewListDetails.interviewFilter
  );
  const size = useSelector(
    (state) => state.interviewListDetails.interviewFilter.size
  );

  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;
  const adminIDTwo = localStorage.getItem("adminID") === "2";
  const [open, setOpen] = useState(false);
  const [isNotesEmpty, setIsNotesEmpty] = useState(false);
  const [isCtc, setIsCtc] = useState(false);
  const handleClick = (id) => {
    setCurrentInterviewId(id);
  };
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState({
    caninterviewid: "",
    statusfield: "",
    date: "",
    willJoining: "",
    notes: "",
    ctc: "",
  });
  const inputRef = {
    attended: useRef(),
    notAttended: useRef(),
    selected: useRef(),
    notSelected: useRef(),
    offerRejected: useRef(),
    joined: useRef(),
    leftCompany: useRef(),
    rescheduled: useRef(),
    isAwaiting: useRef(),
    callNotAttend: useRef(),
  };
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleInactiveopen = () => {
    setModalOpen(true);
  };

  function handleCloseNotes() {
    setShowConfirmPopup(false);
    setIsNotesEmpty(false);
    setIsDateSelected(false);
    setInterviewStatus({
      caninterviewid: "",
      statusfield: "",
      date: "",
      willJoining: "",
      notes: "",
      ctc: "",
    });
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }

  const handleOkButtonClick = async () => {
    try {
      setshowSuccessinactive(true);
      const data = await PostinterviewInactive(currentInterviewId);

      console.log("API Response:", data);

      setTimeout(() => {
        setshowSuccessinactive(false);
        setModalOpen(false);
      }, 1500);
      GetcanInterviews(interviewFilter).then((data) => {
        const InterviewList = data.canInterviewList.map((item) => item);
        setCandidateInterviewList(InterviewList);
        setPageCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    setCandidateInterviewList({
      jobId: 0,
      contactNumber: null,
      candidateMobileNumber: 0,
      companyName: null,
      interviewDate: null,
      jobCategory: null,
      area: null,
      city: null,
      interviewCurrentStatus: -1,
      scheduledBy: null,
      endDate: null,
      createdTime: null,
      page: 1,
      size: 10,
    });

    // Fetch data after resetting
    GetcanInterviews(interviewFilter)
      .then((data) => {
        const InterviewList = data.canInterviewList.map((item) => item);
        setCandidateInterviewList(InterviewList);
        setPageCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const handleInterviewCard = () => {
    setInterviewCard({
      show: true,
      id: currentInterviewId,
    });
  };

  const handleRadioBtn = (candidateId, statusFieldName, event) => {
    // let isChecked = event.target.checked;
    console.log(candidateId, "candidateId");
    if (!event || event) {
      handleConfirmationOpen();
      setInterviewStatus((prev) => ({
        ...prev,
        caninterviewid: currentInterviewId,
        statusfield: statusFieldName,
      }));

      // Retrieve contactPersonName from CandidateInterviewList
      const selectedCandidate = CandidateInterviewList.find(
        (candidate) => candidate.CanInterviewsModel.id === currentInterviewId
      );
      if (selectedCandidate) {
        setContactPersonName(selectedCandidate.CandidateModel.firstName);
      }
      if (selectedCandidate) {
        setcontactID(selectedCandidate.CanInterviewsModel.id);
      }
    }
  };

  const ConfirmFormSubmit = (e) => {
    e.preventDefault();
    // if (interviewStatus.notes.trim() === "") {
    //   setIsNotesEmpty(true);
    //   return;
    // }
    if (interviewStatus.notes.trim() === "") {
      setIsNotesEmpty(true);
      return;
    } else {
      PutInterviewStatus(
        interviewStatus.caninterviewid,
        interviewStatus.statusfield,
        interviewStatus.date,
        interviewStatus.willJoining,
        interviewStatus.notes
      ).then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmPopup(false);
        }, 3000);
        setInterviewStatus({
          caninterviewid: "",
          statusfield: "",
          date: "",
          willJoining: "",
          notes: "",
        });
        GetcanInterviews(interviewFilter).then((data) => {
          const InterviewList = data.canInterviewList.map((item) => item);
          setCandidateInterviewList(InterviewList);
          setPageCount((prev) => ({
            ...prev,
            totalPages: Math.ceil(data.totalCount / size),
          }));
          setOpen(false);
        });
      });
    }
  };
  const ConfirmFormSubmitWithoutnotes = (e) => {
    e.preventDefault();
    console.log(e, "eeee");
    if (
      interviewStatus.statusfield === "isJoined" &&
      interviewStatus.date === ""
    ) {
      setIsDateSelected(true);
      // setIsCtc(true);
      return;
    } else if (
      interviewStatus.statusfield === "isJoined" &&
      interviewStatus.ctc === ""
    ) {
      setIsCtc(true);
      return;
    } else {
      PutInterviewStatus(
        interviewStatus.caninterviewid,
        interviewStatus.statusfield,
        interviewStatus.date,
        interviewStatus.willJoining,
        interviewStatus.notes,
        interviewStatus.ctc
      ).then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmPopup(false);
        }, 3000);
        setInterviewStatus({
          caninterviewid: "",
          statusfield: "",
          date: "",
          willJoining: "",
          notes: "",
          ctc: "",
        });
        GetcanInterviews(interviewFilter).then((data) => {
          const InterviewList = data.canInterviewList.map((item) => item);
          setCandidateInterviewList(InterviewList);
          setPageCount((prev) => ({
            ...prev,
            totalPages: Math.ceil(data.totalCount / size),
          }));
          setOpen(false);
        });
      });
    }
  };

  // const ConfirmFormSubmitWithoutnotes = (e) => {
  //   e.preventDefault();
  //   // if (interviewStatus.notes.trim() === "") {
  //   //   setIsNotesEmpty(true);
  //   //   return;
  //   // }
  //   if (
  //     interviewStatus.statusfield === "isJoined" &&
  //     interviewStatus.date !== ""
  //   ) {
  //     setIsDateSelected(true);
  //     return;
  //   } else {
  //     PutInterviewStatus(
  //       interviewStatus.caninterviewid,
  //       interviewStatus.statusfield,
  //       interviewStatus.date,
  //       interviewStatus.willJoining,
  //       interviewStatus.notes
  //     ).then(() => {
  //       setShowSuccess(true);
  //       setTimeout(() => {
  //         setShowSuccess(false);
  //         setShowConfirmPopup(false);
  //       }, 3000);
  //       setInterviewStatus({
  //         caninterviewid: "",
  //         statusfield: "",
  //         date: "",
  //         willJoining: "",
  //         notes: "",
  //       });
  //       GetcanInterviews(interviewFilter).then((data) => {
  //         const InterviewList = data.canInterviewList.map((item) => item);
  //         setCandidateInterviewList(InterviewList);
  //         setPageCount((prev) => ({
  //           ...prev,
  //           totalPages: Math.ceil(data.totalCount / size),
  //         }));
  //         setOpen(false);
  //       });
  //     });
  //   }
  // };

  const handlePopupDetails = (id, type) => {
    console.log(id);

    Dispatch(
      commonPopupActions.setShowPopup({
        name: type,
        id: id,
      })
    );
  };
  const handleCandidateDetails = async (candidateId, type) => {
    let data;
    if (type === "RegisterCandidate") {
      data = await getcandidateDetails(candidateId);
    } else if (type === "CandidateLead") {
      data = await getCandidateLead(candidateId);
    }

    // Dispatch action to show the popup and pass the fetched data
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "candidateDetails",
        id: candidateId,
        type: type,
        data: data,
      })
    );
  };
  function Getreschedule() {
    GetcanInterviews(interviewFilter).then((data) => {
      // eslint-disable-next-line no-use-before-define
      console.log(InterviewList);
      const InterviewList = data.canInterviewList.map((item) => item);
      setCandidateInterviewList(InterviewList);
      setPageCount((prev) => ({
        ...prev,
        // totalCount: totalElements,
        totalPages: Math.ceil(data.totalCount / size),
      }));
    });
  }

  const Dispatch = useDispatch();

  useEffect(() => {
    // console.log(isSuperAdmin, "--------------------------Super");
    if (isSuperAdmin) {
      Dispatch(interviewListActions.setInterviewFilterShceduleBy(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminDetails]);

  useEffect(() => {
    setShowLoader(true); // Show loader before making the API call

    console.log(
      interviewFilter,
      "interviewFilter--------------------------------------"
    );

    GetcanInterviews(interviewFilter)
      .then((data) => {
        const InterviewList = data.canInterviewList.map((item) => item);
        setCandidateInterviewList(InterviewList);
        setTotalCount(data.totalCount);
        setPageCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .finally(() => {
        setShowLoader(false); // Hide loader after the API call is complete
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewFilter]);

  function candidatePagination(event, page) {
    const currentPage = page;

    Dispatch(interviewListActions.setInterviewFilterPage(currentPage));
  }

  function candidateSize(size) {
    Dispatch(interviewListActions.setInterviewFilterSize(size));
    // updateData();
    console.log(size);
  }
  function copyToClipboard(text) {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    document.body.removeChild(textField);
    // const cell = document.activeElement;
    // cell.title = "Copied";
  }
  const handleMenuClick = () => {
    // event.preventDefault();
    setIsRescheduleOpen(true);
  };
  const closeRescheduleModal = () => {
    setIsRescheduleOpen(false);
  };

  const [adminName, setAdminName] = useState([]);
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
  return (
    <>
      <div className={`${interviewStyle.FilterHead}`}>
        {" "}
        <div className="d-flex ">
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
        <div className={`${canLeadStyle.filterAdduser}`}>
          <div className="mt-1 me-2 ">Total Count : {totalCount}</div>
          <div
            className="p-1 success me-2 mx-2 ms-auto"
            onClick={handleReset}
            // style={{ : "#169C50", color: "white" }}
          >
            {/* {
              <p
                style={{
                  backgroundColor: showRedDot ? "red" : "transparent",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></p>
            } */}
            <LuRefreshCcw />
          </div>
          <ScheduleInterviewFilter />
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

      {/* <button onClick={togglePosition}>Toggle Position</button>

      {isAbsolute ? (
        <div className={`${interviewStyle.card} `}>
          <div className={`${interviewStyle.absolute}`}>
            <p>This is a card</p>
          </div>
        </div>
      ) : (
        ""
      )} */}
      {/* sx={{ maxHeight: "70vh", maxWidth: "1000%" }} */}
      <div className={`${interviewStyle.Container}`}>
        {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
        <div className={`table-responsive-sm ${interviewStyle.responsive}`}>
          <TableContainer className={`${interviewStyle.TableContainer}`}>
            <Table
              stickyHeader
              aria-label="sticky table"
              size={isSmallScreen ? "medium" : "small"}
              className={`${interviewStyle.TableDetails}`}
              // style={{ width: "1600px", overflowX: "auto" }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell
                  // className={`mt-1 ${interviewStyle.StyledTableCell}`}
                  >
                    Name
                  </StyledTableCell>
                  <StyledTableCell
                    // className={` ${interviewStyle.StyledTableCell}`}
                    style={{ width: "auto" }}
                    align="left"
                  >
                    Mobile&nbsp;Number
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "auto" }} align="left">
                    Job&nbsp;Category
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Company&nbsp;Name
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">Area</StyledTableCell> */}
                  {/* <StyledTableCell align="left">City</StyledTableCell> */}
                  {isSuperAdmin && (
                    <StyledTableCell align="left">Scheduled by</StyledTableCell>
                  )}
                  {/* <StyledTableCell align="left">Possible %</StyledTableCell> */}
                  <StyledTableCell align="left">
                    Interview&nbsp;Date
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Created&nbsp;On
                  </StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  {/*
                   */}
                </TableRow>
              </TableHead>
              <TableBody>
                {CandidateInterviewList.length > 0 ? (
                  <>
                    {CandidateInterviewList.map((candidate, i) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={i}
                        onClick={() => {
                          setInterviewStatus((prev) => ({
                            ...prev,
                            id: candidate.id,
                          }));
                          setcandidate(candidate);
                        }}
                      >
                        <StyledTableCell
                          sx={{ color: "#0b7af0", cursor: "pointer" }}
                          title={candidate.CandidateModel?.firstName || null}
                          onClick={() => {
                            handleCandidateDetails(
                              candidate.CandidateModel.id,
                              "RegisterCandidate"
                            );
                          }}
                        >
                          {candidate.CandidateModel?.firstName
                            ? textTruncate(
                                capitalizeWords(
                                  candidate.CandidateModel.firstName
                                ),
                                15
                              ) +
                              " " +
                              textTruncate(
                                capitalizeWords(
                                  candidate.CandidateModel.lastName
                                ),
                                5
                              )
                            : "-"}
                        </StyledTableCell>
                        <StyledTableCell
                          onClick={() => {
                            if (
                              candidate.CandidateModel &&
                              candidate.CandidateModel.mobileNumber
                            ) {
                              copyToClipboard(
                                candidate.CandidateModel.mobileNumber
                              );
                            }
                          }}
                        >
                          {candidate.CandidateModel &&
                          candidate.CandidateModel.mobileNumber
                            ? String(
                                candidate.CandidateModel.mobileNumber
                              ).slice(0, 10)
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ color: "#0b7af0", cursor: "pointer" }}
                          title={
                            candidate.JobModel.jobCategory &&
                            candidate.JobModel.jobCategory.length > 20
                              ? candidate.JobModel.jobCategory
                              : null
                          }
                          onClick={() => {
                            copyToClipboard(
                              candidate.CandidateModel.jobCategory
                            );
                            handlePopupDetails(
                              candidate.CanInterviewsModel.jobId,
                              "jobDetails"
                            );
                          }}
                        >
                          {" "}
                          {candidate.JobModel.jobCategory &&
                          candidate.JobModel.jobCategory.length > 20
                            ? `${candidate.JobModel.jobCategory.slice(
                                0,
                                20
                              )}...`
                            : candidate.JobModel.jobCategory}
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          sx={{ color: "#0b7af0", cursor: "pointer" }}
                          title={
                            candidate.CanInterviewsModel.companyName.length > 20
                              ? candidate.CanInterviewsModel.companyName
                              : null
                          }
                          onClick={() => {
                            copyToClipboard(
                              candidate.CanInterviewsModel.companyName
                            );
                            handlePopupDetails(
                              candidate.EmployerModel.id,
                              "employerDetails"
                            );
                            // Update the title attribute with "Copied"
                            // cell.title = "Copied";
                          }}
                        >
                          {candidate.CanInterviewsModel.companyName.length > 20
                            ? `${candidate.CanInterviewsModel.companyName.slice(
                                0,
                                20
                              )}...`
                            : candidate.CanInterviewsModel.companyName}
                        </StyledTableCell>
                        {/* <StyledTableCell align="left">
                          {candidate.CanInterviewsModel.area}
                        </StyledTableCell> */}
                        {/* <StyledTableCell align="left">
                          {candidate.CanInterviewsModel.city}
                        </StyledTableCell> */}
                        {isSuperAdmin && (
                          <StyledTableCell align="left">
                            <>
                              {
                                adminName[
                                  adminid.indexOf(
                                    candidate.CanInterviewsModel.adminId
                                      .length > 15
                                      ? `${candidate.CanInterviewsModel.adminId.slice(
                                          0,
                                          15
                                        )}...`
                                      : candidate.CanInterviewsModel.adminId
                                  )
                                ]
                              }
                            </>
                          </StyledTableCell>
                        )}

                        {/* <StyledTableCell align="left">
                          {candidate.CanInterviewsModel.candidatePercentage}
                        </StyledTableCell> */}
                        <StyledTableCell align="left">
                          {
                            // eslint-disable-next-line react/jsx-pascal-case
                            <DMMMYYYY_formate
                              dateValue={
                                !candidate.CanInterviewsModel.rescheduled
                                  ? candidate.CanInterviewsModel.interviewDate
                                  : candidate.CanInterviewsModel.rescheduledDate
                              }
                            />
                          }
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {
                            // eslint-disable-next-line react/jsx-pascal-case
                            <DMMMYYYY_formate
                              dateValue={
                                candidate.CanInterviewsModel.createdTime
                              }
                            />
                          }
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div className={`${interviewStyle.Popper}`}>
                            {interviewFilter.interviewStatus === -1 ? (
                              <div>
                                <RecentActivity
                                  data={candidate.CanInterviewsModel}
                                />
                              </div>
                            ) : (
                              <>
                                <div className={interviewStyle.chips_wrp}>
                                  {interviewFilter.interviewStatus === "1" ? (
                                    <>
                                      <div
                                        className={interviewStyle.Attended_wrp}
                                      >
                                        {candidate.CanInterviewsModel
                                          .attended && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`attended_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .attended
                                              }
                                            />

                                            {candidate.CanInterviewsModel
                                              .attended && isChecked ? (
                                              <Tooltip title=" candidate attended">
                                                <label
                                                  htmlFor={`attended_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  Attending
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`attended_${candidate.CanInterviewsModel.id}`}
                                              >
                                                Attending
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "2" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.NotAttended_wrp
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .notAttended && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`notAttended_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .notAttended
                                              }
                                            />

                                            {candidate.CanInterviewsModel
                                              .notAttended && isChecked ? (
                                              <Tooltip title=" candidate attended">
                                                <label
                                                  htmlFor={`notAttended_${candidate.CanInterviewsModel.id}`}
                                                  className={`${interviewStyle.rejected_label}`}
                                                >
                                                  Not Attended
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`notAttended_${candidate.CanInterviewsModel.id}`}
                                                className={`${interviewStyle.rejected_label}`}
                                              >
                                                Not Attended
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}

                                  {interviewFilter.interviewStatus === "3" ? (
                                    <>
                                      <div
                                        className={interviewStyle.Selected_wrp}
                                      >
                                        {candidate.CanInterviewsModel
                                          .selected && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`selected_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .selected
                                              }
                                            />
                                            {candidate.CanInterviewsModel
                                              .selected && isChecked ? (
                                              <Tooltip title="Already candidate selected">
                                                <label
                                                  htmlFor={`selected_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  Selected
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`selected_${candidate.CanInterviewsModel.id}`}
                                              >
                                                Selected
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "10" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.willJoining_wrp
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .willJoining && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`willJoining_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .willJoining
                                              }
                                            />
                                            {candidate.CanInterviewsModel
                                              .willJoining && isChecked ? (
                                              <Tooltip title="Already candidate will Joining">
                                                <label
                                                  htmlFor={`willJoining_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  Will Join
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`willJoining_${candidate.CanInterviewsModel.id}`}
                                              >
                                                will Join
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "11" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.callNotAttend_wrp
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .callNotAttend && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`callNotAttend_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .callNotAttend
                                              }
                                            />

                                            {candidate.CanInterviewsModel
                                              .callNotAttend && isChecked ? (
                                              <Tooltip title=" candidate callNotAttend">
                                                <label
                                                  htmlFor={`callNotAttend_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  callNotAttend
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`callNotAttend_${candidate.CanInterviewsModel.id}`}
                                              >
                                                callNotAttend
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "9" ? (
                                    <>
                                      <div
                                        className={interviewStyle.awaiting_wrp}
                                      >
                                        {candidate.CanInterviewsModel
                                          .awaiting && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`awaiting_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .awaiting
                                              }
                                            />
                                            {candidate.CanInterviewsModel
                                              .awaiting && isChecked ? (
                                              <Tooltip title="Already candidate Awaiting">
                                                <label
                                                  htmlFor={`awaiting_${candidate.CanInterviewsModel.id}`}
                                                  className={`${interviewStyle.Awaitingchips}`}
                                                >
                                                  Awaiting
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`awaiting_${candidate.CanInterviewsModel.id}`}
                                                className={`${interviewStyle.Awaitingchips}`}
                                              >
                                                Awaiting
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "4" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.NotSelected_wrp
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .notSelected && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`notSelected_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .notSelected
                                              }
                                            />
                                            {candidate.CanInterviewsModel
                                              .notSelected && isChecked ? (
                                              <Tooltip title="Already candidate selected">
                                                <label
                                                  htmlFor={`notSelected_${candidate.CanInterviewsModel.id}`}
                                                  className={`${interviewStyle.rejected_label}`}
                                                >
                                                  Not Selected
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`notSelected_${candidate.CanInterviewsModel.id}`}
                                                className={`${interviewStyle.rejected_label}`}
                                              >
                                                Not Selected
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "5" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.OfferRejected_wrp
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .offerRejected && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`offerRejected_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .offerRejected
                                              }
                                            />

                                            {candidate.CanInterviewsModel
                                              .offerRejected && isChecked ? (
                                              <Tooltip title="Already candidate Rejected">
                                                <label
                                                  htmlFor={`offerRejected_${candidate.CanInterviewsModel.id}`}
                                                  className={`${interviewStyle.rejected_label}`} // Add this class
                                                >
                                                  Offer Rejected
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`offerRejected_${candidate.CanInterviewsModel.id}`}
                                                className={`${interviewStyle.rejected_label}`} // Add this class
                                              >
                                                Offer Rejected
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "7" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.rescheduledChips
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .rescheduled && (
                                          <>
                                            <label>Reschedule</label>
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "6" ? (
                                    <>
                                      <div
                                        className={interviewStyle.Joined_wrp}
                                      >
                                        {candidate.CanInterviewsModel
                                          .joined && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`joined_${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .joined
                                              }
                                            />
                                            {candidate.CanInterviewsModel
                                              .joined && isChecked ? (
                                              <Tooltip title="Already candidate joined">
                                                <label
                                                  htmlFor={`joined_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  Joined
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`joined_${candidate.CanInterviewsModel.id}`}
                                              >
                                                Joined
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                  {interviewFilter.interviewStatus === "8" ? (
                                    <>
                                      <div
                                        className={
                                          interviewStyle.LeftCompany_wrp
                                        }
                                      >
                                        {candidate.CanInterviewsModel
                                          .leftTheCompany && (
                                          <>
                                            <input
                                              type="checkbox"
                                              name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                              id={`leftCompany${candidate.CanInterviewsModel.id}`}
                                              checked={
                                                candidate.CanInterviewsModel
                                                  .leftTheCompany
                                              }
                                            />
                                            {candidate.CanInterviewsModel
                                              .leftTheCompany && isChecked ? (
                                              <Tooltip title="Already candidate LeftCompany">
                                                <label
                                                  htmlFor={`leftCompany${candidate.CanInterviewsModel.id}`}
                                                >
                                                  Left Company
                                                </label>
                                              </Tooltip>
                                            ) : (
                                              <label
                                                htmlFor={`leftCompany${candidate.CanInterviewsModel.id}`}
                                              >
                                                Left Company
                                              </label>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                </div>
                              </>
                            )}
                            <div>
                              <div className="btn-group dropstart">
                                <button
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  data-bs-no-caret="true"
                                  aria-expanded="false"
                                  onClick={(e) => {
                                    handleClick(
                                      candidate.CanInterviewsModel.id,
                                      e
                                    );
                                  }}
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
                                  }}
                                >
                                  <BsThreeDotsVertical />
                                  {/* <AiOutlineEdit /> */}
                                </button>
                                <ul
                                  className="dropdown-menu"
                                  style={{ textAlign: "left" }}
                                  // ref={dropdownRef}
                                >
                                  {/* <!-- Dropdown menu links --> */}
                                  {candidate.CanInterviewsModel.attended ===
                                    false &&
                                    candidate.CanInterviewsModel.notAttended ===
                                      false && (
                                      <>
                                        <li
                                          onClick={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isAttended",
                                              event.target.checked
                                            )
                                          }
                                        >
                                          <a className="dropdown-item" href="#">
                                            <div
                                              className={`${interviewStyle.select_wrp}`}
                                            >
                                              <input
                                                type="checkbox"
                                                id={`attended_${candidate.CanInterviewsModel.id}`}
                                                name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                checked={
                                                  candidate.CanInterviewsModel
                                                    .attended
                                                }
                                              />

                                              <label
                                                htmlFor={`attended_${candidate.CanInterviewsModel.id}`}
                                              >
                                                <GoDotFill
                                                  style={{
                                                    color: "#FEF08A",
                                                    fontSize: 20,
                                                  }}
                                                />{" "}
                                                Attending
                                              </label>
                                            </div>
                                          </a>
                                        </li>
                                      </>
                                    )}
                                  <li
                                    onClick={(event) =>
                                      handleRadioBtn(
                                        candidate.CanInterviewsModel.id,
                                        "callNotAttend",
                                        event.target.checked
                                      )
                                    }
                                  >
                                    <a className="dropdown-item" href="#">
                                      <div
                                        className={`${interviewStyle.select_wrp}`}
                                      >
                                        <input
                                          type="checkbox"
                                          id={`callNotAttend${candidate.CanInterviewsModel.id}`}
                                          name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                          checked={
                                            candidate.CanInterviewsModel
                                              .callNotAttend
                                          }
                                        />

                                        <label
                                          htmlFor={`callNotAttend${candidate.CanInterviewsModel.id}`}
                                        >
                                          <GoDotFill
                                            style={{
                                              color: "#00b300",
                                              fontSize: 20,
                                            }}
                                          />{" "}
                                          Call Not Attended
                                        </label>
                                      </div>
                                    </a>
                                  </li>
                                  {candidate.CanInterviewsModel.selected ===
                                    false && (
                                    // candidate.CanInterviewsModel.notAttended ===
                                    //   false &&
                                    <li
                                      onClick={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isNotAttended",
                                          event.target.checked
                                        )
                                      }
                                    >
                                      <a className="dropdown-item" href="#">
                                        <div
                                          className={`${interviewStyle.select_wrp}`}
                                        >
                                          <input
                                            type="checkbox"
                                            // ref={inputRef.notAttended}
                                            name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                            id={`notAttended_${candidate.CanInterviewsModel.id}`}
                                            checked={
                                              candidate.CanInterviewsModel
                                                .notAttended
                                            }
                                          />

                                          <label
                                            htmlFor={`notAttended_${candidate.CanInterviewsModel.id}`}
                                          >
                                            <GoDotFill
                                              style={{
                                                color: "#FFA164",
                                                fontSize: 20,
                                              }}
                                            />{" "}
                                            Not Attended
                                          </label>
                                        </div>
                                      </a>
                                    </li>
                                  )}
                                  {candidate.CanInterviewsModel.attended ===
                                    true && (
                                    <>
                                      {candidate.CanInterviewsModel.selected ===
                                        false &&
                                        candidate.CanInterviewsModel
                                          .notSelected === false &&
                                        candidate.CanInterviewsModel
                                          .awaiting === false && (
                                          <li
                                            onClick={(event) =>
                                              handleRadioBtn(
                                                candidate.CanInterviewsModel.id,
                                                "isAwaiting",
                                                event.target.checked
                                              )
                                            }
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <div
                                                className={`${interviewStyle.select_wrp}`}
                                              >
                                                <input
                                                  type="checkbox"
                                                  // ref={inputRef.selected}
                                                  name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                  id={`awaiting_${candidate.CanInterviewsModel.id}`}
                                                  checked={
                                                    candidate.CanInterviewsModel
                                                      .awaiting
                                                  }
                                                />
                                                <label
                                                  htmlFor={`awaiting_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#8E44AD",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Awaiting
                                                </label>
                                              </div>
                                            </a>
                                          </li>
                                        )}
                                      {candidate.CanInterviewsModel.selected ===
                                        false &&
                                        candidate.CanInterviewsModel
                                          .notSelected === false && (
                                          <li
                                            onClick={(event) =>
                                              handleRadioBtn(
                                                candidate.CanInterviewsModel.id,
                                                "isSelected",
                                                event.target.checked
                                              )
                                            }
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <div
                                                className={`${interviewStyle.select_wrp}`}
                                              >
                                                <input
                                                  type="checkbox"
                                                  // ref={inputRef.selected}
                                                  name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                  id={`selected_${candidate.CanInterviewsModel.id}`}
                                                  checked={
                                                    candidate.CanInterviewsModel
                                                      .selected
                                                  }
                                                />
                                                <label
                                                  htmlFor={`selected_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#BBF7D0",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Selected
                                                </label>
                                              </div>
                                            </a>
                                          </li>
                                        )}

                                      {candidate.CanInterviewsModel.selected ===
                                        false &&
                                        candidate.CanInterviewsModel
                                          .notSelected === false && (
                                          <li
                                            onClick={(event) =>
                                              handleRadioBtn(
                                                candidate.CanInterviewsModel.id,
                                                "isNotSelected",
                                                event.target.checked
                                              )
                                            }
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <div
                                                className={`${interviewStyle.select_wrp}`}
                                              >
                                                <input
                                                  type="checkbox"
                                                  // ref={inputRef.notSelected}
                                                  name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                  id={`notSelected_${candidate.CanInterviewsModel.id}`}
                                                  checked={
                                                    candidate.CanInterviewsModel
                                                      .notSelected
                                                  }
                                                />
                                                <label
                                                  htmlFor={`notSelected_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#FECACA",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Not Selected
                                                </label>
                                              </div>
                                            </a>
                                          </li>
                                        )}
                                    </>
                                  )}
                                  {candidate.CanInterviewsModel.selected ===
                                    true && (
                                    <>
                                      {candidate.CanInterviewsModel
                                        .offerRejected === false && (
                                        <li
                                          onClick={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "willJoining",
                                              event.target.checked
                                            )
                                          }
                                        >
                                          <a className="dropdown-item" href="#">
                                            <div
                                              className={`${interviewStyle.select_wrp}`}
                                            >
                                              <input
                                                // ref={inputRef.offerRejected}
                                                type="checkbox"
                                                name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                id={`willJoining_${candidate.CanInterviewsModel.id}`}
                                                checked={
                                                  candidate.CanInterviewsModel
                                                    .willJoining
                                                }
                                              />

                                              <label
                                                htmlFor={`willJoining_${candidate.CanInterviewsModel.id}`}
                                              >
                                                <GoDotFill
                                                  style={{
                                                    color: "#7B7D7D",
                                                    fontSize: 20,
                                                  }}
                                                />{" "}
                                                Will Join
                                              </label>
                                            </div>
                                          </a>
                                        </li>
                                      )}
                                      {/* {candidate.CanInterviewsModel
                                        .willJoining === false && (
                                        
                                      )} */}
                                      {candidate.CanInterviewsModel.joined ===
                                        false &&
                                        candidate.CanInterviewsModel
                                          .offerRejected === false && (
                                          <li
                                            onClick={(event) =>
                                              handleRadioBtn(
                                                candidate.CanInterviewsModel.id,
                                                "isOfferRejected",
                                                event.target.checked
                                              )
                                            }
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <div
                                                className={`${interviewStyle.select_wrp}`}
                                              >
                                                <input
                                                  // ref={inputRef.offerRejected}
                                                  type="checkbox"
                                                  name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                  id={`offerRejected_${candidate.CanInterviewsModel.id}`}
                                                  checked={
                                                    candidate.CanInterviewsModel
                                                      .offerRejected
                                                  }
                                                />

                                                <label
                                                  htmlFor={`offerRejected_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#636363",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Offer Rejected
                                                </label>
                                              </div>
                                            </a>
                                          </li>
                                        )}
                                      {candidate.CanInterviewsModel
                                        .offerRejected === false &&
                                        candidate.CanInterviewsModel.joined ===
                                          false && (
                                          <li
                                            onClick={(event) =>
                                              handleRadioBtn(
                                                candidate.CanInterviewsModel.id,
                                                "isJoined",
                                                event.target.checked
                                              )
                                            }
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <div
                                                className={`${interviewStyle.select_wrp}`}
                                              >
                                                <input
                                                  // ref={inputRef.joined}
                                                  type="checkbox"
                                                  name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                                  id={`joined_${candidate.CanInterviewsModel.id}`}
                                                  checked={
                                                    candidate.CanInterviewsModel
                                                      .joined
                                                  }
                                                />

                                                <label
                                                  htmlFor={`joined_${candidate.CanInterviewsModel.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#b7ff98",
                                                      fontSize: 20,
                                                    }}
                                                  />{" "}
                                                  Joined
                                                </label>
                                              </div>
                                            </a>
                                          </li>
                                        )}
                                    </>
                                  )}
                                  {candidate.CanInterviewsModel.joined ===
                                    true && (
                                    <li
                                      onClick={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isLeftCompany",
                                          event.target.checked
                                        )
                                      }
                                    >
                                      <a className="dropdown-item" href="#">
                                        <div
                                          className={`${interviewStyle.select_wrp}`}
                                        >
                                          <input
                                            // ref={inputRef.leftCompany}
                                            type="checkbox"
                                            name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                            id={`leftCompany_${candidate.CanInterviewsModel.id}`}
                                            checked={
                                              candidate.CanInterviewsModel
                                                .leftCompany
                                            }
                                            // onChange={(event) =>

                                            // }
                                          />

                                          <label
                                            htmlFor={`leftCompany_${candidate.CanInterviewsModel.id}`}
                                          >
                                            <GoDotFill
                                              style={{
                                                color: "#fa9e0a",
                                                fontSize: 20,
                                              }}
                                            />{" "}
                                            Left Company
                                          </label>
                                        </div>
                                      </a>
                                    </li>
                                  )}
                                  {(isSuperAdmin || adminIDTwo) && (
                                    <li
                                      onClick={() =>
                                        handleButtonClick("rescheduled")
                                      }
                                    >
                                      <a className="dropdown-item" href="#">
                                        <label
                                          ref={inputRef.rescheduled}
                                          onClick={(e) => {
                                            handleMenuClick(
                                              candidate.CanInterviewsModel.id,
                                              e
                                            );
                                          }}
                                        >
                                          <GoDotFill
                                            style={{
                                              color: "#55559f",
                                              fontSize: 20,
                                            }}
                                          />{" "}
                                          Reschedule
                                        </label>
                                      </a>
                                    </li>
                                  )}

                                  <li
                                    className=""
                                    onClick={(e) => {
                                      handleInterviewCard();
                                    }}
                                  >
                                    <a className="dropdown-item" href="#">
                                      <label>
                                        <GoDotFill
                                          style={{
                                            color: "#55559f",
                                            fontSize: 20,
                                          }}
                                        />{" "}
                                        Interview Card
                                      </label>
                                    </a>
                                  </li>
                                  <li
                                    className=""
                                    onClick={(e) => {
                                      handleInactiveopen();
                                    }}
                                  >
                                    <a className="dropdown-item" href="#">
                                      <label>
                                        <GoDotFill
                                          style={{
                                            color: "#F85244",
                                            fontSize: 20,
                                          }}
                                        />{" "}
                                        Inactive
                                      </label>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    {" "}
                    <Nojoid />
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Paper> */}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
        <Stack spacing={2}>
          <Pagination
            count={pageCount.totalPages}
            variant="outlined"
            shape="rounded"
            color="success"
            onChange={candidatePagination}
          />
        </Stack>
      </div>
      <div className="mt-2"></div>
      {showConfirmPopup && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <div
                  style={{
                    width: "400px",
                  }}
                >
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "390px" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <>
                      <div>
                        <div className="text-center mb-2">Add Notes</div>
                        <div>
                          {!(
                            interviewStatus.statusfield === "isAttended" ||
                            interviewStatus.statusfield === "isJoined" ||
                            interviewStatus.statusfield === "isSelected" ||
                            interviewStatus.statusfield === "callNotAttend"
                          ) ? (
                            <>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Add Notes"
                                multiline
                                style={{ width: "100%" }}
                                error={isNotesEmpty}
                                helperText={
                                  isNotesEmpty ? "Notes cannot be empty" : ""
                                }
                                required
                                onChange={(event) => {
                                  setInterviewStatus((prev) => ({
                                    ...prev,
                                    notes: event.target.value,
                                  }));
                                  setIsNotesEmpty(false);
                                }}
                                maxRows={4}
                                fullWidth
                              />
                              {interviewStatus.statusfield ===
                                "willJoining" && (
                                <FormControl fullWidth error={isNotesEmpty}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Date"
                                      sx={{ width: "100%" }}
                                      className="mt-4"
                                      onChange={(datefeild) => {
                                        console.log(
                                          "ortiuoDate Field:",
                                          datefeild.$d
                                        );
                                        setInterviewStatus((prev) => ({
                                          ...prev,
                                          date: datefeild.$d,
                                        }));
                                        setIsNotesEmpty(false);
                                      }}
                                      fullWidth
                                    />
                                    {isNotesEmpty && (
                                      <FormHelperText error>
                                        Please select a date
                                      </FormHelperText>
                                    )}
                                  </LocalizationProvider>
                                </FormControl>
                              )}
                              <div className="d-flex justify-content-end gap-1 mt-2">
                                <button
                                  className="btn text-white"
                                  onClick={handleCloseNotes}
                                  style={{ backgroundColor: "#d00a0a" }}
                                >
                                  Close
                                </button>
                                <button
                                  className="btn text-white"
                                  onClick={ConfirmFormSubmit}
                                  style={{ backgroundColor: "#169C50" }}
                                >
                                  Submit
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Add Notes"
                                multiline
                                style={{ width: "100%" }}
                                onChange={(event) => {
                                  setInterviewStatus((prev) => ({
                                    ...prev,
                                    notes: event.target.value,
                                  }));
                                  // setIsNotesEmpty(false);
                                  // setShowConfirmPopup(false);
                                }}
                                maxRows={4}
                                fullWidth
                              />
                              {(interviewStatus.statusfield === "isJoined" ||
                                interviewStatus.statusfield ===
                                  "isSelected") && (
                                <>
                                  <FormControl fullWidth error={isDateSelected}>
                                    {/* error={isNotesEmpty} */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Date"
                                        sx={{ width: "100%" }}
                                        className="mt-4"
                                        // value={dayjs(interviewStatus.date)}

                                        onChange={(datefeild) => {
                                          console.log(
                                            "odksogdgoDate Field:",
                                            datefeild.$d
                                          );
                                          setInterviewStatus((prev) => ({
                                            ...prev,
                                            date: datefeild.$d,
                                          }));
                                          setIsDateSelected(false);
                                          // console.log(
                                          //   convertDateYYYYMMDD(datefeild.$d)
                                          // );
                                          // setIsNotesEmpty(false);
                                        }}
                                        // required={
                                        //   interviewStatus.statusfield ===
                                        //   "isJoined"
                                        // }
                                        fullWidth
                                        // required
                                      />
                                      {isDateSelected && (
                                        <FormHelperText error>
                                          Please select a date
                                        </FormHelperText>
                                      )}
                                    </LocalizationProvider>
                                  </FormControl>
                                </>
                              )}
                              {interviewStatus.statusfield === "isJoined" && (
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="CTC (in rupees)"
                                  className="mt-4"
                                  style={{ width: "100%" }}
                                  onChange={(event) => {
                                    const inputVal = event.target.value;
                                    const isNumber = /^\d+$/.test(inputVal);

                                    if (isNumber || inputVal === "") {
                                      setInterviewStatus((prev) => ({
                                        ...prev,
                                        ctc: inputVal,
                                      }));
                                      setIsCtc(false);
                                    } else {
                                      setIsCtc(true);
                                    }
                                  }}
                                  error={isCtc}
                                  helperText={
                                    isCtc
                                      ? "CTC (in rupees) must be a number"
                                      : ""
                                  }
                                  inputProps={{
                                    maxLength: 7,
                                    pattern: "[0-9]*",
                                  }} // Set maxLength and pattern for number input
                                  fullWidth
                                />
                              )}
                              <div className="d-flex justify-content-end gap-1 mt-2">
                                <button
                                  className="btn text-white"
                                  onClick={handleCloseNotes}
                                  style={{ backgroundColor: "#d00a0a" }}
                                >
                                  Close
                                </button>
                                <button
                                  className="btn text-white"
                                  onClick={ConfirmFormSubmitWithoutnotes}
                                  style={{ backgroundColor: "#169C50" }}
                                >
                                  Submit
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  </Box>
                </div>
              </>
            }
          />
        </MyModal>
      )}

      {interviewCard.show && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <div className="d-flex flex-row justify-content-between ">
                  <div>
                    <h2>Download Interview Card </h2>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setInterviewCard((prev) => ({ ...prev, show: false }));
                      }}
                    >
                      x
                    </Button>
                  </div>
                </div>
                <div style={{ height: "80vh", overflowY: "scroll" }}>
                  <div></div>
                  <CandidateInterviewCard interviewId={currentInterviewId} />
                </div>
              </>
            }
          />
        </MyModal>
      )}

      {modalOpen && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <p>
                  Are you sure you want to inactive{" "}
                  <strong>
                    {capitalizeWords(candidatename.CandidateModel.firstName)}{" "}
                    {capitalizeWords(candidatename.CandidateModel.lastName)}
                  </strong>
                  ?
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setModalOpen(false)}
                    style={{
                      borderColor: "red",
                      color: "red",
                      marginRight: "10px",
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleOkButtonClick}
                  >
                    OK
                  </Button>
                </div>
              </>
            }
          />
        </MyModal>
      )}

      {showSuccess && (
        <MyModal>
          <ModalContainer
            childComponent={<SuccessTick HeadText="Successfully Updated" />}
          />
        </MyModal>
      )}
      {showSuccessinactive && (
        <MyModal>
          <ModalContainer
            childComponent={<SuccessTick HeadText="Successfully" />}
          />
        </MyModal>
      )}
      {isRescheduleOpen && (
        <InterviewReschedule
          interviewId={currentInterviewId}
          onSuccess={() => {
            handleReset();
            closeRescheduleModal();
          }}
          onClose={closeRescheduleModal}
          // showModal={true}
        />
      )}
    </>
  );
}
