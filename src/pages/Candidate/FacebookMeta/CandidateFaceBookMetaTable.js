/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PostCandidateFBmeta,
  PutFBmetaIsQualified,
  updateMetaSeenStatus,
  PostFollowup,
  GetFollowUpEvents,
  GetAllsdminDetails,
  GetCandidateQualifyDetials,
  PutCandidateType,
  PutExperienceStatus,
} from "../../../apiServices";
import { showHideDetailsActions } from "../../../redux-store/store";
import { DDMMYYYY_formate, MyModal, textTruncate } from "../../../utility";
import SuccessTick from "../../../components/success_tick";
import FBstyle from "./candidateFacebookMeta.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../../components/candidate-qualify-forms/CommonQualify.module.scss";
import ModalContainer from "../../../components/modal_popup";
import { LuRefreshCcw } from "react-icons/lu";
import TimelineFacebookMeta from "./TimelineFacebookMeta";
import FBinterviewFilter from "./FBMetaLeadFilter";
import accordionstyle from "../CandidateQualifyForm/QualifyForm.module.scss";
import {
  Box,
  Button,
  FormControl,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { FBmetaLeadsSliceActions } from "../../../redux-store/store";
import { GoDotFill } from "react-icons/go";
import Table from "@mui/material/Table";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import QualifyForm from "./components/qualifyForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import canLeadStyle from "../CandidateLeadTable/candidateLead.module.scss";
import CandidateFBLeadDetailsview from "../../../components/ModalPopups/CandidateDetails/FBLeadDetailsview";
import YourComponent from "../../../components/candidate-qualify-forms/refrense";
import Registered from "../../../assets/images/registeredR.png";
import LeadL from "../../../assets/images/LeadL.png";
import AddNotesFBLead from "./PostCandidateNotes";
import ExperienceQualify from "../../../components/candidate-qualify-forms/ExperienceQualify";
import ExperienceWithNoExperience from "../../../components/candidate-qualify-forms/ExperienceWithNoExperience";
import QualifyFresherform from "../CandidateQualifyForm/FresherForm";
import ExperinenceWorkingform from "../CandidateQualifyForm/ExperinenceWorkingform";

import ExperienceForm from "../CandidateQualifyForm/ExperienceForm";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
    // Adjust the width as needed
    // overflowX: "auto",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    borderBottom: "1px solid #545454f0",
    // width: "300px", // Adjust the width as needed
    // overflowX: "auto",
    "@media (max-width: 992px)": {},
  },
}));
function CandidateFaceBookMetaTable() {
  const [CandidateFBList, setCandidateFBList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [openform, setopenform] = useState(false);
  const [pagesCount, setPagesCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
  });
  const [followupError, setFollowupError] = useState({
    dateTime: false,
    addNotes: false,
    selectEvent: false,
  });
  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  console.log(currentMetaDetail);
  // const mobileNumber = currentMetaDetail.mobileNumber;
  // console.log(mobileNumber);
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [followupopen, setFollowupOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [Follownotes, setFollownotes] = useState("");
  const [dateTimeError, setDateTimeError] = useState("");
  const [notesError, setNotesError] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [openCreateReport, setOpenCreateReport] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessForm, setshowSuccessForm] = useState(false);
  const [isFresher, setIsFresher] = useState(null);
  const [showInitialRadios, setShowInitialRadios] = useState(true);
  const [showCurrentlyWorkingComponent, setShowCurrentlyWorkingComponent] =
    useState(false);
  const [showNotWorkingComponent, setShowNotWorkingComponent] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [showAlreadyRegister, setshowAlreadyRegister] = useState(false);

  const FBmetaListFilter = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter
  );
  const unseenCount = useSelector(
    (state) => state.unseenCountDetails.candidate
  );
  const size = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter.size
  );
  const refreshRedDot = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter.refreshRedDot
  );

  const [showRedDot, setShowRedDot] = useState(refreshRedDot);
  const [OpenConfirmation, setopenConfirmation] = useState(false);
  const [assignAdminto, setAssignAdminto] = useState({
    metaLeadId: "",
    adminId: "",
  });
  const [putFBLead, setFBputLead] = useState({
    id: "",
    qualified: false,
    notQualified: false,
    notAttend: false,
    followUp: false,
    notes: "",
  });
  useEffect(() => {
    // Your side effects or state updates go here
  }, [putFBLead]);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    console.log(FBmetaListFilter, "interview filter");
  }, [FBmetaListFilter]);

  const [leadDetails, setLeadDetails] = useState({
    show: false,
    date: {},
  });

  const ShowTimeline = useSelector(
    (state) => state.showHideDetails.candidateLead.leadTimeLine
  );

  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;
  const [adminName, setAdminName] = useState([]);
  const [adminid, setAdminId] = useState([]);
  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");

      const activeAdmins = data.filter((item) => !item.Deactived);

      const adminNames = activeAdmins.map((item) => item.userName);
      const adminIds = activeAdmins.map((item) => item.id);
      console.log(adminNames);
      setAdminName(adminNames);
      setAdminId(adminIds);
    });
  }, []);
  useEffect(() => {
    // to set super admin id as 0
    let id = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterAdminId(id));
  }, []);

  function handleCloseNotes() {
    setShowConfirmPopup(false);
    // setIsNotesEmpty(false);
  }

  const handleRadioButtonChange = (event) => {
    const { value } = event.target;
    setIsFresher(value === "Fresher");
    setShowInitialRadios(value !== "Experienced");
    setShowCurrentlyWorkingComponent(false);
    setShowNotWorkingComponent(false);
  };

  const handleCurrentlyWorkingChange = (event) => {
    const { value } = event.target;
    if (value === "Currently Working") {
      setShowCurrentlyWorkingComponent(true);
      setShowNotWorkingComponent(false);
    } else if (value === "Currently Not Working") {
      setShowNotWorkingComponent(true);
      setShowCurrentlyWorkingComponent(false);
    }
  };

  const handleOpenModal = () => {
    setOpenCreateReport(true);
  };

  const handleCloseModal = () => {
    setOpenCreateReport(false);
  };
  const hanndleClose = () => {
    setIsFresher(false);
    setShowCurrentlyWorkingComponent(false);
    setShowNotWorkingComponent(false);
    setOpenCreateReport(false);
  };

  const handleClose = () => {
    setIsFresher(false);
    // setShowCurrentlyWorkingComponent(false);
    // setShowNotWorkingComponent(false);
  };

  const openFollowup = () => {
    setFollowupOpen(true);
  };

  // const closeFollowup = () => {
  //   setFollowupOpen(false);
  //   PostCandidateFBmeta(FBmetaListFilter).then((data) => {
  //     setCandidateFBList(data.metaLeadsList);
  //     setPagesCount((prev) => ({
  //       ...prev,
  //       totalPages: Math.ceil(data.totalCount / size), // Assuming size is 10
  //     }));
  //   });
  // };
  const closeFollowup = () => {
    setFollowupOpen(false);
    setFollowupError((prev) => ({
      ...prev,
      dateTime: false,
      addNotes: false,
      selectEvent: false,
    }));
    setFormattedDate("");
    setFollownotes("");
    setSelectedValue("");
    PostCandidateFBmeta(FBmetaListFilter).then((data) => {
      setCandidateFBList(data.metaLeadsList);
      setPagesCount((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.totalCount / size), // Assuming size is 10
      }));
    });
  };

  const handleFollowSubmit = async () => {
    if (!formattedDate) {
      setFollowupError((prev) => ({
        ...prev,
        dateTime: true,
      }));
      return;
    } else if (Follownotes.trim() === "") {
      setFollowupError((prev) => ({
        ...prev,
        addNotes: true,
      }));
      return;
    } else {
      try {
        const formattedDateTime = dayjs(dateTime);
        const formattedDate = formattedDateTime.format("YYYY-MM-DD");
        const followUpTime = formattedDateTime.format("hh:mm A");

        console.log("Formatted Date:", formattedDate);
        console.log("Follow-Up Time:", followUpTime);

        await PostFollowup(
          currentMetaDetail.id,
          null,
          null,
          formattedDate,
          followUpTime,
          Follownotes,
          "Facebook meta lead"
        );

        setFormattedDate("");
        setSelectedValue("");
        setFollownotes("");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmPopup(false);
        }, 3000);
        closeFollowup();
      } catch (error) {
        console.error("There was a problem with the API call:", error);
      }
    }
  };

  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    // setCandidateFBList({
    //   gender: null,
    //   mobileNumber: -1,
    //   assignTo: null,
    //   status: null,
    //   industry: null,
    //   jobCategory: null,
    //   qualification: null,
    //   candidateType: null,
    //   skills: null,
    //   prefLocation: null,
    //   eligibility: null,
    //   passed_out_year: -1,
    //   specification: null,
    //   maxExperience: -1,
    //   experience: -1,
    //   endDate: null,
    //   createdTime: null,
    //   page: 1,
    //   size: 10,
    // });

    // Fetch data after resetting
    PostCandidateFBmeta(FBmetaListFilter)
      .then((data) => {
        setCandidateFBList(data.metaLeadsList);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size), // Assuming size is 10
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  const handleReloadpage = () => {
    setShowConfirmPopup(false);
    setShowCurrentlyWorkingComponent(false);
    setShowNotWorkingComponent(false);
    setShowLoader(true);

    PostCandidateFBmeta(FBmetaListFilter)
      .then((data) => {
        setCandidateFBList(data.metaLeadsList);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    // Fetch follow-up events data when component mounts
    async function fetchEventData() {
      try {
        const data = await GetFollowUpEvents();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching follow-up events:", error);
      }
    }

    fetchEventData();
  }, []);

  function ReloadList() {
    PostCandidateFBmeta(FBmetaListFilter).then((data) => {
      console.log(data, "metaLeadsList data");
      setCandidateFBList(data.metaLeadsList);
      setShowLoader(false);
      setPagesCount((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.totalCount / size),
      }));
    });
  }

  useEffect(() => {
    setShowLoader(true);
    ReloadList();
  }, []);

  useEffect(() => {
    setShowLoader(true);

    PostCandidateFBmeta(FBmetaListFilter)
      .then((data) => {
        setCandidateFBList(data.metaLeadsList);
        setTotalCount(data.totalCount);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [FBmetaListFilter]);

  const showLeadDetails = (data, show) => {
    setLeadDetails((prev) => ({ ...prev, data: data, show: show }));
  };
  function capitalizeWords(str) {
    return str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";
  }
  function formatExperience(experience) {
    if (experience) {
      if (experience.toLowerCase() === "fresher") {
        return capitalizeWords(experience);
      } else {
        // Assuming experience is a number representing the years of experience
        return ` ${experience} year${experience > 1 ? "s" : ""}(s)`;
      }
    } else {
      return "";
    }
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

  // const handleCheckboxClick = () => {
  //   // event.stopPropagation();
  //   setIsChecked(!isChecked);
  // };
  const handleIsQualified = (status) => {
    if (status === "notQualified") {
      setFBputLead((prev) => ({
        ...prev,
        id: currentMetaDetail.id,
        qualified: false,
        notQualified: true,
        notAttend: false,
      }));
    } else if (status === "qualified") {
      setFBputLead((prev) => ({
        ...prev,
        id: currentMetaDetail.id,
        qualified: true,
        notQualified: false,
        notAttend: false,
      }));
    } else if (status === "followup") {
      setFBputLead((prev) => ({
        ...prev,
        id: currentMetaDetail.id,
        qualified: false,
        notQualified: false,
        notAttend: false,
        followup: true,
      }));
    } else {
      setFBputLead((prev) => ({
        ...prev,
        id: currentMetaDetail.id,
        qualified: false,
        notQualified: false,
        notAttend: true,
      }));
    }
    //   setSelectshow(false);

    // const selectedCandidate = CandidateFBList.find(
    //   (candidate) => candidate.facebookMetaLead.id === id
    // );
    // if (selectedCandidate) {
    //   setContactPersonName(selectedCandidate.facebookMetaLead.candidateName);
    // }
  };
  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }
  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
    GetCandidateQualifyDetials(currentMetaDetail.mobileNumber)
      .then((data) => {
        console.log(data, "dataAAAAAAAAAAAAAAAAAAAAAAAAA");
        if (data && data.canLeadDetails) {
          setSelectedOption(
            data.canLeadDetails?.experienced === true ? "experience" : "fresher"
          );
        } else {
          console.error("CanLeadDetails not available in data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching candidate details:", error);
      });
  }

  // function ConfirmFormSubmit(notes) {
  //   setShowLoader(true);
  //   if (putFBLead.id) {
  //     PutFBmetaIsQualified(putFBLead, notes)
  //       .then(() => {
  //         setShowConfirmPopup(false);
  //         // console.log(data, "jksldhjsjkshsdtyu");
  //         PostCandidateFBmeta(FBmetaListFilter)
  //           .then((data) => {
  //             console.log(data, "metaLeadsList data");

  //             setCandidateFBList(data.metaLeadsList);
  //             setPagesCount((prev) => ({
  //               ...prev,
  //               totalPages: Math.ceil(data.totalCount / size),
  //             }));
  //           })
  //           .catch((err) => {
  //             alert(`Somthing went wrong, Error ${err}`);
  //           })
  //           .finally(() => {
  //             setShowLoader(false);
  //           });
  //       })
  //       .catch((err) => {
  //         alert(`Somthing went wrong, Error ${err}`);
  //       });
  //   }
  // }
  function ConfirmFormSubmit(notes) {
    setShowLoader(true);
    if (putFBLead.id) {
      PutFBmetaIsQualified(putFBLead, notes)
        .then(() => {
          setShowConfirmPopup(false);
          // console.log(data, "jksldhjsjkshsdtyu");
          PostCandidateFBmeta(FBmetaListFilter)
            .then((data) => {
              console.log(data, "metaLeadsList data");

              setCandidateFBList(data.metaLeadsList);
              setPagesCount((prev) => ({
                ...prev,
                totalPages: Math.ceil(data.totalCount / size),
              }));
            })
            .catch((err) => {
              alert(`Somthing went wrong, Error ${err}`);
            })
            .finally(() => {
              setShowLoader(false);
            });
        })
        .catch((err) => {
          alert(`Somthing went wrong, Error ${err}`);
        });
    }
  }
  function ConfirmQualifyFormSubmit(notes) {
    setShowLoader(true);
    if (putFBLead.id) {
      PostCandidateFBmeta(FBmetaListFilter)
        .then((data) => {
          console.log(data, "metaLeadsList data");

          setCandidateFBList(data.metaLeadsList);
          setPagesCount((prev) => ({
            ...prev,
            totalPages: Math.ceil(data.totalCount / size),
          }));
        })
        .catch((err) => {
          alert(`Something went wrong, Error ${err}`);
        })
        .finally(() => {
          setShowLoader(false);
          setShowConfirmPopup(false);
        });
    }
  }
  const Dispatch = useDispatch();
  function candidatePagination(event, page) {
    const currentPage = page;

    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterPage(currentPage));
  }
  function candidateSize(size) {
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterSize(size));
  }
  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    notAttend: useRef(),
    followup: useRef(),
    // rescheduled: useRef(),
  };
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref.current) {
      ref.current.click();
    }
  };

  const showCity = (val) => {
    if (val !== "i_am_looking_for_job_in_other_city") {
      return capitalizeWords(val);
    } else {
      return "Other";
    }
  };

  function updateNotes(data) {
    setFBputLead((prev) => ({
      ...prev,
      notes: data,
    }));
  }
  function handleTimeLinePopup(value, FbId) {
    Dispatch(
      showHideDetailsActions.setCandidateLeadDetails({
        showTimeLine: value,
        facebookId: FbId,
      })
    );
  }

  function updateSeenStatus(id) {
    if (!isSuperAdmin) {
      updateMetaSeenStatus(id).then(() => {
        ReloadList();
      });
    }
  }

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    let experiencedValue = false;
    if (selectedValue === "experience") {
      experiencedValue = true;
    }

    PutCandidateType(experiencedValue, currentMetaDetail.mobileNumber, "").then(
      (data) => {
        if (
          data.message === "Candidate with this mobile number already exists"
        ) {
          setshowAlreadyRegister(true);
          handleCloseQualifyForm();
          // setShowConfirmPopup(false);
          return;
        }
        console.log(
          "Data Format",
          data,
          "mobile number ",
          currentMetaDetail.mobileNumber
        );
      }
    );
  };

  // useEffect(() => {}, []);
  const [selectCandidateStatus, setselectCandidateStatus] = useState("");
  const handleCandidateStatus = (event) => {
    const selectedValue = event.target.value;
    setselectCandidateStatus(selectedValue);

    let currentlyWorkingValue = false;
    if (selectedValue === "currentlyWorking") {
      currentlyWorkingValue = true;
    }

    PutExperienceStatus(
      currentMetaDetail.mobileNumber,
      currentlyWorkingValue
    ).then((data) => {
      console.log(
        "Data Format",
        data,
        "mobile number ",
        currentMetaDetail.mobileNumber
      );
    });
  };
  function handleCloseQualifyForm() {
    setSelectedOption("");
    setShowConfirmPopup(false);
    PostCandidateFBmeta(FBmetaListFilter)
      .then((data) => {
        console.log(data, "metaLeadsList data");

        setCandidateFBList(data.metaLeadsList);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .catch((err) => {
        alert(`Something went wrong, Error ${err}`);
      })
      .finally(() => {
        setShowLoader(false);
        setShowConfirmPopup(false);
      });
  }
  function handleQualifyFormSubmit() {
    setshowSuccessForm(true);

    setTimeout(() => {
      setshowSuccessForm(false);
      setSelectedOption("");
      setShowConfirmPopup(false);
    }, 1000);
    PostCandidateFBmeta(FBmetaListFilter)
      .then((data) => {
        console.log(data, "metaLeadsList data");

        setCandidateFBList(data.metaLeadsList);
        setPagesCount((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .catch((err) => {
        alert(`Something went wrong, Error ${err}`);
      })
      .finally(() => {
        setShowLoader(false);
        setShowConfirmPopup(false);
      });
  }

  return (
    <>
      <div className={`${FBstyle.FilterHead}`}>
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
          <div className="mt-1 me-2">Total Count : {totalCount}</div>
          <div
            className="p-1 success me-2 mx-2 ms-auto "
            onClick={handleReset}
            // style={{ : "#169C50", color: "white" }}
          >
            {/* <p
              style={{
                backgroundColor: showRedDot ? "red" : "transparent",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
              }}
            ></p> */}
            <LuRefreshCcw style={{ cursor: "pointer" }} />
          </div>
          <FBinterviewFilter />
        </div>
      </div>
      <div>
        <div className={`${FBstyle.Container}`}>
          <div className={`table-responsive-sm ${FBstyle.responsive}`}>
            <div style={{ minWidth: 300 }}>
              <TableContainer className={`${FBstyle.TableContainer}`}>
                <Table stickyHeader aria-label="sticky table" className={``}>
                  <TableHead className={`${FBstyle.Header}`}>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Mobile Number</StyledTableCell>
                      <StyledTableCell>Whatsapp Number</StyledTableCell>
                      <StyledTableCell>Job Category</StyledTableCell>
                      <StyledTableCell>Experience</StyledTableCell>
                      <StyledTableCell>Qualification</StyledTableCell>
                      <StyledTableCell>Preferred City</StyledTableCell>
                      {isSuperAdmin && (
                        <StyledTableCell>Assigned To</StyledTableCell>
                      )}
                      <StyledTableCell>Created on</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {CandidateFBList.length > 0 ? (
                      <>
                        {CandidateFBList.map((candidate, i) => {
                          return (
                            <>
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  border: 10,
                                  borderBottomColor: "black",

                                  backgroundColor:
                                    !candidate.facebookMetaLead.seen &&
                                    "#1cb25f2f",
                                  // display:
                                  //   FBmetaListFilter.notQualified ||
                                  //   candidate.facebookMetaLead.notQualified ==
                                  //     false
                                  //     ? "table-row"
                                  //     : "none",
                                }}
                                onClick={() => {
                                  // alert(candidate.facebookMetaLead.id);

                                  setCurrentMetaDetail(
                                    candidate.facebookMetaLead
                                  );
                                }}
                              >
                                <StyledTableCell
                                  sx={{ color: "#0b7af0", cursor: "pointer" }}
                                  title={
                                    candidate.facebookMetaLead.candidateName &&
                                    candidate.facebookMetaLead.candidateName
                                      .length > 15
                                      ? candidate.facebookMetaLead.candidateName
                                      : null
                                  }
                                  onClick={() => {
                                    copyToClipboard(
                                      candidate.facebookMetaLead.candidateName
                                    );
                                    updateSeenStatus(
                                      candidate.facebookMetaLead.id
                                    );
                                    showLeadDetails(
                                      candidate.facebookMetaLead,
                                      true
                                    );
                                  }}
                                >
                                  <div>
                                    <div className="row">
                                      {/* <div className="col-2">
                                        {candidate.facebookMetaLead
                                          .isCandidate && (
                                          <img src={Registered} alt="R" />
                                        )}
                                        {candidate.facebookMetaLead
                                          .isCanLead && (
                                          <img src={LeadL} alt="L" />
                                        )}{" "}
                                      </div> */}
                                      <div className="col-10">
                                        {candidate.facebookMetaLead
                                          .candidateName != null
                                          ? textTruncate(
                                              capitalizeWords(
                                                candidate.facebookMetaLead
                                                  .candidateName,
                                                15
                                              )
                                            )
                                          : "-"}
                                      </div>
                                    </div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => {
                                    const mobileNumber =
                                      candidate.facebookMetaLead.mobileNumber;
                                    if (mobileNumber) {
                                      const last10Digits =
                                        mobileNumber.slice(-10); // Extract the last 10 digits
                                      copyToClipboard(last10Digits);
                                    }
                                  }}
                                >
                                  {candidate.facebookMetaLead.mobileNumber !=
                                  null
                                    ? String(
                                        candidate.facebookMetaLead.mobileNumber
                                      ).slice(-10)
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => {
                                    const whatsappNumber =
                                      candidate.facebookMetaLead.whatsappNumber;
                                    if (whatsappNumber) {
                                      const last10Digits =
                                        whatsappNumber.slice(-10); // Extract the last 10 digits
                                      copyToClipboard(last10Digits);
                                    }
                                  }}
                                >
                                  {candidate.facebookMetaLead.whatsappNumber !=
                                  null
                                    ? String(
                                        candidate.facebookMetaLead
                                          .whatsappNumber
                                      ).slice(-10)
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell
                                  title={
                                    candidate.facebookMetaLead.jobCategory &&
                                    candidate.facebookMetaLead.jobCategory
                                      .length > 20
                                      ? capitalizeWords(
                                          candidate.facebookMetaLead.jobCategory
                                        )
                                      : null
                                  }
                                  onClick={() => {
                                    copyToClipboard(
                                      candidate.facebookMetaLead.jobCategory
                                    );
                                  }}
                                >
                                  {candidate.facebookMetaLead.jobCategory !=
                                  null
                                    ? textTruncate(
                                        capitalizeWords(
                                          candidate.facebookMetaLead
                                            .jobCategory,
                                          15
                                        )
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {candidate.facebookMetaLead.experience != null
                                    ? formatExperience(
                                        candidate.facebookMetaLead.experience
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell
                                  title={
                                    candidate.facebookMetaLead
                                      .educationQualification &&
                                    candidate.facebookMetaLead
                                      .educationQualification.length > 20
                                      ? candidate.facebookMetaLead
                                          .educationQualification
                                      : null
                                  }
                                  onClick={() => {
                                    copyToClipboard(
                                      candidate.facebookMetaLead
                                        .educationQualification
                                    );
                                  }}
                                >
                                  {candidate.facebookMetaLead
                                    .educationQualification
                                    ? textTruncate(
                                        capitalizeWords(
                                          candidate.facebookMetaLead
                                            .educationQualification,
                                          15
                                        )
                                      )
                                    : "-"}
                                </StyledTableCell>
                                <StyledTableCell

                                // onClick={() => {
                                //   copyToClipboard(
                                //     candidate.facebookMetaLead.preferredLocation
                                //   );
                                // }}
                                >
                                  {candidate.facebookMetaLead
                                    .preferredLocation != null
                                    ? showCity(
                                        candidate.facebookMetaLead
                                          .preferredLocation
                                      )
                                    : "-"}
                                </StyledTableCell>
                                {/* <StyledTableCell>
                                  {" "}
                                  {candidate.facebookMetaLead.area}
                                </StyledTableCell> */}
                                {isSuperAdmin && (
                                  <StyledTableCell align="left">
                                    <>
                                      {
                                        adminName[
                                          adminid.indexOf(
                                            candidate.facebookMetaLead.assignTo
                                          )
                                        ]
                                      }
                                    </>
                                  </StyledTableCell>
                                )}
                                <StyledTableCell>
                                  <DDMMYYYY_formate
                                    dateValue={
                                      candidate.facebookMetaLead.createdTime
                                    }
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className={`${FBstyle.Popper}`}>
                                    <div className={`${FBstyle.StatusStyle}`}>
                                      <div>
                                        <>
                                          {candidate.facebookMetaLead
                                            .notAttend === true &&
                                            candidate.facebookMetaLead
                                              .notQualified === false &&
                                            candidate.facebookMetaLead
                                              .dailyTask === false && (
                                              <>
                                                <div
                                                  className={`${FBstyle.Notattended_wrp}`}
                                                >
                                                  <input
                                                    type="radio"
                                                    checked={
                                                      candidate.facebookMetaLead
                                                        .notAttend
                                                    }
                                                    name={`status_${candidate.facebookMetaLead.id}`}
                                                    id={`notAttend_${candidate.facebookMetaLead.id}`}
                                                  />
                                                  <label
                                                    htmlFor={`notAttend_${candidate.facebookMetaLead.id}`}
                                                  >
                                                    Not Attend
                                                  </label>
                                                </div>
                                              </>
                                            )}
                                          {/* {candidate.facebookMetaLead
                                            .qualified === true && (
                                            <div
                                              className={`${FBstyle.Green_wrp}`}
                                            >
                                              <>
                                                <input
                                                  type="radio"
                                                  name={`status_${candidate.facebookMetaLead.id}`}
                                                  checked={
                                                    candidate.facebookMetaLead
                                                      .qualified
                                                  }
                                                  id={`qualified_${candidate.facebookMetaLead.id}`}
                                                  facebookMetaLead
                                                />

                                                <label
                                                  htmlFor={`qualified_${candidate.facebookMetaLead.id}`}
                                                >
                                                  Qualified
                                                </label>
                                              </>
                                            </div>
                                          )} */}
                                          {candidate.facebookMetaLead
                                            .notQualified === true && (
                                            <div
                                              className={`${FBstyle.chips_wrp}`}
                                            >
                                              {" "}
                                              <input
                                                type="radio"
                                                checked={
                                                  candidate.facebookMetaLead
                                                    .notQualified
                                                }
                                                name={`status_${candidate.facebookMetaLead.id}`}
                                                id={`notQualified_${candidate.facebookMetaLead.id}`}
                                              />
                                              <label
                                                htmlFor={`notQualified_${candidate.facebookMetaLead.id}`}
                                              >
                                                Not Qualified
                                              </label>
                                            </div>
                                          )}
                                          {candidate.facebookMetaLead
                                            .dailyTask === true &&
                                            candidate.facebookMetaLead
                                              .notQualified === false && (
                                              <div
                                                className={`${FBstyle.Followup_wrp}`}
                                              >
                                                {" "}
                                                <input
                                                  type="radio"
                                                  checked={
                                                    candidate.facebookMetaLead
                                                      .dailyTask
                                                  }
                                                  name={`status_${candidate.facebookMetaLead.id}`}
                                                  id={`dailyTask_${candidate.facebookMetaLead.id}`}
                                                />
                                                <label
                                                  htmlFor={`dailyTask_${candidate.facebookMetaLead.id}`}
                                                >
                                                  Follow Up
                                                </label>
                                              </div>
                                            )}
                                          {/* {candidate.facebookMetaLead
                                            .dailyTask === true && (
                                            <div
                                              className={`${FBstyle.Followup_wrp}`}
                                            >
                                              {" "}
                                              <input
                                                type="radio"
                                                checked={
                                                  candidate.facebookMetaLead
                                                    .dailyTask
                                                }
                                                name={`status_${candidate.facebookMetaLead.id}`}
                                                id={`followup_${candidate.facebookMetaLead.id}`}
                                              />
                                              <label
                                                htmlFor={`followup_${candidate.facebookMetaLead.id}`}
                                              >
                                                Follow Up
                                              </label>
                                            </div>
                                          )} */}
                                          {/* {!FBmetaListFilter.notAttend ? (
                                            //  candidate.facebookMetaLead
                                            //     .notQualified === true && (
                                            <div
                                              className={`${FBstyle.chips_wrp}`}
                                            >
                                              {" "}
                                              <input
                                                type="radio"
                                                checked={
                                                  candidate.facebookMetaLead
                                                    .notQualified
                                                }
                                                name={`status_${candidate.facebookMetaLead.id}`}
                                                id={`notQualified_${candidate.facebookMetaLead.id}`}
                                              />
                                              <label
                                                htmlFor={`notQualified_${candidate.facebookMetaLead.id}`}
                                              >
                                                Not Qualified
                                              </label>
                                            </div>
                                          ) : (
                                            // )
                                            ""
                                          )} */}
                                        </>
                                      </div>
                                      {(candidate.facebookMetaLead
                                        .isCandidate == null ||
                                        candidate.facebookMetaLead
                                          .isCandidate === false) &&
                                      (candidate.facebookMetaLead.isCanLead ==
                                        null ||
                                        candidate.facebookMetaLead.isCanLead ===
                                          false) ? (
                                        <>
                                          <div>
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
                                              </button>
                                              <ul
                                                className="dropdown-menu"
                                                style={{ textAlign: "left" }}
                                                // ref={dropdownRef}
                                              >
                                                <li
                                                  onClick={() => {
                                                    handleConfirmationOpen(
                                                      true
                                                    );
                                                    handleIsQualified(
                                                      "notAttend"
                                                    );
                                                  }}
                                                >
                                                  <a className="dropdown-item">
                                                    <div
                                                      className={`${FBstyle.select_wrp}`}
                                                      onClick={() => {
                                                        handleButtonClick(
                                                          "notAttend"
                                                        );
                                                      }}
                                                    >
                                                      <input
                                                        type="radio"
                                                        // ref={inputRef.qualified}
                                                        name={`status_${candidate.facebookMetaLead.id}`}
                                                        checked={
                                                          candidate
                                                            .facebookMetaLead
                                                            .notAttend
                                                        }
                                                        id={`notAttend_${candidate.facebookMetaLead.id}`}
                                                        facebookMetaLead
                                                      />

                                                      <label
                                                        htmlFor={`notAttend_${candidate.facebookMetaLead.id}`}
                                                      >
                                                        {" "}
                                                        <GoDotFill
                                                          style={{
                                                            color: "#fa9e0a",
                                                            fontSize: 20,
                                                          }}
                                                        />
                                                        Not Attend
                                                      </label>
                                                    </div>
                                                  </a>
                                                </li>
                                                <li
                                                  onClick={() => {
                                                    handleConfirmationOpen(
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
                                                      onClick={() => {
                                                        handleButtonClick(
                                                          "qualified"
                                                        );
                                                      }}
                                                    >
                                                      <input
                                                        type="radio"
                                                        // ref={inputRef.qualified}
                                                        name={`status_${candidate.facebookMetaLead.id}`}
                                                        checked={
                                                          candidate
                                                            .facebookMetaLead
                                                            .qualified
                                                        }
                                                        id={`qualified_${candidate.facebookMetaLead.id}`}
                                                        facebookMetaLead
                                                      />

                                                      <label
                                                        htmlFor={`qualified_${candidate.facebookMetaLead.id}`}
                                                      >
                                                        {" "}
                                                        <GoDotFill
                                                          style={{
                                                            color: "#169C50",
                                                            fontSize: 20,
                                                          }}
                                                        />
                                                        Qualify
                                                      </label>
                                                    </div>
                                                  </a>
                                                </li>
                                                <li
                                                  onClick={() => {
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
                                                    onClick={() =>
                                                      handleButtonClick(
                                                        "notQualified"
                                                      )
                                                    }
                                                  >
                                                    <div
                                                      className={`${FBstyle.select_wrp}`}
                                                    >
                                                      <input
                                                        // ref={inputRef.notQualified}
                                                        type="radio"
                                                        checked={
                                                          candidate
                                                            .facebookMetaLead
                                                            .notQualified
                                                        }
                                                        name={`status_${candidate.facebookMetaLead.id}`}
                                                        id={`notQualified_${candidate.facebookMetaLead.id}`}
                                                        // onChange={(event) => {
                                                        //   handleConfirmationOpen(
                                                        //     true
                                                        //   );
                                                        //   handleIsQualified(
                                                        //     "notQualified"
                                                        //   );
                                                        // }}
                                                        // onClick={handleCheckboxClick}
                                                      />
                                                      <label
                                                        htmlFor={`notQualified_${candidate.facebookMetaLead.id}`}
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
                                                <li
                                                  onClick={() => {
                                                    openFollowup(true);
                                                    handleIsQualified(
                                                      "followup"
                                                    );
                                                  }}
                                                >
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() =>
                                                      handleButtonClick(
                                                        "followup"
                                                      )
                                                    }
                                                  >
                                                    <div
                                                      className={`${FBstyle.select_wrp}`}
                                                    >
                                                      <input
                                                        // ref={inputRef.notQualified}
                                                        type="radio"
                                                        checked={
                                                          candidate
                                                            .facebookMetaLead
                                                            .dailyTask
                                                        }
                                                        name={`status_${candidate.facebookMetaLead.id}`}
                                                        id={`followup_${candidate.facebookMetaLead.id}`}
                                                        // onChange={(event) => {
                                                        //   handleConfirmationOpen(
                                                        //     true
                                                        //   );
                                                        //   handleIsQualified(
                                                        //     "notQualified"
                                                        //   );
                                                        // }}
                                                        // onClick={handleCheckboxClick}
                                                      />
                                                      <label
                                                        htmlFor={`followup_${candidate.facebookMetaLead.id}`}
                                                      >
                                                        <GoDotFill
                                                          style={{
                                                            color: "#430CBA",
                                                            fontSize: 20,
                                                          }}
                                                        />{" "}
                                                        Follow Up
                                                      </label>
                                                    </div>
                                                  </a>
                                                </li>
                                                <li>
                                                  <button
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                      setNotesOpen(true);
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
                                                      Add Notes
                                                    </label>
                                                  </button>
                                                </li>

                                                {/* <li>
                                                  <button
                                                    className="dropdown-item"
                                                    onClick={openFollowup}
                                                  >
                                                    <label
                                                      htmlFor={`followp${candidate.facebookMetaLead.id}`}
                                                    >
                                                      <GoDotFill
                                                        style={{
                                                          color: "#430CBA",
                                                          fontSize: 20,
                                                        }}
                                                      />{" "}
                                                      Follow Up
                                                    </label>
                                                  </button>
                                                </li> */}
                                                {/* <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                              >
                                                <div
                                                  className={`${FBstyle.select_wrp}`}
                                                >
                                                  <span
                                                    onClick={() => {
                                                      
                                                      showLeadDetails(
                                                        candidate.facebookMetaLead,
                                                        true
                                                      );
                                                    }}
                                                    className="py-1 d-inline-block"
                                                  >
                                                    {" "}
                                                    <MdReadMore /> More Details
                                                  </span>
                                                </div>
                                              </a>
                                            </li> */}
                                              </ul>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="">
                                            {candidate.facebookMetaLead
                                              .isCandidate && (
                                              <img src={Registered} alt="R" />
                                            )}
                                            {candidate.facebookMetaLead
                                              .isCanLead && (
                                              <img src={LeadL} alt="L" />
                                            )}{" "}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </StyledTableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <p className="text-danger ">Not found</p>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
          <Stack spacing={2}>
            <Pagination
              count={pagesCount.totalPages}
              variant="outlined"
              shape="rounded"
              color="success"
              boundaryCount={1}
              siblingCount={0}
              onChange={candidatePagination}
              size="medium"
            />
          </Stack>
        </div>
      </div>

      {leadDetails.show && (
        <MyModal>
          <ModalContainer
            // zIndex={2}
            childComponent={
              <>
                <CandidateFBLeadDetailsview
                  onClose={() => {
                    setLeadDetails((prev) => ({ ...prev, show: false }));
                  }}
                  data={leadDetails.data}
                  onAssignChange={() => {
                    ReloadList();
                  }}
                />
              </>
            }
          />
        </MyModal>
      )}
      {showConfirmationPopup &&
        (putFBLead.qualified ? (
          <>
            <MyModal>
              <ModalContainer
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
                          <div className={`me-2  ${accordionstyle.radioInput}`}>
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
                          <div className={`me-2  ${accordionstyle.radioInput}`}>
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
                          onClick={handleCloseQualifyForm}
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
                            <QualifyFresherform
                              mobilenumber={currentMetaDetail.mobileNumber.toString()}
                              whatsappNumber={currentMetaDetail.whatsappNumber.toString()}
                              Reloadpage={handleQualifyFormSubmit}
                            />
                            {/* </div> */}
                          </>
                        ) : selectedOption === "experience" ? (
                          // <ExperinenceWorkingform
                          //   mobilenumber={currentMetaDetail.mobileNumber}
                          // />
                          <ExperienceForm
                            mobileNumber={currentMetaDetail.mobileNumber}
                            whatsappNumber={currentMetaDetail.whatsappNumber}
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
        ) : (
          <>
            <MyModal>
              <ModalContainer
                // zIndex={2}
                childComponent={
                  <div>
                    <div
                      style={
                        {
                          // width: "400px",
                        }
                      }
                    >
                      {putFBLead.notQualified ? (
                        <div>
                          <div className="text-center mb-2">
                            Disqualify Candidate
                          </div>
                          <Box
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            autoComplete="off"
                          >
                            <form
                              action=""
                              onSubmit={(e) => {
                                e.preventDefault();

                                ConfirmFormSubmit(putFBLead.notes);
                              }}
                            >
                              <div>
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Add Notes"
                                  multiline
                                  // error={isNotesEmpty}
                                  // helperText={
                                  //   isNotesEmpty ? "Notes cannot be empty" : ""
                                  // }
                                  required
                                  onChange={(event) => {
                                    setFBputLead((prev) => ({
                                      ...prev,
                                      notes: event.target.value,
                                    }));
                                    // setIsNotesEmpty(false);
                                  }}
                                  maxRows={4}
                                  fullWidth
                                />
                              </div>

                              <div className="d-flex justify-content-end gap-1 mt-1">
                                <button
                                  className="btn text-white"
                                  onClick={handleCloseNotes}
                                  style={{ backgroundColor: "#d00a0a" }}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn text-white"
                                  // onClick={ConfirmFormSubmit}
                                  style={{ backgroundColor: "#169C50" }}
                                >
                                  Disqualify
                                </button>
                              </div>
                            </form>
                          </Box>
                        </div>
                      ) : (
                        <div>
                          <div className="text-center mb-2">
                            Not Attend Candidate
                          </div>
                          <Box
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            autoComplete="off"
                          >
                            <form
                              action=""
                              onSubmit={(e) => {
                                e.preventDefault();

                                ConfirmFormSubmit(putFBLead.notes);
                              }}
                            >
                              <div>
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Add Notes"
                                  multiline
                                  // error={isNotesEmpty}
                                  // helperText={
                                  //   isNotesEmpty ? "Notes cannot be empty" : ""
                                  // }
                                  // required
                                  onChange={(event) => {
                                    setFBputLead((prev) => ({
                                      ...prev,
                                      notes: event.target.value,
                                    }));
                                    // setIsNotesEmpty(false);
                                  }}
                                  maxRows={4}
                                  fullWidth
                                />
                              </div>

                              <div className="d-flex justify-content-end gap-1 mt-1">
                                <button
                                  className="btn text-white"
                                  onClick={handleCloseNotes}
                                  style={{ backgroundColor: "#d00a0a" }}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn text-white"
                                  // onClick={() => setopenConfirmation(true)}
                                  // onClick={ConfirmFormSubmit}
                                  style={{ backgroundColor: "#169C50" }}
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </Box>
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
            </MyModal>
          </>
        ))}
      {OpenConfirmation && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div>
                    <p>Are you sure want to submit ? </p>
                    <div className="d-felx justitfy-content-end gap-2">
                      <div
                        className="btn btn-danger"
                        onClick={() => {
                          setopenConfirmation(false);
                        }}
                      >
                        No
                      </div>
                      <div
                        className="btn btn-success"
                        onClick={ConfirmFormSubmit(putFBLead.notes)}
                      >
                        Yes
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
        </>
      )}
      {notesOpen && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div className="d-flex justify-content-end mb-2">
                    <div
                      className="btn btn-outline-danger"
                      onClick={() => setNotesOpen(false)}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                  <div className="mb-2">
                    <AddNotesFBLead facebookId={currentMetaDetail.id} />
                  </div>
                </>
              }
            />
          </MyModal>
        </>
      )}
      {ShowTimeline.show && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <TimelineFacebookMeta facebookId={currentMetaDetail.id} />
            }
          />
        </MyModal>
      )}

      {followupopen && (
        <MyModal>
          <ModalContainer
            zIndex={1001}
            childComponent={
              <div
                style={{
                  width: "350px",
                  // height: "800px",
                  position: "relative",
                }}
              >
                <FormControl
                  fullWidth
                  error={followupError.dateTime}
                  style={{ marginBottom: "16px" }}
                >
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker", "TextField"]}>
                      <DateTimePicker
                        label="select date and time"
                        error={Boolean(dateTimeError)}
                        // helperText={dateTi/meError}
                        // value={dateTime}
                        onChange={(date) => {
                          setDateTime(date);
                          setFollowupError((prev) => ({
                            ...prev,
                            dateTime: false,
                          }));
                          const formattedDate =
                            dayjs(date).format("YYYY-MM-DD hh:mm A");
                          setFormattedDate(formattedDate);
                        }}
                      />
                      {/* {followupError.dateTime && (
                        <FormHelperText error>
                          Please select a date and time
                        </FormHelperText>
                      )} */}
                      {followupError.dateTime && (
                        <span style={{ color: "#d44349" }}>
                          Please select a date and time
                        </span>
                      )}
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
                <TextField
                  style={{ marginBottom: "16px" }}
                  id="outlined-multiline-flexible"
                  label="Add Notes"
                  multiline
                  onChange={(event) => {
                    setFollownotes(event.target.value);
                    setFollowupError((prev) => ({
                      ...prev,
                      addNotes: false,
                    }));
                  }}
                  maxRows={4}
                  fullWidth
                  error={followupError.addNotes}
                  // helperText={
                  //   followupError.addNotes ? "Notes cannot be empty" : ""
                  // }
                />
                {followupError.addNotes && (
                  <span style={{ color: "#d44349" }}>
                    Notes cannot be empty
                  </span>
                )}

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{
                      color: "red",
                      borderColor: "red",
                      marginRight: "8px",
                    }}
                    onClick={closeFollowup}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ color: "green", borderColor: "green" }}
                    onClick={handleFollowSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </div>
            }
          />
        </MyModal>
      )}
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
      {showSuccess && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={<SuccessTick HeadText="Successfully Updated" />}
          />
        </MyModal>
      )}
      {showAlreadyRegister && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={
              <>
                <div>
                  <p>
                    <b>{currentMetaDetail.candidateName}</b> is already
                    registered
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  <div
                    className="btn btn-danger px-3"
                    onClick={() => setshowAlreadyRegister(false)}
                  >
                    Ok
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}
      {showSuccessForm && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={<SuccessTick HeadText="Successfully Submit" />}
          />
        </MyModal>
      )}
    </>
  );
}

export default CandidateFaceBookMetaTable;
