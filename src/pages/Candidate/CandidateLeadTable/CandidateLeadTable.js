/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import SuccessTick from "../../../components/success_tick";
import { IoCopy } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { styled } from "@mui/material/styles";
import styles from "../../../components/candidate-qualify-forms/CommonQualify.module.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import accordionstyle from "../CandidateQualifyForm/QualifyForm.module.scss";
import {
  GetAllsdminDetails,
  GetCandidateLead,
  updateCanleadSeenStatus,
  PutCandidateLeadCheck,
  getCandidateLead,
  getcandidateDetails,
  PostFollowup,
  GetFollowUpEvents,
  GetCandidateQualifyDetials,
  PutCandidateType,
} from "../../../apiServices";
import { useState } from "react";
import {
  DDMMYYYY_formate,
  MyModal,
  capitalizeWords,
  textTruncate,
} from "../../../utility";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import candidateLeadStyle from "./candidateLead.module.scss";
import CandidateLeadFilter from "./CandidateLeadFilter";
import FBStyle from "../FacebookMeta/candidateFacebookMeta.module.scss";
import { Stack } from "rsuite";
import {
  CandidateLeadActions,
  commonPopupActions,
  showHideDetailsActions,
} from "../../../redux-store/store";
import canLeadStyle from "./candidateLead.module.scss";
import { GoDotFill } from "react-icons/go";
import ModalContainer from "../../../components/modal_popup";
import { useRef } from "react";
import { profileBaseUrl } from "../../../App";
import CandidateLeadPopup from "../../../components/ModalPopups/CandidateLeadPopup";
import CandidateLeadTimeline from "./LeadTimeLine";
import CandidateLead from "./CandidateLeadPostForm";
import YourComponent from "../../../components/candidate-qualify-forms/refrense";
import ExperienceQualify from "../../../components/candidate-qualify-forms/ExperienceQualify";
import ExperienceWithNoExperience from "../../../components/candidate-qualify-forms/ExperienceWithNoExperience";

import QualifyFresherform from "../CandidateQualifyForm/FresherForm";
import ExperienceForm from "../CandidateQualifyForm/ExperienceForm";
import CandidateLeadupdate from "./LeadUpdateform";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2d2d2",
    color: "#545454f0",
    padding: "8px",
    "@media (max-width: 992px)": {},
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "8px",
    fontSize: 14,
    "@media (max-width: 992px)": {},
  },
}));

function CandidateLeadTable() {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [CanputLead, setCanputLead] = useState(null);
  const [followupopen, setFollowupOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // New state for loader
  const [isPopupOpenCanLead, setIsPopupOpenCanLead] = useState(false);
  const [PopupAddCanLead, setIsPopupAddCanLead] = useState(false);
  const [selectedCandidateName, setSelectedCandidateName] = useState(null);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [leadUpdateForm, setLeadUpdateForm] = useState(false);
  const [dateTimeError, setDateTimeError] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [formattedDate, setFormattedDate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessForm, setshowSuccessForm] = useState(false);
  const [Follownotes, setFollownotes] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const adminId = localStorage.getItem("adminID");
  const [pageCount, setPageCount] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 0,
  });
  const [totalCount, setTotalCount] = useState();
  const [showConfirmationPopup, setShowConfirmPopup] = useState(false);
  const [showNotAttend, setShowshowNotAttend] = useState(false);
  const [showConfirmationqualifiedPopup, setShowConfirmQualifiedPopup] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isFresher, setIsFresher] = useState(null);
  const [showInitialRadios, setShowInitialRadios] = useState(true);
  const [showCurrentlyWorkingComponent, setShowCurrentlyWorkingComponent] =
    useState(false);
  const [showNotWorkingComponent, setShowNotWorkingComponent] = useState(false);
  const size = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter.size
  );
  const [putCandidateLead, setPutcandidateLead] = useState({
    canLeadId: "",
    qualified: false,
    notQualified: false,
    followUp: false,
    callNotAttend: false,
  });
  const [followupError, setFollowupError] = useState({
    dateTime: false,
    addNotes: false,
    selectEvent: false,
  });
  const handleClose = () => {
    // onClose();
    setIsPopupOpenCanLead(false);
  };

  const openFollowup = () => {
    setFollowupOpen(true);
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
  const [currentMetaDetail, setCurrentMetaDetail] = useState();
  const [currentLeadDetail, setCurrentLeadDetail] = useState();
  const Dispatch = useDispatch();
  const CanLeadFilter = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter
  );

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
  const handleCopyClick = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  useEffect(() => {
    // ?to set admin id to null if super admin
    if (isSuperAdmin) {
      Dispatch(CandidateLeadActions.setCandidateLeadFilterAdminId("null"));
    }
  }, [adminDetails]);

  const [candidateLeadlisted, setcandidateLeadlisted] = useState([]);

  useEffect(() => {
    setShowLoader(true); // Set loader to true

    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        //   setLoading(true);
        setcandidateLeadlisted(data.canLeadList);
        setTotalCount(data.totalCount);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .catch((err) => {
        setcandidateLeadlisted([]);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: 1,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [CanLeadFilter]);

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

  const handleReset = () => {
    setShowLoader(true); // Set loader to true

    setcandidateLeadlisted({
      profilePageNo: null,
      mobileNumber: null,
      jobCategory: null,
      status: null,
      fromSource: null,
      expYearsMin: null,
      expYearsMax: null,
      createdTimeStart: null,
      createdTimeEnd: null,
      page: 1,
      size: 10,
    });

    // Fetch data after resetting
    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        console.log(data, "lead candidate list");
        //   setLoading(true);
        setcandidateLeadlisted(data.canLeadList);
        //   setLoading(false);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .catch((err) => {
        setcandidateLeadlisted([]);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: 1,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  function updateSeenStatus(id) {
    if (!isSuperAdmin) {
      updateCanleadSeenStatus(id).then(() => {
        ReloadList();
      });
    }
  }
  function ReloadList() {
    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        console.log(data, "lead candidate list");
        //   setLoading(true);
        setcandidateLeadlisted(data.canLeadList);
        //   setLoading(false);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .catch((err) => {
        setcandidateLeadlisted([]);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: 1,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
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
  // const handleFollowSubmit = async () => {
  //   if (!formattedDate) {
  //     setFollowupError((prev) => ({
  //       ...prev,
  //       dateTime: true,
  //     }));
  //     return;
  //   } else if (Follownotes.trim() === "") {
  //     setFollowupError((prev) => ({
  //       ...prev,
  //       addNotes: true,
  //     }));
  //     return;
  //   }
  //   // else if (!selectedValue) {
  //   //   setFollowupError((prev) => ({
  //   //     ...prev,
  //   //     selectEvent: true,
  //   //   }));
  //   //   return;
  //   // }
  //   else {
  //     try {
  //       // const formattedDate = dateTime.toISOString();
  //       await PostFollowup(
  //         null,
  //         currentLeadDetail.id,
  //         null,
  //         formattedDate,
  //         Follownotes,
  //         // selectedValue
  //         "Candidate lead"
  //       );

  //       setFormattedDate("");
  //       setSelectedValue("");
  //       setFollownotes("");
  //       setShowSuccess(true);
  //       setTimeout(() => {
  //         setShowSuccess(false);
  //         setShowConfirmPopup(false);
  //       }, 3000);
  //       closeFollowup();
  //     } catch (error) {
  //       console.error("There was a problem with the API call:", error);
  //     }
  //   }
  // };
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
          null,
          currentLeadDetail.id,
          null,
          formattedDate,
          followUpTime,
          Follownotes,
          "Candidate lead"
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
  const handleCandidateClick = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setIsPopupOpenCanLead(true);
  };

  function candidatePagination(event, page) {
    const currentPage = page;

    Dispatch(CandidateLeadActions.setCandidateLeadFilterPage(currentPage));
  }

  function handleopenUpdateLead() {
    setLeadUpdateForm(true);
  }

  let prefilldata = {};
  if (currentLeadDetail) {
    prefilldata = {
      DOB: currentLeadDetail.dateOfBirth,
      JobRole: currentLeadDetail.jobCategory,
      source: currentLeadDetail.reference,
      // assignto: { val: parseInt(adminMyself), err: "" },
      whatsapp: currentLeadDetail.whatsappNumber,
      mobileNumber: currentLeadDetail.mobileNumber,
      name: currentLeadDetail.name,
      lastName: currentLeadDetail.lastName,
      // gender: currentLeadDetail
      state: currentLeadDetail.state,
      city: currentLeadDetail.prefLocation,
      area: currentLeadDetail.prefArea,
      experienced: currentLeadDetail.experienced,
    };
  }
  console.log(prefilldata, "prefilldata");
  function handleCloseNotes() {
    setShowConfirmPopup(false);
    // setIsNotesEmpty(false);
  }
  function candidateSize(size) {
    Dispatch(CandidateLeadActions.setCandidateLeadFilterSize(size));
  }
  const inputRef = {
    qualified: useRef(),
    notQualified: useRef(),
    followup: useRef(),
    // rescheduled: useRef(),
  };
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref && ref.current) {
      ref.current.click();
    } else {
      console.error(`Ref "${refName}" is not correctly defined or is null.`);
    }
  };

  const handleIsQualified = (status) => {
    console.log(currentLeadDetail.id, "jhsjhhiidddd");
    if (status === "notQualified") {
      setPutcandidateLead({
        canLeadId: currentLeadDetail.id,
        qualified: false,
        notQualified: true,
        followup: false,
        callNotAttend: false,
      });
    } else if (status === "qualified") {
      setPutcandidateLead({
        canLeadId: currentLeadDetail.id,
        qualified: true,
        notQualified: false,
        followup: false,
        callNotAttend: false,
      });
    } else if (status === "callNotAttend") {
      setPutcandidateLead({
        canLeadId: currentLeadDetail.id,
        qualified: false,
        notQualified: false,
        followup: false,
        callNotAttend: true,
      });
    } else {
      setPutcandidateLead({
        canLeadId: currentLeadDetail.id,
        qualified: false,
        notQualified: false,
        followup: true,
        callNotAttend: false,
      });
    }
  };
  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }
  function handleConfirmationOpenQualify() {
    setShowConfirmQualifiedPopup(true);
    GetCandidateQualifyDetials(currentLeadDetail.mobileNumber)
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
  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  const ConfirmFormSubmit = (e) => {
    e.preventDefault();
    if (putCandidateLead.canLeadId) {
      setEnableSubmit(true);
      putCandidateLead.notes = CanputLead.notes;
      PutCandidateLeadCheck(putCandidateLead).then((data) => {
        GetCandidateLead(CanLeadFilter).then((data) => {
          const totalPageCount = Math.ceil(data.totalCount / size);
          // const totalElements = data.totalElements;

          setcandidateLeadlisted(data.canLeadList);

          setPageCount((prev) => ({
            ...prev,
            // totalCount: totalElements,
            totalPages: totalPageCount,
          }));
        });
      });
      setTimeout(() => {
        setShowConfirmPopup(false);
        setShowshowNotAttend(false);
        setShowConfirmQualifiedPopup(false);
        setEnableSubmit(false);
        handleReset();
      }, 1000);
    }
  };
  function ConfirmCallNotAttendFormSubmit() {
    if (putCandidateLead.canLeadId) {
      setEnableSubmit(true);
      setshowSuccessForm(true);
      //  putCandidateLead.notes = CanputLead.notes;
      PutCandidateLeadCheck(putCandidateLead).then((data) => {
        setShowConfirmPopup(false);
        setShowshowNotAttend(false);
        setShowConfirmQualifiedPopup(false);

        GetCandidateLead(CanLeadFilter).then((data) => {
          const totalPageCount = Math.ceil(data.totalCount / size);
          // const totalElements = data.totalElements;

          setcandidateLeadlisted(data.canLeadList);

          setPageCount((prev) => ({
            ...prev,
            // totalCount: totalElements,
            totalPages: totalPageCount,
          }));
        });
        setTimeout(() => {
          setshowSuccessForm(false);
          setEnableSubmit(false);
        }, 1000);
      });
    }
  }

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
    GetCandidateLead(CanLeadFilter).then((data) => {
      const totalPageCount = Math.ceil(data.totalCount / size);
      // const totalElements = data.totalElements;

      setcandidateLeadlisted(data.canLeadList);

      setPageCount((prev) => ({
        ...prev,
        // totalCount: totalElements,
        totalPages: totalPageCount,
      }));
    });
  };
  function handleTimeLinePopup(value, leadId) {
    Dispatch(
      showHideDetailsActions.setCandidateLeadDetails({
        showTimeLine: value,
        canLeadId: leadId,
      })
    );
  }
  const handleCandidateDetails = async (candidateleadId, type) => {
    let data;
    if (type === "CandidateLead") {
      data = await getCandidateLead(candidateleadId);
    } else if (type === "RegisterCandidate") {
      data = await getcandidateDetails(candidateleadId);
    }

    // Dispatch action to show the popup and pass the fetched data
    Dispatch(
      commonPopupActions.setShowPopup({
        name: "candidateDetails",
        id: candidateleadId,
        type: type,
        data: data,
      })
    );
  };
  const Reloadresponse = () => {
    setLeadUpdateForm(false);
    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        console.log(data, "lead candidate list");
        //   setLoading(true);
        setcandidateLeadlisted(data.canLeadList);
        //   setLoading(false);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: Math.ceil(data.totalCount / size),
        }));
      })
      .catch((err) => {
        setcandidateLeadlisted([]);
        setPageCount((prev) => ({
          ...prev,
          // totalCount: data.totalElements,
          totalPages: 1,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

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

  // const handleOpenModal = () => {
  //   setOpenCreateReport(true);
  // };

  // const handleCloseModal = () => {
  //   setOpenCreateReport(false);
  // };
  const hanndleClose = () => {
    setIsFresher(false);
    setShowCurrentlyWorkingComponent(false);
    setShowNotWorkingComponent(false);
    // setOpenCreateReport(false);
  };

  const handleClosefresher = () => {
    setIsFresher(false);
    // setShowCurrentlyWorkingComponent(false);
    // setShowNotWorkingComponent(false);
  };
  const handleReloadpage = () => {
    setShowConfirmPopup(false);
    setShowCurrentlyWorkingComponent(false);
    setShowNotWorkingComponent(false);
    setShowLoader(true);
    setShowConfirmQualifiedPopup(false);

    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        const totalPageCount = Math.ceil(data.totalCount / size);
        // const totalElements = data.totalElements;

        setcandidateLeadlisted(data.canLeadList);

        setPageCount((prev) => ({
          ...prev,
          // totalCount: totalElements,
          totalPages: totalPageCount,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    let experiencedValue = false;
    if (selectedValue === "experience") {
      experiencedValue = true;
    }

    PutCandidateType(experiencedValue, currentLeadDetail.mobileNumber, "").then(
      (data) => {
        console.log(
          "Data Format",
          data,
          "mobile number ",
          currentMetaDetail.mobileNumber
        );
      }
    );
  };
  function handleCloseQualifyForm() {
    setSelectedOption("");
    setShowConfirmQualifiedPopup(false);
    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        const totalPageCount = Math.ceil(data.totalCount / size);
        // const totalElements = data.totalElements;

        setcandidateLeadlisted(data.canLeadList);

        setPageCount((prev) => ({
          ...prev,
          // totalCount: totalElements,
          totalPages: totalPageCount,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  }
  function handleQualifyFormSubmit() {
    setshowSuccessForm(true);

    setTimeout(() => {
      setshowSuccessForm(false);
      setSelectedOption("");
      setShowConfirmQualifiedPopup(false);
    }, 1000);
    GetCandidateLead(CanLeadFilter)
      .then((data) => {
        const totalPageCount = Math.ceil(data.totalCount / size);
        // const totalElements = data.totalElements;

        setcandidateLeadlisted(data.canLeadList);

        setPageCount((prev) => ({
          ...prev,
          // totalCount: totalElements,
          totalPages: totalPageCount,
        }));
      })
      .finally(() => {
        setShowLoader(false);
      });
  }
  return (
    <>
      <div>
        <div className={`${canLeadStyle.Topcontainer}`}>
          {" "}
          <div className="d-flex ">
            Show {"  "}
            <select
              name=""
              id=""
              className="px-1 py-1 mx-2"
              onChange={(event) => candidateSize(event.target.value)}
              defaultValue="10"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            {"   "}
            Entries
          </div>
          <div className={`${canLeadStyle.filterAdduser}`}>
            <div className="mt-2 me-2">Total Count : {totalCount}</div>
            <div
              className="p-2 success  me-2 mx-2"
              onClick={handleReset}
              // style={{ : "#169C50", color: "white" }}
            >
              <LuRefreshCcw />
            </div>
            <CandidateLeadFilter />
            {/* <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: "/candidate_lead" }}
            > */}
            <button
              className={`ms-2 ${canLeadStyle.NewLead}`}
              onClick={() => {
                setIsPopupAddCanLead(true);
              }}
            >
              <AiOutlineUserAdd /> Add New Lead
            </button>
            {/* </Link> */}
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
        <div className={`${FBStyle.Container}`}>
          <div className={`table-responsive-sm ${FBStyle.responsive}`}>
            <TableContainer className={`${candidateLeadStyle.TableContainer}`}>
              <Table stickyHeader aria-label="sticky table" className={``}>
                <TableHead className={`${FBStyle.Header}`}>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Mobile Number</StyledTableCell>
                    {/* <StyledTableCell>Whatspp Number</StyledTableCell> */}
                    <StyledTableCell>Job Category</StyledTableCell>
                    <StyledTableCell>Experience</StyledTableCell>
                    <StyledTableCell>Source</StyledTableCell>
                    <StyledTableCell>Stage</StyledTableCell>
                    {isSuperAdmin && (
                      <StyledTableCell>Assigned To</StyledTableCell>
                    )}
                    <StyledTableCell>Created on</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidateLeadlisted && candidateLeadlisted.length > 0 ? (
                    <>
                      {candidateLeadlisted.map((candidate, i) => {
                        return (
                          <>
                            <TableRow
                              key={i}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                                backgroundColor:
                                  !candidate.CanLeadModel.seen && "#1cb25f2f",
                              }}
                              onClick={(e) => {
                                setCurrentMetaDetail(candidate);
                                setCurrentLeadDetail(candidate.CanLeadModel);
                              }}
                            >
                              {/* <StyledTableCell
                                title={
                                  candidate &&
                                  candidate.name &&
                                  candidate.name.length
                                }
                                onClick={(e) => {
                                  setSelectedCandidateName(candidate);
                                  setIsPopupOpenCanLead(true);
                                  handleCandidateClick(candidate.id);
                                }}
                              >
                                {candidate &&
                                candidate.name &&
                                candidate.name.length > 15
                                  ? `${candidate.name.slice(0, 15)}...`
                                  : candidate.name}
                              </StyledTableCell> */}
                              <StyledTableCell
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedCandidateName(candidate);
                                  updateSeenStatus(candidate.CanLeadModel.id);
                                  // setIsPopupOpenCanLead(true);
                                  // handleCandidateClick(
                                  //   candidate.CanLeadModel.id
                                  // );

                                  handleCandidateDetails(
                                    candidate.CanLeadModel.id,
                                    "CandidateLead"
                                  );
                                }}
                                style={{
                                  textDecoration: "none",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                title={
                                  candidate?.CanLeadModel.name +
                                    " " +
                                    candidate?.CanLeadModel.lastName || null
                                }
                              >
                                {candidate?.CanLeadModel.name != null
                                  ? textTruncate(
                                      capitalizeWords(
                                        candidate.CanLeadModel.name
                                      ),
                                      15
                                    ) +
                                    " " +
                                    (candidate?.CanLeadModel.lastName != null
                                      ? capitalizeWords(
                                          candidate.CanLeadModel.lastName
                                        )
                                      : "")
                                  : "-"}
                              </StyledTableCell>

                              <StyledTableCell
                                onClick={() => {
                                  copyToClipboard(
                                    candidate.CanLeadModel.mobileNumber
                                  );
                                }}
                              >
                                {candidate.CanLeadModel.mobileNumber !==
                                  undefined &&
                                candidate.CanLeadModel.mobileNumber !== null
                                  ? String(
                                      candidate.CanLeadModel.mobileNumber
                                    ).substring(0, 10)
                                  : ""}
                              </StyledTableCell>
                              {/* <StyledTableCell
                                onClick={() => {
                                  copyToClipboard(
                                    candidate.CanLeadModel.whatsappNumber
                                  );
                                }}
                              >
                                {candidate.CanLeadModel.whatsappNumber !==
                                  undefined &&
                                candidate.CanLeadModel.whatsappNumber !== null
                                  ? String(
                                      candidate.CanLeadModel.whatsappNumber
                                    ).substring(0, 10)
                                  : ""}
                              </StyledTableCell> */}

                              <StyledTableCell
                                title={candidate.CanLeadModel.jobCategory}
                                onClick={() => {
                                  copyToClipboard(
                                    candidate.CanLeadModel.jobCategory
                                  );
                                }}
                              >
                                {candidate.CanLeadModel.jobCategory?.length > 20
                                  ? `${candidate.CanLeadModel.jobCategory.slice(
                                      0,
                                      20
                                    )}...`
                                  : candidate.CanLeadModel.jobCategory || "-"}
                              </StyledTableCell>
                              {/* {!candidate.experienced && "Fresher"}
                                {candidate.experienced &&
                                  candidate.expYears == 0 && <>Not given</>}
                                {candidate.experienced &&
                                  candidate.expYears != 0 && (
                                    <>{candidate.expYears} Year(s)</>
                                  )} */}
                              <StyledTableCell>
                                {candidate.CanLeadModel.expYears === 0
                                  ? "Fresher"
                                  : `${candidate.CanLeadModel.expYears} year${
                                      candidate.CanLeadModel.expYears > 0
                                        ? "(s)"
                                        : ""
                                    }`}
                              </StyledTableCell>

                              <StyledTableCell>
                                {" "}
                                {candidate.CanLeadModel.fromSource}
                              </StyledTableCell>
                              <StyledTableCell>
                                {candidate.CanLeadModel.profilePageNo}
                              </StyledTableCell>
                              {isSuperAdmin && (
                                <StyledTableCell align="left">
                                  <>
                                    {
                                      adminName[
                                        adminid.indexOf(
                                          candidate.CanLeadModel.assignTo
                                        )
                                      ]
                                    }
                                  </>
                                </StyledTableCell>
                              )}
                              <StyledTableCell>
                                <DDMMYYYY_formate
                                  dateValue={candidate.CanLeadModel.createdTime}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <div>
                                  <div className={`${FBStyle.Popper}`}>
                                    <div className={`${FBStyle.StatusStyle}`}>
                                      <div>
                                        <>
                                          {candidate.CanLeadModel.qualified ===
                                            true &&
                                            candidate.CanLeadModel.dailyTask ===
                                              false && (
                                              <div
                                                className={`${FBStyle.Green_wrp}`}
                                              >
                                                <input
                                                  type="radio"
                                                  name={`status_${candidate.CanLeadModel.id}`}
                                                  checked={
                                                    candidate.CanLeadModel
                                                      .qualified
                                                  }
                                                  id={`qualified_${candidate.CanLeadModel.id}`}
                                                />
                                                <label
                                                  htmlFor={`qualified_${candidate.CanLeadModel.id}`}
                                                >
                                                  Qualified
                                                </label>
                                              </div>
                                            )}

                                          {candidate.CanLeadModel
                                            .notQualified === true && (
                                            <div
                                              className={`${FBStyle.chips_wrp}`}
                                            >
                                              <input
                                                type="radio"
                                                checked={
                                                  candidate.CanLeadModel
                                                    .notQualified
                                                }
                                                name={`status_${candidate.CanLeadModel.id}`}
                                                id={`notQualified_${candidate.CanLeadModel.id}`}
                                              />
                                              <label
                                                htmlFor={`notQualified_${candidate.CanLeadModel.id}`}
                                              >
                                                Not Qualified
                                              </label>
                                            </div>
                                          )}
                                          {candidate.CanLeadModel.dailyTask ===
                                            true &&
                                            candidate.CanLeadModel
                                              .notQualified === false && (
                                              <div
                                                className={`${FBStyle.Followup_wrp}`}
                                              >
                                                {" "}
                                                <input
                                                  type="radio"
                                                  checked={
                                                    candidate.CanLeadModel
                                                      .dailyTask
                                                  }
                                                  name={`status_${candidate.CanLeadModel.id}`}
                                                  id={`dailyTask_${candidate.CanLeadModel.id}`}
                                                />
                                                <label
                                                  htmlFor={`dailyTask_${candidate.CanLeadModel.id}`}
                                                >
                                                  Follow Up
                                                </label>
                                              </div>
                                            )}
                                          {candidate.CanLeadModel.notAttend ===
                                            true &&
                                            candidate.CanLeadModel
                                              .notQualified === false && (
                                              <div
                                                className={`${FBStyle.Notattended_wrp}`}
                                              >
                                                {" "}
                                                <input
                                                  type="radio"
                                                  checked={
                                                    candidate.CanLeadModel
                                                      .dailyTask
                                                  }
                                                  name={`status_${candidate.CanLeadModel.id}`}
                                                  id={`dailyTask_${candidate.CanLeadModel.id}`}
                                                />
                                                <label
                                                  htmlFor={`dailyTask_${candidate.CanLeadModel.id}`}
                                                >
                                                  Not Attend
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
                                          {candidate.CanLeadModel
                                            .fromFbMetaLeadAd !== true &&
                                            candidate.CanLeadModel.qualified ===
                                              false && (
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
                                                    className={`${FBStyle.select_wrp}`}
                                                    onClick={() => {
                                                      handleButtonClick(
                                                        "qualified"
                                                      );
                                                    }}
                                                  >
                                                    <input
                                                      type="radio"
                                                      // ref={inputRef.qualified}
                                                      name={`status_${candidate.CanLeadModel.id}`}
                                                      checked={
                                                        candidate.CanLeadModel
                                                          .qualified
                                                      }
                                                      id={`qualified_${candidate.CanLeadModel.id}`}
                                                    />

                                                    <label
                                                      htmlFor={`qualified_${candidate.CanLeadModel.id}`}
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

                                          <li
                                            onClick={(event) => {
                                              handleConfirmationOpen(true);
                                              handleIsQualified("notQualified");
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
                                                className={`${FBStyle.select_wrp}`}
                                              >
                                                <input
                                                  // ref={inputRef.notQualified}
                                                  type="radio"
                                                  checked={
                                                    candidate.CanLeadModel
                                                      .notQualified
                                                  }
                                                  name={`status_${candidate.CanLeadModel.id}`}
                                                  id={`notQualified_${candidate.CanLeadModel.id}`}
                                                />
                                                <label
                                                  htmlFor={`notQualified_${candidate.CanLeadModel.id}`}
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
                                          {/* <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <MoreOptionPopper
                                                leadId={candidate.CanLeadModel.id}
                                              />
                                            </a>
                                          </li> */}
                                          {candidate.CanLeadModel.qualified ===
                                            true && (
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href={`${profileBaseUrl}/?MN=${candidate.CanLeadModel.mobileNumber}&adminId=${adminId}`}
                                                target="_blank"
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
                                          )}

                                          {candidate.CanLeadModel.qualified ===
                                            true && (
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleCopyClick(
                                                    `${profileBaseUrl}/?MN=${candidate.CanLeadModel.mobileNumber}&adminId=${adminId}`
                                                  )
                                                }
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
                                                  Register Link
                                                </label>
                                                <IconButton
                                                  style={{ fontSize: "16px" }}
                                                >
                                                  <IoCopy />
                                                </IconButton>
                                              </a>
                                            </li>
                                          )}
                                          {candidate.CanLeadModel
                                            .notQualified === false && (
                                            <li
                                              onClick={() => {
                                                openFollowup(true);
                                                handleIsQualified("followup");
                                              }}
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() =>
                                                  handleButtonClick("followup")
                                                }
                                              >
                                                <div
                                                  className={`${FBStyle.select_wrp}`}
                                                >
                                                  <input
                                                    // ref={inputRef.notQualified}
                                                    type="radio"
                                                    checked={
                                                      candidate.CanLeadModel
                                                        .dailyTask
                                                    }
                                                    name={`status_${candidate.CanLeadModel.id}`}
                                                    id={`followup_${candidate.CanLeadModel.id}`}
                                                  />
                                                  <label
                                                    htmlFor={`followup_${candidate.CanLeadModel.id}`}
                                                  >
                                                    <GoDotFill
                                                      style={{
                                                        color: "#430CBA",
                                                        fontSize: 20,
                                                      }}
                                                    />{" "}
                                                    Follow up
                                                  </label>
                                                </div>
                                              </a>
                                            </li>
                                          )}
                                          {candidate.CanLeadModel
                                            .notQualified === false && (
                                            <li
                                              onClick={() => {
                                                setShowshowNotAttend(true);
                                                handleIsQualified(
                                                  "callNotAttend"
                                                );
                                              }}
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() =>
                                                  handleButtonClick(
                                                    "callNotAttend"
                                                  )
                                                }
                                              >
                                                <div
                                                  className={`${FBStyle.select_wrp}`}
                                                >
                                                  <input
                                                    // ref={inputRef.notQualified}
                                                    type="radio"
                                                    checked={
                                                      candidate.CanLeadModel
                                                        .notAttend
                                                    }
                                                    name={`status_${candidate.CanLeadModel.id}`}
                                                    id={`callNotAttend_${candidate.CanLeadModel.id}`}
                                                  />
                                                  <label
                                                    htmlFor={`callNotAttend_${candidate.CanLeadModel.id}`}
                                                  >
                                                    <GoDotFill
                                                      style={{
                                                        color: "#fa9e0a",
                                                        fontSize: 20,
                                                      }}
                                                    />{" "}
                                                    Not Attend
                                                  </label>
                                                </div>
                                              </a>
                                            </li>
                                          )}

                                          <li
                                            onClick={() => {
                                              handleopenUpdateLead();
                                            }}
                                          >
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              // onClick={() =>
                                              //   handleButtonClick(
                                              //     "callNotAttend"
                                              //   )
                                              // }
                                            >
                                              <div
                                                className={`${FBStyle.select_wrp}`}
                                              >
                                                <input
                                                  // ref={inputRef.notQualified}
                                                  type="radio"
                                                  // checked={
                                                  //   candidate.CanLeadModel
                                                  //     .notAttend
                                                  // }
                                                  name={`status_${candidate.CanLeadModel.id}`}
                                                  id={`update_${candidate.CanLeadModel.id}`}
                                                />
                                                <label
                                                  htmlFor={`update_${candidate.CanLeadModel.id}`}
                                                >
                                                  <GoDotFill
                                                    style={{
                                                      color: "#169c50",
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
                                                  candidate.CanLeadModel.id
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
                    <p className="text-danger ">Not found</p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 position-absolute bottom-0 start-50 translate-middle-x">
          <Stack spacing={2}>
            <Pagination
              count={pageCount.totalPages}
              variant="outlined"
              shape="rounded"
              color="success"
              boundaryCount={1}
              siblingCount={0}
              onChange={candidatePagination}
            />
          </Stack>
        </div>
      </div>
      {showConfirmationPopup && (
        <MyModal>
          <ModalContainer
            // zIndex={2}
            childComponent={
              <>
                {/* {putCandidateLead.qualified ? (
                  <>
                    <QualifyForm
                      id={currentLeadDetail.id}
                      onConfirm={ConfirmFormSubmit}
                      onRequestClose={handleConfirmationClose}
                      whatsApp={currentLeadDetail.whatsappNumber}
                      name={currentLeadDetail.name}
                    />
                  </>
                ) : ( */}
                {/* <>
                  <ConfirmationPopup
                    heading={"Confirmation"}
                    headingText={`Are you sure you want to update <b>${currentLeadDetail.name}</b>`}
                    onConfirm={ConfirmFormSubmit}
                    enableSubmit={enableSubmit}
                    onRequestClose={handleConfirmationClose}
                  />
                </> */}
                {/* // )} */}
              </>
            }
          />
        </MyModal>
      )}
      {isPopupOpenCanLead && selectedCandidateName && selectedCandidateId && (
        <MyModal>
          <ModalContainer
            // zIndex={2}
            childComponent={
              <>
                <CandidateLeadPopup
                  id={selectedCandidateId}
                  onClose={handleClose}
                />
              </>
            }
          />
        </MyModal>
      )}
      {showNotAttend && (
        <>
          <MyModal>
            <ModalContainer
              // zIndex={2}
              childComponent={
                <>
                  <div>
                    <div className="mb-3">
                      Are you sure you want to choose <b>Not Attend</b> ?
                    </div>
                    {/* <TextField
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
                    /> */}
                  </div>
                  <div className="d-flex justify-content-end gap-1 mt-4">
                    <button
                      className="btn text-white me-3"
                      onClick={() => {
                        setShowshowNotAttend(false);
                        setEnableSubmit(false);
                      }}
                      style={{ backgroundColor: "#d00a0a" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn text-white"
                      onClick={ConfirmCallNotAttendFormSubmit}
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
        </>
      )}
      {showConfirmationqualifiedPopup && (
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
                          mobilenumber={currentLeadDetail.mobileNumber.toString()}
                          whatsappNumber={currentLeadDetail.whatsappNumber.toString()}
                          Reloadpage={handleQualifyFormSubmit}
                        />
                        {/* </div> */}
                      </>
                    ) : selectedOption === "experience" ? (
                      // <ExperinenceWorkingform
                      //   mobilenumber={currentLeadDetail.mobileNumber}
                      // />
                      <ExperienceForm
                        mobileNumber={currentLeadDetail.mobileNumber}
                        whatsappNumber={currentLeadDetail.whatsappNumber}
                        Reloadpage={handleQualifyFormSubmit}
                      />
                    ) : null}
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}
      {showConfirmationPopup && (
        <MyModal>
          <ModalContainer
            // zIndex={2} onClick={ConfirmFormSubmit}
            childComponent={
              <>
                <form action="#" onSubmit={ConfirmFormSubmit}>
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
                      disabled={enableSubmit}
                      style={{ backgroundColor: "#169C50" }}
                    >
                      Disqualify
                    </button>
                  </div>
                </form>
              </>
            }
          />
        </MyModal>
      )}
      <div>
        {PopupAddCanLead && (
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div className="p-2" style={{ width: "800px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="fs-4">
                        <b>Candidate Lead Generation</b>
                      </div>
                      <div
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setIsPopupAddCanLead(false);
                        }}
                      >
                        <AiOutlineClose />
                      </div>
                    </div>
                    <div
                      className=""
                      style={{ height: "65vh", overflow: "auto" }}
                    >
                      <CandidateLead
                        oncloseLead={() => setIsPopupAddCanLead(false)}
                        Reloadresponse={Reloadresponse}
                      />
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
        )}
        {ShowTimeline.show && (
          <MyModal>
            <ModalContainer
              childComponent={
                <CandidateLeadTimeline canLeadId={currentLeadDetail.id} />
              }
            />
          </MyModal>
        )}
      </div>
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
                {/* <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Follow up for
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Follow up for"
                    value={selectedValue}
                    style={{ marginBottom: "16px", minWidth: "120px" }}
                    error={followupError.selectEvent}
                    onChange={(event) => {
                      setSelectedValue(event.target.value);
                      setFollowupError((prev) => ({
                        ...prev,
                        selectEvent: false,
                      }));
                    }}
                  >
                    {eventData.map((event) => (
                      <MenuItem key={event.id} value={event.eventName}>
                        {event.eventName}
                      </MenuItem>
                    ))}
                  </Select>
                  {followupError.selectEvent && (
                    <span style={{ color: "#d44349" }}>
                      Select event is empty
                    </span>
                  )}
                </FormControl> */}

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
      {showSuccess && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={<SuccessTick HeadText="Successfully Updated" />}
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
      {leadUpdateForm && (
        <MyModal>
          <ModalContainer
            zIndex="1000"
            childComponent={
              <>
                <div className="d-flex justify-content-end">
                  <div
                    className="btn btn-outline-danger"
                    onClick={() => setLeadUpdateForm(false)}
                  >
                    <AiOutlineClose />
                  </div>
                </div>
                <CandidateLeadupdate
                  Reloadresponse={Reloadresponse}
                  prefilldata={prefilldata}
                />
              </>
            }
          />
        </MyModal>
      )}
    </>
  );
}

export default CandidateLeadTable;
