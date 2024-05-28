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
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { tableCellClasses } from "@mui/material/TableCell";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import { styled } from "@mui/material/styles";
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
  PostmoveToShortlisted,
  GetDownloadReport,
  PutCandidateSenior,
  UploadMidSeniorResumes,
  EmailUpdateInMidSenior,
  SendEmailCandidate,
} from "../../../apiServices";
import { useDispatch, useSelector } from "react-redux";
import { MyModal, capitalizeWords, textTruncate } from "../../../utility";
import {
  CandidateMidLevelActions,
  showHideDetailsActions,
} from "../../../redux-store/store";
import MidLevelFilter from "./MidLevelFilter";
import ModalContainer from "../../../components/modal_popup";
import CandidateMidLevelDetailsview from "../../../components/ModalPopups/CandidateDetails/CandidateMidLevelSenior";
import SuccessTick from "../../../components/success_tick";
import resume from "../../../assets/images/resume.png";
import companylogo from "../../../assets/images/Company-Logo.png";
import CandidateEvaluationSummaryF from "../../../components/mid-senior-report-genration-form/CandidateEvaluationSummaryF";
import TimeLineAddNotes from "./TimeLineAddNotes";
import { MdOutlineContentCopy } from "react-icons/md";
import Midelevelseniorpostform from "./Midelevelseniorpostform";
import { base_url_node } from "../../../App";
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

function MidLevelSeniorScreening() {
  const [candidateMidLevellist, setCandidateMidLevellist] = useState([]);
  const [pageCount, setpageCount] = useState();
  const [isTooltipOpen, setTooltipOpen] = useState({});
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openShortList, setopenShortList] = useState(false);
  const [openCreateReport, setopenCreateReport] = useState(false);
  const [successing, setSuccessing] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [adminSignaturenot, setadminSignaturenot] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailShowSuccess, setEmailShowSuccess] = useState({
    candidate: false,
    shortList: false,
  });
  const [CanputLead, setCanputLead] = useState(null);
  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  console.log(currentMetaDetail);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [currentLeadDetail, setCurrentLeadDetail] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSrc, setUploadedFileSrc] = useState(resume);
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [emailAdd, setEmailAdd] = useState("");
  const [CcEmailId, setCcEmailId] = useState();
  const [sendReportCandidate, setsendReportCandidate] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [isPopupOpenCanLead, setIsPopupOpenCanLead] = useState(false);
  const adminID = localStorage.getItem("adminID");
  const [sourceprefillData, setSourceprefillData] = useState(false);
  const Dispatch = useDispatch();
  const CandidateMidLevel = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter
  );
  const page = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter.page
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
    shortlisted: false,
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

    // Fetch data after resetting
    GetCanMidLevellist(CandidateMidLevel, 1)
      .then((data) => {
        setCandidateMidLevellist(data.data.content);
        setpageCount(data.data.totalPages);
        setTotalCount(data.data.totalElements);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    setShowLoader(true);

    GetCanMidLevellist(CandidateMidLevel, 1)
      .then((data) => {
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

  const handleConfirm = () => {
    setSuccessing(true);
    PostmoveToShortlisted(currentLeadDetail.id).then((Data) => {
      console.log(Data, "sending");
      setTimeout(() => {
        setSuccessing(false);
      }, 3000);
      GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
        console.log(data, "datata");
        setCandidateMidLevellist(data.data.content);
        setpageCount(data.data.totalPages);
        setTotalCount(data.data.totalElements);
      });
    });
    setopenShortList(false);
  };
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

  const handleIsQualified = (status) => {
    if (status === "notQualified") {
      setPutcandidateLead({
        canLeadId: currentLeadDetail.id,
        qualified: false,
        shortlisted: false,
        notQualified: true,
      });
    } else if (status === "qualified") {
      setPutcandidateLead((prev) => ({
        ...prev,
        canLeadId: currentLeadDetail.id,
        qualified: true,
        shortlisted: false,
        notQualified: false,
      }));
    } else {
      setPutcandidateLead((prev) => ({
        ...prev,
        canLeadId: currentLeadDetail.id,
        qualified: true,
        shortlisted: true,
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

        GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFileName(file.name);
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedFileSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      // Handle error, show message, etc.
      console.error("No file selected.");
      return;
    }

    try {
      const response = await UploadMidSeniorResumes(
        selectedFile,
        currentMetaDetail.mobileNumber
      );
      console.log(response);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      // Handle error, show message, etc.
      console.error("Error uploading file:", error.message);
    }
  };
  const handleUploadButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    EmailUpdateInMidSenior(emailAdd, currentMetaDetail.mobileNumber).then(
      (datas) => {
        console.log(datas, "data fot Update the senior");
        setEmailShowSuccess((prev) => ({
          ...prev,
          candidate: true,
        }));

        setTimeout(() => {
          setEmailShowSuccess((prev) => ({
            ...prev,
            candidate: false,
          }));
        }, 3000);
        if (datas.statuscode === 200) {
          GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
            setCandidateMidLevellist(data.data.content);
          });
          SendEmailCandidate(currentMetaDetail.id, emailAdd, CcEmailId)
            .then((data) => {
              if (data.statusCode === 400) {
                setadminSignaturenot(true);
                return;
              }
              console.log(data, "data");
              setEmailShowSuccess((prev) => ({
                ...prev,
                candidate: true,
              }));
              setTimeout(() => {
                setEmailShowSuccess((prev) => ({
                  ...prev,
                  candidate: false,
                }));
              }, 2000);
              setsendReportCandidate(false);
              GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
                console.log(data);
                setCandidateMidLevellist(data.data.content);
              });
            })
            .finally(() => {
              setLoading(false);
              setEmailAdd("");
              setsendReportCandidate(false);
            });
        }

        // GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
        //   setCandidateMidLevellist(data.data.content);
        // });
      }
    );
  };
  const handleEmailSubmitShortlist = (e) => {
    e.preventDefault();
    EmailUpdateInMidSenior(emailAdd, currentMetaDetail.mobileNumber).then(
      (datas) => {
        console.log(datas, "data fot Update the senior");
        setEmailShowSuccess((prev) => ({
          ...prev,
          shortList: true,
        }));

        setTimeout(() => {
          setEmailShowSuccess((prev) => ({
            ...prev,
            shortList: false,
          }));
        }, 3000);
        if (datas.statuscode === 200) {
          GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
            setCandidateMidLevellist(data.data.content);
          });
          PostmoveToShortlisted(currentLeadDetail.id)
            .then((data) => {
              console.log(data, "data");
              setEmailShowSuccess((prev) => ({
                ...prev,
                shortList: true,
              }));
              setTimeout(() => {
                setEmailShowSuccess((prev) => ({
                  ...prev,
                  shortList: false,
                }));
              }, 2000);
              setsendReportCandidate(false);
              GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
                console.log(data);
                setCandidateMidLevellist(data.data.content);
              });
            })
            .finally(() => {
              setLoading(false);
              setEmailAdd("");
              setsendReportCandidate(false);
            });
        }

        // GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
        //   setCandidateMidLevellist(data.data.content);
        // });
      }
    );
  };

  const sendtoCandidate = (e) => {
    e.preventDefault();
    // const ccEmailArray = CcEmailId.split(",").map((email) => email.trim());
    if (!confirmClicked && !loading) {
      setConfirmClicked(true);
      setLoading(true);

      // Simulate API call with a delay
      setTimeout(() => {
        SendEmailCandidate(
          currentMetaDetail.id,
          currentMetaDetail.emailId,
          CcEmailId
        )
          .then((data) => {
            console.log(data, "data");
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);
            setsendReportCandidate(false);
            setConfirmClicked(false);
            GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
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
  const ResetPage = (e) => {
    GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
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
    GetCanMidLevellist(CandidateMidLevel, 1).then((data) => {
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
          </div>
          <div className={`${canLeadStyle.filterAdduser}`}>
            {/* <div className="mt-1 me-2 ">Total Count : {totalCount}</div> */}

            <div>
              <MidLevelFilter />
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
                      <StyledTableCell>Mobile Number</StyledTableCell>
                      {/* <StyledTableCell>Whatsapp Number</StyledTableCell> */}
                      <StyledTableCell>Job Catagory</StyledTableCell>
                      {/* <StyledTableCell>Qualification</StyledTableCell> */}
                      <StyledTableCell>Job Location</StyledTableCell>
                      {isSuperAdmin && (
                        <StyledTableCell>Assigned To</StyledTableCell>
                      )}
                      <StyledTableCell>Email Id</StyledTableCell>
                      <StyledTableCell>Screening on</StyledTableCell>
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
                                  {(candidate.screeningDate != null
                                    ? candidate.screeningDate
                                    : "Not capture") +
                                    " " +
                                    (candidate.screeningTime != null
                                      ? candidate.screeningTime
                                      : " ")}
                                  {/* <TimeAgoPlusFiveHours
                                    dateValue={
                                      candidate.screeningDate +
                                      " " +
                                      candidate.screeningTime
                                    }
                                  /> */}
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
                                            {candidate.shortlisted === true && (
                                              <div
                                                className={`${FBstyle.Green_wrp}`}
                                              >
                                                <input
                                                  type="radio"
                                                  name={`status_${candidate.id}`}
                                                  checked={
                                                    candidate.shortlisted
                                                  }
                                                  id={`shortlisted_${candidate.id}`}
                                                />
                                                <label
                                                  htmlFor={`shortlisted_${candidate.id}`}
                                                >
                                                  Shortlisted
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
                                            <li
                                              onClick={() =>
                                                setopenCreateReport(true)
                                              }
                                              style={{ cursor: "pointer" }}
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
                                                  {candidate.report === false
                                                    ? "Create Report"
                                                    : "Update Report"}
                                                </label>
                                              </a>
                                            </li>
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
                                                            color: "#16617b",
                                                            fontSize: 20,
                                                          }}
                                                        />{" "}
                                                        Send to Candidate
                                                      </label>
                                                    </a>
                                                  </div>
                                                </li>
                                                <li
                                                  onClick={() =>
                                                    setopenShortList(true)
                                                  }
                                                  style={{ cursor: "pointer" }}
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
                                                          color: "#f6cd62",
                                                          fontSize: 20,
                                                        }}
                                                      />{" "}
                                                      Move to Resource
                                                    </label>
                                                  </a>
                                                </li>
                                              </>
                                            )}
                                            {/* {candidate.report === false && ( */}
                                            {candidate.notQualified === false &&
                                              candidate.shortlisted ===
                                                false && (
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
                                            {candidate.shortlisted === false &&
                                              candidate.notQualified ===
                                                false && (
                                                <li
                                                  onClick={(event) => {
                                                    handleConfirmationOpen(
                                                      true
                                                    );
                                                    handleIsQualified(
                                                      "shortlisted"
                                                    );
                                                  }}
                                                >
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    // onClick={() =>
                                                    //   handleButtonClick(
                                                    //     "shortlisted"
                                                    //   )
                                                    // }
                                                  >
                                                    <div
                                                      className={`${FBstyle.select_wrp}`}
                                                    >
                                                      <input
                                                        // ref={inputRef.shortlisted}
                                                        type="radio"
                                                        checked={
                                                          candidate.shortlisted
                                                        }
                                                        name={`status_${candidate.id}`}
                                                        id={`shortlisted_${candidate.id}`}
                                                      />
                                                      <label
                                                        htmlFor={`shortlisted_${candidate.id}`}
                                                      >
                                                        <GoDotFill
                                                          style={{
                                                            color: "#169c50",
                                                            fontSize: 20,
                                                          }}
                                                        />{" "}
                                                        Shortlisted
                                                      </label>
                                                    </div>
                                                  </a>
                                                </li>
                                              )}
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
        {isModalOpen && (
          <MyModal>
            <ModalContainer
              zIndex={2000}
              childComponent={
                <div style={{ width: "300px" }}>
                  <p className="text-center">
                    <b>Upload Resume</b>
                  </p>
                  <div className="text-center">
                    <label htmlFor="fileInput">
                      {uploadedFileName ? (
                        <img
                          src={uploadedFileSrc}
                          alt="Upload Icon"
                          style={{
                            cursor: "pointer",
                            width: "100px", // Adjust the width as needed
                            height: "100px", // Adjust the height as needed
                          }}
                        />
                      ) : (
                        <>
                          <img
                            src={companylogo}
                            alt="Upload Icon"
                            style={{
                              cursor: "pointer",
                              width: "100px", // Adjust the width as needed
                              height: "100px", // Adjust the height as needed
                            }}
                          />
                          {/* Upload file */}
                        </>
                      )}
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {uploadedFileName && (
                      <p>Uploaded File: {uploadedFileName}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-1 mt-3">
                    <Button
                      variant="outlined"
                      // color="red"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button variant="outlined" onClick={handleUpload}>
                      Submit
                    </Button>
                  </div>
                </div>
              }
            />
          </MyModal>
        )}
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
                    <div className="text-center mb-3">Status update</div>
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
                      Submit
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
        {openShortList && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  {currentMetaDetail.emailId != null &&
                  currentMetaDetail.emailId != "" ? (
                    <div style={{ width: "400px" }}>
                      <div style={{ marginBottom: "20px" }}>
                        Are you sure you want to Resource{" "}
                        <b>
                          {currentMetaDetail.firstName}{" "}
                          {currentMetaDetail.lastName != null
                            ? currentMetaDetail.lastName
                            : ""}
                        </b>{" "}
                        ?
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => setopenShortList(false)}
                        >
                          Close
                        </button>
                        <button
                          className="btn text-light"
                          style={{ backgroundColor: "#169c50" }}
                          onClick={handleConfirm}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: "400px" }}>
                      <p>Please update Email id</p>
                      <form onSubmit={handleEmailSubmitShortlist}>
                        <TextField
                          id="outlined-basic"
                          label="Email Id"
                          fullWidth
                          value={emailAdd}
                          variant="outlined"
                          required
                          type="email"
                          onChange={(e) => setEmailAdd(e.target.value)}
                        />
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-danger px-2"
                            onClick={() => {
                              setopenShortList(false);
                              setEmailAdd("");
                            }}
                          >
                            {" "}
                            Close
                          </button>
                          <button
                            style={{ backgroundColor: "#169c50" }}
                            className="btn px-2 text-light"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              }
            />
          </MyModal>
        )}

        {openCreateReport && (
          <div>
            <CandidateEvaluationSummaryF
              candidate={currentMetaDetail.id}
              // close={() => setopenCreateReport(false)}
              close={() => {
                setTimeout(() => {
                  setopenCreateReport(false);
                  handleReset();
                }, 2000);
              }}
            />
          </div>
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
        {successing && (
          <MyModal>
            <ModalContainer
              zIndex="1002"
              childComponent={
                <>
                  <SuccessTick HeadText="Moved to Resource" />
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
        {emailShowSuccess.candidate && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <SuccessTick HeadText="Successfully Email Update and Report Send" />
              }
            />
          </MyModal>
        )}
        {emailShowSuccess.shortList && (
          <MyModal>
            <ModalContainer
              zIndex={5000}
              childComponent={
                <SuccessTick HeadText="Successfully Email Update and Moved To Shorlist" />
              }
            />
          </MyModal>
        )}
        {sendReportCandidate && (
          <MyModal>
            <ModalContainer
              childComponent={
                currentMetaDetail.emailId != null &&
                currentMetaDetail.emailId != "" ? (
                  <>
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
                            value={CcEmailId}
                            onChange={(e) => setCcEmailId(e.target.value)}
                            fullWidth
                            // required
                            type=""
                            margin="normal"
                          />
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setsendReportCandidate(false);
                              setConfirmClicked(true);
                              setCcEmailId("");
                              setLoading(false);
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
                  </>
                ) : (
                  <>
                    <div style={{ width: "300px" }}>
                      <p>Please update Email id</p>
                      <form onSubmit={handleSubmitEmail}>
                        <TextField
                          id="outlined-basic"
                          label="Email Id"
                          fullWidth
                          value={emailAdd}
                          variant="outlined"
                          required
                          type="email"
                          onChange={(e) => setEmailAdd(e.target.value)}
                        />
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-danger px-2"
                            onClick={() => {
                              setsendReportCandidate(false);
                              setEmailAdd("");
                            }}
                          >
                            {" "}
                            Close
                          </button>
                          <button
                            style={{ backgroundColor: "#169c50" }}
                            className="btn px-2 text-light"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )
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

export default MidLevelSeniorScreening;
