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
import { IconButton, TextField, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { tableCellClasses } from "@mui/material/TableCell";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import { styled } from "@mui/material/styles";
import FBstyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { GrNotes } from "react-icons/gr";
import { LuRefreshCcw } from "react-icons/lu";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GetAllsdminDetails,
  GetMidseniorSourcing,
  PutMidsoucingQualifyMail,
} from "../../../apiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  MyModal,
  TimeAgo,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import { CandidateMidLevelsourcingActions } from "../../../redux-store/store";
import ModalContainer from "../../../components/modal_popup";
import SuccessTick from "../../../components/success_tick";
import MidSeniorsourcingFilter from "./MidSeniorsourcingFilter";
import CandidateMidSourcingView from "../../../components/ModalPopups/CandidateDetails/CandidateMidSourcing";
import JobApplicationForm from "./MidSeniorSourcingForm";
import { MdOutlineContentCopy } from "react-icons/md";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
}));

function MidLevelSourcing() {
  const [candidateMidsourcingllist, setCandidateMidsourcingllist] = useState(
    []
  );
  const [isTooltipOpen, setTooltipOpen] = useState({});
  const [newLead, setNewLead] = useState(false);
  const [sourcingpageCount, setsourcingpageCount] = useState();
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sourceprefillData, setSourceprefillData] = useState(false);
  const [CanputLead, setCanputLead] = useState("");
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

  const Dispatch = useDispatch();
  const CandidateMidLevel = useSelector(
    (state) =>
      state.CandidateMidLevelsourcingDetails.CandidateMidLevelsourcingFilter
  );
  const ShowTimeline = useSelector(
    (state) => state.showHideDetails.candidateLead.leadTimeLine
  );

  const [putCandidateLead, setPutcandidateLead] = useState({
    id: "",
    qualified: false,
    notQualified: false,
  });
  const size = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter.pagSize
  );
  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;
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

  const handleReset = () => {
    setShowLoader(true); // Set loader to true
    GetMidseniorSourcing(CandidateMidLevel)
      .then((data) => {
        console.log(data, "GetMidseniorSourcing");
        if (data.code == 200) {
          setCandidateMidsourcingllist(data.data.content);
          setsourcingpageCount(data.data.totalPages);
        }
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  useEffect(() => {
    console.log(CandidateMidLevel);
  }, [CandidateMidLevel]);

  useEffect(() => {
    GetMidseniorSourcing(CandidateMidLevel).then((data) => {
      console.log(data, "GetMidseniorSourcing");
      if (data.code == 200) {
        setCandidateMidsourcingllist(data.data.content);
        setsourcingpageCount(data.data.totalPages);
      } else {
        setCandidateMidsourcingllist([]);
        setsourcingpageCount(1);
      }
    });
  }, [CandidateMidLevel]);

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
      resumeLink: resumeLink,
      mobileNumber: mobileNumber,
      emailId: emailId,
      firstName: firstName,
      lastName: lastName,
      appliedJobrole: appliedJobrole,
      jobrole: jobrole,
      experienceInYears: experienceInYears,
      experienceInMonths: experienceInMonths,
      skills: skills,
      currentLocation: currentLocation,
      preferredJobLocation: preferredJobLocation,
      adminPreferredCompany: adminPreferredCompany,
      // Add other fields as needed
    };
  }

  function candidatePagination(event, page) {
    const currentPage = page - 1;
    console.log(currentPage, "current page");
    Dispatch(
      CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingFilterPage(
        currentPage
      )
    );
  }
  function candidateSize(size) {
    Dispatch(
      CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingFilterSize(
        size
      )
    );
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
  const closenewlead = () => {
    setSourceprefillData(false);
    setNewLead(false);
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
    const link = currentMetaDetail.resumeLink;
    console.log(link, "currentMetaDetail.resumelink");
    if (link !== null) {
      setShowConfirmQualifiedPopup(true);
    } else {
      alert("Please upload a resume.");
      setSourceprefillData(true);
      setShowConfirmQualifiedPopup(false);
      return;
    }
  }
  // const Leadid = ;
  console.log(currentLeadDetail, "currentLeadDetail");

  const handleIsQualified = (status) => {
    console.log(currentLeadDetail.id, "jhsjhhiidddd");

    if (status === "notQualified") {
      setPutcandidateLead({
        id: currentLeadDetail.id,
        qualified: false,
        notQualified: true,
      });
    } else {
      setPutcandidateLead((prev) => ({
        ...prev,
        id: currentLeadDetail.id,
        qualified: true,
        notQualified: false,
      }));
    }
  };

  function ConfirmFormSubmit() {
    if (putCandidateLead.id) {
      // Check if the resume link is not empty
      setEnableSubmit(true);
      // putCandidateLead.notes = CanputLead.notes;
      PutMidsoucingQualifyMail(putCandidateLead).then((data) => {
        console.log(data, "senior");
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);

        GetMidseniorSourcing(CandidateMidLevel).then((data) => {
          console.log(data, "GetMidseniorSourcing");
          if (data.code === 200) {
            setCandidateMidsourcingllist(data.data.content);
            setsourcingpageCount(data.data.totalPages);
          } else {
            setCandidateMidsourcingllist([]);
            setsourcingpageCount(1);
          }
        });
        setEnableSubmit(false);
      });
    }
  }
  function ConfirmNotQualifyFormSubmit() {
    if (putCandidateLead.id) {
      if (!CanputLead.notes.trim()) {
        alert("Notes cannot be empty.");
        return;
      }
      setEnableSubmit(true);
      putCandidateLead.notes = CanputLead.notes;
      PutMidsoucingQualifyMail(putCandidateLead).then((data) => {
        console.log(data, "senior");
        setShowConfirmPopup(false);
        setShowConfirmQualifiedPopup(false);

        GetMidseniorSourcing(CandidateMidLevel).then((data) => {
          console.log(data, "GetMidseniorSourcing");
          if (data.code === 200) {
            setCandidateMidsourcingllist(data.data.content);
            setsourcingpageCount(data.data.totalPages);
          } else {
            setCandidateMidsourcingllist([]);
            setsourcingpageCount(1);
          }
        });
        setEnableSubmit(false);
      });
    }
  }
  const OnReloadingPage = (e) => {
    setNewLead(false);
    setSourceprefillData(false);
    GetMidseniorSourcing(CandidateMidLevel).then((data) => {
      console.log(data, "GetMidseniorSourcing");
      if (data.code == 200) {
        setCandidateMidsourcingllist(data.data.content);
        setsourcingpageCount(data.data.totalPages);
      } else {
        setCandidateMidsourcingllist([]);
        setsourcingpageCount(1);
      }
    });
  };
  const autoclose = () => {
    setNewLead(false);
  };
  const onOpen = () => {
    // setNewLead(false);
    // setTimeout(() => {
    setNewLead(true);
    // }, 1000);
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
              <MidSeniorsourcingFilter />
            </div>
            <div>
              {/* <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/" }}
              > */}
              <button
                className={`ms-2 mt-1 ${canLeadStyle.NewLead}`}
                onClick={() => setNewLead(true)}
              >
                <AiOutlineUserAdd /> Add New Source
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
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Mobile&nbsp;Number</StyledTableCell>
                      <StyledTableCell>Email&nbsp;ID</StyledTableCell>
                      {/* <StyledTableCell>Experience</StyledTableCell> */}
                      <StyledTableCell>
                        {" "}
                        Sourced&nbsp;for&nbsp;Position
                      </StyledTableCell>
                      {/* <StyledTableCell>Qualification</StyledTableCell> */}
                      <StyledTableCell>Preferred&nbsp;Location</StyledTableCell>
                      {isSuperAdmin && (
                        <StyledTableCell>Assigned&nbsp;To</StyledTableCell>
                      )}
                      <StyledTableCell>Created&nbsp;on</StyledTableCell>
                      <StyledTableCell>Resume</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidateMidsourcingllist.length > 0 ? (
                      <>
                        {candidateMidsourcingllist.map((candidate, i) => {
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
                                {/* <StyledTableCell title={candidate.emailId}>
                                  {candidate.experienceInYears !== ""
                                    ? candidate.experienceInYears +
                                      " " +
                                      "years" +
                                      " " +
                                      (candidate.experienceInMonths !== ""
                                        ? candidate.experienceInMonths +
                                          " " +
                                          "months"
                                        : "")
                                    : "-"}
                                </StyledTableCell> */}
                                <StyledTableCell
                                  title={candidate.appliedJobrole}
                                >
                                  {candidate.appliedJobrole
                                    ? textTruncate(
                                        capitalizeWords(
                                          candidate.appliedJobrole
                                        ),
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
                                  title={candidate.preferredJobLocation}
                                >
                                  {candidate.preferredJobLocation
                                    ? textTruncate(
                                        capitalizeWords(
                                          candidate.preferredJobLocation
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
                                            {candidate.qualified === true && (
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
                                            )}

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
                                            {!(
                                              candidate.notQualified === true ||
                                              candidate.qualified === true
                                            ) && (
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
                                            )}

                                            {!(
                                              candidate.notQualified === true ||
                                              candidate.qualified === true
                                            ) && (
                                              <li
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
                                              </li>
                                            )}

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
                                                className={`${canLeadStyle.Register}`}
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
                            <CandidateMidSourcingView
                              onClose={() => {
                                setIsPopupOpenCanLead(false);
                              }}
                              data={candidateMidsourcingllist.filter(
                                (c) => c.id === currentLeadDetail.id
                              )}
                              // onAssignChange={() => {
                              //   ReloadList();
                              // }}
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
                  count={sourcingpageCount}
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
                      onClick={ConfirmNotQualifyFormSubmit}
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
        {newLead && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <JobApplicationForm
                  onclose={closenewlead}
                  reload={OnReloadingPage}
                />
              }
            />
          </MyModal>
        )}
        {sourceprefillData && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <JobApplicationForm
                  onclose={closenewlead}
                  // prefillData={currentMetaDetail.mobileNumber}
                  prefillData={prefillData}
                  reload={OnReloadingPage}
                />
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
      </div>
    </>
  );
}

export default MidLevelSourcing;
