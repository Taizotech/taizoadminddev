/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import style from "../pipeline.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Autocomplete, Pagination, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import { FaFilter, FaPlus } from "react-icons/fa";
import accordionstyle from "../../../Candidate/CandidateQualifyForm/QualifyForm.module.scss";
import {
  GetCanLeadPipeline,
  GetCandidatePipeline,
  GetCandidateQualifyDetials,
  GetNotAttendEvent,
  PutCandidateType,
  PutMetaLeadAssignToAdmin,
  UpdateCanPipelineStatus,
  getCandidateLead,
  getcandidateDetails,
} from "../../../../apiServices";
import {
  MyModal,
  addDaysToDate,
  dateFormate,
  dateAndTimeFormate,
  dateAndTimeHHMMSS,
  getCurrentDateTime,
  addHoursAndMinutesToDate,
} from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import {
  CandidatePipelineActions,
  commonPopupActions,
} from "../../../../redux-store/store";
import { useDispatch } from "react-redux";
import LeadPipelineFilter from "./LeadPipelineFilter";
import { useSelector } from "react-redux";
import QualifyFresherform from "../../../Candidate/CandidateQualifyForm/FresherForm";
import { AiOutlineClose } from "react-icons/ai";
import ExperienceForm from "../../../Candidate/CandidateQualifyForm/ExperienceForm";
import SuccessTick from "../../../../components/success_tick";
import { IoMdClose } from "react-icons/io";
import { LoadingButton } from "@mui/lab";
import { TfiImport } from "react-icons/tfi";
import { HiOutlineRefresh } from "react-icons/hi";
import CandidateLead from "../../../Candidate/CandidateLeadTable/CandidateLeadPostForm";

function LeadGenerationPipeline() {
  const [leadData, setLeadData] = useState({
    data: [],
  });

  let filterDetails = useSelector(
    (state) => state.CandidatePipelineDetails.leadGenerationFilter
  );
  let filterDetailscandidate = useSelector(
    (state) => state.CandidatePipelineDetails.candidateFilter
  );
  let refreshPage = useSelector(
    (state) => state.CandidatePipelineDetails.refreshCountIncrement
  );

  const [showFilter, setShowFilter] = useState(false);
  const [leadQualifyFormOpen, setLeadQualifyFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [leadDetails, setleadDetails] = useState("");
  const [showSuccessForm, setshowSuccessForm] = useState("");
  const [popups, setShowPopups] = useState({
    PopupAddCanLead: false,
    callRemainder: false,
    success: false,
    confirmation: false,
    notAttendConfiramtion: false,
  });
  const [showLoader, setShowLoader] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [date, setDate] = React.useState(new Date());
  const [callRemainder, setCallRemainder] = useState({
    notes: "",
    date: null,
  });
  const [notAttendEventArray, setNotAttendEventArray] = useState([]);
  const [notAttendEvent, setNotAttendEvent] = useState("");
  const [eventError, setEventError] = useState("");
  const [showRedDot, setShowRedDot] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const Dispatch = useDispatch();
  const currentDate = new Date();
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  const maxDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

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

  async function fetchData() {
    setIsRotating(true);
    let data = await GetCanLeadPipeline(filterDetails);

    if (data.status) {
      setLeadData(data);
      let firstData = data.data.shift();
      // console.log(firstData, "heloooooooooooooooooooos");
      setLeadData((prev) => ({ ...prev, data: [firstData] }));
      setTotalCount(data.totalElements);
    } else {
      setLeadData({
        data: [],
      });
      setTotalCount(0);
      setTotalCount(0);
    }
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  }
  useEffect(() => {
    fetchData();
    setShowRedDot(ShowRedDot(initialFilterObj, filterDetails));
  }, [filterDetails, refreshPage]);

  let initialFilterObj = {
    mobileNumber: -1,
    assignTo: localStorage.getItem("adminID"),
    profilePageNo: -1,
    fromSource: "",
    jobCategory: "",
    currentStatus: "",
    dateFilterType: "",
    // createdTimeStart: "2020-01-01",
    // createdTimeEnd: dateFormate(addDaysToDate(1)),
    expYearsMax: -1,
    expYearsMin: -1,
    page: "",
    currentPipeline: "New candidate lead",
    stages: 1,
    pipelineStage: "New leads",
    startDate: dateFormate(new Date()),
    endDate: dateFormate(new Date()),
  };

  function ShowRedDot(obj1, obj2) {
    // Omitting the 'page' key from both objects
    const obj1WithoutPage = { ...obj1 };
    delete obj1WithoutPage.page;

    const obj2WithoutPage = { ...obj2 };
    delete obj2WithoutPage.page;
    for (let key in obj1WithoutPage) {
      if (obj1WithoutPage.hasOwnProperty(key)) {
        if (obj1WithoutPage[key] !== obj2WithoutPage[key]) {
          return true;
        }
      }
    }
    return false;
  }

  function handleOpenQualifyForm() {
    setLeadQualifyFormOpen(true);
    GetCandidateQualifyDetials(leadDetails.mobileNumber)
      .then((data) => {
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
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    let experiencedValue = false;
    if (selectedValue === "experience") {
      experiencedValue = true;
    }

    PutCandidateType(experiencedValue, leadDetails.mobileNumber, "").then(
      (data) => {
        console.log(
          "Data Format",
          data,
          "mobile number ",
          leadDetails.mobileNumber
        );
      }
    );
  };
  function handleCloseQualifyForm() {
    setSelectedOption("");
    setLeadQualifyFormOpen(false);
    fetchData();
  }
  async function candidateDetils() {
    try {
      const data = await GetCandidatePipeline(filterDetailscandidate);

      const firstCandidate = data.data.length > 0 ? data.data[0] : null;

      console.log(firstCandidate, "firstCandidate");

      if (firstCandidate) {
        // const { candidateleadId, type } = firstCandidate;
        handleCandidateDetails(firstCandidate.id, "RegisterCandidate");

        Dispatch(CandidatePipelineActions.setRefreshCount());
      } else {
        console.log("No candidates found in the data.");
      }
    } catch (error) {
      console.error("Error fetching candidate pipeline data:", error);
    }
  }
  function handleQualifyFormSubmit() {
    setshowSuccessForm(true);

    setTimeout(() => {
      setshowSuccessForm(false);
      setSelectedOption("");
      setLeadQualifyFormOpen(false);
    }, 1000);

    fetchData();
    // candidateDetils();
    getMetaLead();
  }
  function handleQualifyFormSubmitupdate() {
    setshowSuccessForm(true);

    setTimeout(() => {
      setshowSuccessForm(false);
      setSelectedOption("");
      setLeadQualifyFormOpen(false);
    }, 1000);

    fetchData();
    //  candidateDetils();
    getMetaLead();
  }

  function paginationChange(event, page) {
    Dispatch(
      CandidatePipelineActions.setPageChange({
        type: "leadGenerationFilter",
        value: page - 1,
      })
    );
  }

  function handleCallRemainder(value) {
    setShowPopups((prev) => ({ ...prev, callRemainder: value }));
  }
  function handleCallNotAttend(value) {
    setShowPopups((prev) => ({ ...prev, notAttendConfiramtion: value }));
  }
  function showNotQualify(value) {
    setShowPopups((prev) => ({ ...prev, confirmation: value }));
  }

  // function handleCallRemainderChange(name, value) {
  //   if (name === "date" && value instanceof Date) {
  //     // Extract the date value in the required format
  //     const formattedDate = dateFormate(value.toISOString()); // or any other format that suits your backend
  //     setCallRemainder((prev) => ({ ...prev, [name]: formattedDate }));
  //   } else {
  //     setCallRemainder((prev) => ({ ...prev, [name]: value }));
  //   }
  // }

  // function submitCallRemainder(e) {
  //   e.preventDefault();
  //   let obj = {
  //     callRemainder: dateFormate(callRemainder.date),
  //     notes: callRemainder.notes,
  //     id: leadDetails.id,
  //   };
  //   setShowLoader(true);
  //   UpdateCanPipelineStatus(obj).then((res) => {
  //     setShowLoader(false);
  //     handleCallRemainder(false);
  //     setCallRemainder({
  //       notes: "",
  //       date: "",
  //     });
  //     Dispatch(CandidatePipelineActions.setRefreshCount());
  //     getMetaLead();
  //   });
  // }

  function handleCallRemainderChange(name, value) {
    console.log(value, "date formate");
    if (name === "date") {
      setDateTimeError(false);
      setCallRemainder((prev) => ({ ...prev, [name]: value }));
    } else {
      setCallRemainder((prev) => ({ ...prev, [name]: value }));
    }
  }

  function submitCallRemainder(e) {
    e.preventDefault();
    if (!callRemainder.date || !callRemainder.notes) {
      setDateTimeError(!callRemainder.date);
      return;
    }

    let obj = {
      callRemainder:
        callRemainder.date instanceof Date
          ? callRemainder.date.toISOString().split("T").join(" ")
          : callRemainder.date.split("T").join(" "),
      notes: callRemainder.notes,
      id: leadDetails.id,
    };
    setShowLoader(true);
    UpdateCanPipelineStatus(obj)
      .then((res) => {
        setShowLoader(false);
        handleCallRemainder(false);
        handleCallRemainderChange("date", ""); // Reset date after successful submission
        setCallRemainder({
          notes: "",
          date: "", // Reset date in state after submission
        });
        Dispatch(CandidatePipelineActions.setRefreshCount());
        getMetaLead();
      })
      .catch((error) => {
        console.error("Error submitting call remainder:", error);
        setShowLoader(false);
        // Handle error state or message display
      });
  }
  const formattedDateTime = getCurrentDateTime();
  console.log(formattedDateTime, "CurrentDateandTime");

  function submitNotQualified(e) {
    e.preventDefault();
    if (!callRemainder.notes) {
      // setDateTimeError(!callRemainder.date);
      return;
    }
    let obj = {
      notQualified: true,
      notes: callRemainder.notes,
      date: formattedDateTime,
      id: leadDetails.id,
    };
    UpdateCanPipelineStatus(obj).then(() => {
      showNotQualify(false);
      setCallRemainder({
        notes: "",
      });
      Dispatch(CandidatePipelineActions.setRefreshCount());
      getMetaLead();
    }, []);
  }
  function submitNotAttend() {
    if (notAttendEvent === "") {
      setEventError("Please select an event.");
      return;
    }
    let obj = {
      notAttend: true,
      event: notAttendEvent,
      date: formattedDateTime,
      id: leadDetails.id,
    };
    UpdateCanPipelineStatus(obj).then(() => {
      handleCallNotAttend(false);
      setNotAttendEvent("");
      Dispatch(CandidatePipelineActions.setRefreshCount());
      getMetaLead();
    }, []);
  }

  function getMetaLead() {
    PutMetaLeadAssignToAdmin().then((res) => {
      Dispatch(CandidatePipelineActions.setRefreshCount());
    });
  }

  function ShowRedDot(obj1, obj2) {
    // Omitting the 'page' key from both objects
    const obj1WithoutPage = { ...obj1 };
    delete obj1WithoutPage.page;

    const obj2WithoutPage = { ...obj2 };
    delete obj2WithoutPage.page;
    for (let key in obj1WithoutPage) {
      if (obj1WithoutPage.hasOwnProperty(key)) {
        if (obj1WithoutPage[key] !== obj2WithoutPage[key]) {
          return true;
        }
      }
    }
    return false;
  }
  useEffect(() => {
    GetNotAttendEvent().then((data) => {
      console.log(data, "status");
      setNotAttendEventArray(data);
    });
  }, []);
  return (
    <div className={`${style.pipelineContainer} mx-2`}>
      <div className={`${style.headerCard} p-2 d-flex justify-content-between`}>
        <div>
          <b>Candidate Lead ({totalCount}) </b>
        </div>
        <div className="mt-0">
          <div className="d-inline-block ">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                getMetaLead();
              }}
            >
              {" "}
              <TfiImport />
            </span>
          </div>{" "}
          <div className="d-inline-block mx-2">
            <span
              // style={{ cursor: "pointer", color: "#858585" }}
              onClick={() => {
                setShowPopups({
                  PopupAddCanLead: true,
                });
              }}
            >
              {" "}
              <FaPlus className={style.faplus} />
            </span>
          </div>{" "}
          <div className="d-inline-block">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                fetchData();
              }}
            >
              {" "}
              <HiOutlineRefresh
                className={`${
                  isRotating ? style.refreshRotate : style.refreshcolor
                }`}
              />
            </span>
          </div>{" "}
          <div
            onClick={() => {
              setShowFilter(true);
            }}
            className="d-inline-block mx-2 "
            style={{ cursor: "pointer", color: "#858585" }}
          >
            <FaFilter />
            <p
              style={{
                backgroundColor: showRedDot ? "red" : "transparent",
                width: "9px",
                height: "9px",
                marginTop: "-12px",
                zIndex: 1000,
                marginLeft: "10px",
                borderRadius: "50%",
              }}
            ></p>{" "}
          </div>
        </div>
      </div>

      <div className={`${style.bodyContainer}`}>
        {leadData.data.map((el) => (
          <div
            key={el.id}
            onClick={() => {
              setleadDetails(el);
            }}
          >
            <div className={`${style.bodyCard}  `}>
              <div className={`${style.textContent} p-1 `}>
                <b
                  onClick={() => {
                    handleCandidateDetails(el.id, "CandidateLead");
                  }}
                  style={{ cursor: "pointer" }}
                  className={style.candidateName}
                >
                  {el.name ? el.name : "-"} {el.lastName ? el.lastName : ""}
                </b>{" "}
                <br />
                {el.jobCategory ? el.jobCategory : "-"}
                <br />
                <div className="d-flex justify-content-between">
                  <div>{el.mobileNumber ? el.mobileNumber : "-"}</div>
                  <b
                    style={{
                      border: "1px solid yellow",
                      backgroundColor: "lightyellow",
                      fontSize: "10px",
                      borderRadius: "8px",
                      marginRight: "18px",
                      padding: "4px",
                    }}
                  >
                    {el.fromSource === "Retention"
                      ? "Old lead"
                      : el.fromSource === null
                      ? "Meta lead"
                      : el.fromSource}
                  </b>
                </div>
              </div>
              <div
                style={{ marginTop: "-20px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <div className="dropdown">
                    <span
                      style={{ cursor: "pointer" }}
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BsThreeDotsVertical />
                    </span>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li
                        onClick={() => {
                          handleOpenQualifyForm();
                        }}
                      >
                        <a className="dropdown-item" href="#">
                          Qualified
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            showNotQualify(true);
                          }}
                          className="dropdown-item"
                          href="#"
                        >
                          Not Qualified
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            handleCallNotAttend(true);
                          }}
                          className="dropdown-item"
                          href="#"
                        >
                          Not Attend
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            handleCallRemainder(true);
                          }}
                          className="dropdown-item"
                          href="#"
                        >
                          Call Remainder
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 d-grid justify-content-center">
        <Pagination
          // variant="outlined"
          shape="rounded"
          color="success"
          boundaryCount={1}
          siblingCount={0}
          // onChange={paginationChange}
          // count={leadData.totalPages}
          size="small"
        />
      </div>

      {showFilter && (
        <MyModal>
          <ModalContainer
            // zIndex={2}
            childComponent={
              <>
                <LeadPipelineFilter
                  onclose={() => {
                    setShowFilter(false);
                  }}
                />
              </>
            }
          />
        </MyModal>
      )}

      {leadQualifyFormOpen && (
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
                        <b>Candidate lead qualify form</b>
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
                            mobilenumber={leadDetails.mobileNumber}
                            whatsappNumber={leadDetails.whatsappNumber}
                            Reloadpage={handleQualifyFormSubmit}
                          />
                          {/* </div> */}
                        </>
                      ) : selectedOption === "experience" ? (
                        // <ExperinenceWorkingform
                        //   mobilenumber={leadDetails.mobileNumber}
                        // />
                        <ExperienceForm
                          mobileNumber={leadDetails.mobileNumber}
                          whatsappNumber={leadDetails.whatsappNumber}
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
      {showSuccessForm && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={<SuccessTick HeadText="Successfully Submit" />}
          />
        </MyModal>
      )}

      {popups.confirmation && (
        <>
          <MyModal>
            <ModalContainer
              zIndex="5000"
              childComponent={
                <>
                  <div>
                    <h5 className=""> Confirmation </h5>
                    <div>
                      Are you sure that you want to not qualify{" "}
                      <b>
                        {" "}
                        {leadDetails.name} {leadDetails.lastName}{" "}
                      </b>
                      ?
                    </div>
                    <form action="#" onSubmit={(e) => submitNotQualified(e)}>
                      <div>
                        {" "}
                        <TextField
                          label="Add Notes"
                          multiline
                          value={callRemainder.notes}
                          onChange={(e) => {
                            handleCallRemainderChange("notes", e.target.value);
                          }}
                          variant="outlined"
                          fullWidth
                          required
                          margin="normal"
                        />
                      </div>
                      <div className="d-flex justify-content-end flex-row mt-3 ">
                        <button
                          onClick={() => {
                            showNotQualify(false);
                          }}
                          className="btn btn-danger mx-3"
                        >
                          No
                        </button>{" "}
                        <button className="btn btn-success">Yes</button>
                      </div>
                    </form>
                  </div>
                </>
              }
            />
          </MyModal>
        </>
      )}
      {popups.notAttendConfiramtion && (
        <>
          <MyModal>
            <ModalContainer
              // zIndex="5000"
              childComponent={
                <>
                  <div>
                    <h5 className=""> Confirmation </h5>
                    <div>
                      Are you sure that you want to not attend{" "}
                      <b>
                        {" "}
                        {leadDetails.name} {leadDetails.lastName}
                      </b>
                      , please select <b>event</b>?
                    </div>
                    <div>
                      <Autocomplete
                        id="tags-outlined"
                        className="mt-3"
                        options={notAttendEventArray.map((option) => option)}
                        fullWidth
                        getOptionLabel={(option) => option}
                        value={notAttendEvent}
                        onChange={(e, newValue) => {
                          setNotAttendEvent(newValue);
                          console.log(newValue);
                          setEventError("");
                        }}
                        required
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Event"
                            placeholder="Event"
                          />
                        )}
                      />
                      {eventError && (
                        <div className="text-danger">{eventError}</div>
                      )}
                    </div>
                    <div className="d-flex justify-content-end flex-row mt-3 ">
                      <button
                        onClick={() => {
                          handleCallNotAttend(false);
                          setNotAttendEvent("");
                          setEventError("");
                        }}
                        className="btn btn-danger mx-3"
                      >
                        No
                      </button>{" "}
                      <button
                        onClick={submitNotAttend}
                        className="btn btn-success"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </>
              }
            />
          </MyModal>
        </>
      )}

      {popups.callRemainder && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div style={{ width: "300px" }}>
                    {" "}
                    <div className="d-flex justify-content-between mb-3">
                      <h4 className="text-center">Call Remainder</h4>
                      <span
                        onClick={() => {
                          handleCallRemainder(false);
                        }}
                        className="btn btn-outline-danger"
                      >
                        {" "}
                        <IoMdClose />
                      </span>
                    </div>
                    <form onSubmit={(e) => submitCallRemainder(e)}>
                      {/* <div>
                      {" "}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Select date and time"
                          value={callRemainder.date}
                          onChange={(newValue) => {
                            handleCallRemainderChange("date", newValue);
                          }}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              error={dateTimeError}
                              helperText={
                                dateTimeError
                                  ? "Please select a date and time"
                                  : ""
                              }
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div> */}
                      <label htmlFor="">Follow up date : </label>
                      <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        min={currentDate.toISOString().slice(0, -8)}
                        max={maxDate.toISOString().slice(0, -8)}
                        className="form-control"
                        onChange={(e) => {
                          const inputDateTime = e.target.value;
                          const formattedDateTime = inputDateTime + ":00"; // Append ":00" for seconds
                          handleCallRemainderChange("date", formattedDateTime);
                        }}
                        required
                      />

                      <div>
                        {" "}
                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ClockPicker
                          date={date}
                          onChange={(newDate) => setDate(newDate)}
                        />
                      </LocalizationProvider> */}
                      </div>

                      <div>
                        {" "}
                        <TextField
                          label="Add Notes"
                          multiline
                          value={callRemainder.notes}
                          onChange={(e) => {
                            handleCallRemainderChange("notes", e.target.value);
                          }}
                          variant="outlined"
                          fullWidth
                          required
                          margin="normal"
                        />
                      </div>
                      <LoadingButton
                        type="submit"
                        loading={showLoader}
                        variant="outlined"
                      >
                        <span>Submit</span>
                      </LoadingButton>
                    </form>
                  </div>

                  {/* <div className="d-flex flex-row justify-content-end mt-3  ">
                      <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          setShowPopups((prev) => ({
                            ...prev,
                            callRemainder: false,
                          }));
                        }}
                      >
                        Close
                      </button>
                      <button className="btn btn-success" type="submit">
                        Submit
                      </button>
                    </div> */}
                </>
              }
            />
          </MyModal>
        </>
      )}
      {popups.PopupAddCanLead && (
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
                        setShowPopups({
                          PopupAddCanLead: false,
                        });
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
                      oncloseLead={() =>
                        setShowPopups((prev) => ({
                          ...prev,
                          PopupAddCanLead: false,
                        }))
                      }
                      Reloadresponse={fetchData}
                    />
                  </div>
                </div>
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default LeadGenerationPipeline;
