/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import style from "../../candidatePipeline/pipeline.module.scss";
import { Autocomplete, Pagination, TextField } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GetCandidatePipeline,
  GetNotAttendEvent,
  PutCandidateInterviewFollowup,
  UpdateAttendingPipelineStatus,
  UpdateCanPipelineStatus,
  UpdateFollowup1PipelineStatus,
  getCandidateLead,
  getJobRole,
  getcandidateDetails,
} from "../../../../apiServices";
import {
  MyModal,
  addDaysToDate,
  dateFormate,
  getCurrentDateTime,
  modifyDate,
} from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import {
  CandidatePipelineActions,
  commonPopupActions,
} from "../../../../redux-store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HiOutlineRefresh } from "react-icons/hi";

import { BsThreeDotsVertical } from "react-icons/bs";
import { LoadingButton } from "@mui/lab";
import { IoMdClose } from "react-icons/io";
import AttendingConnectingQualifyingFilter from "./connectingQualifyingFilter";
import SuccessTick from "../../../../components/success_tick";
import { AiOutlineClose } from "react-icons/ai";
import StatusOfferRejectedFilter from "./offerRejectedFilter";
import StatusNotSelectedFilter from "./notSelectedFilter";

function NotSelectedPipeline() {
  const [leadData, setLeadData] = useState({
    data: [],
  });

  let filterDetails = useSelector(
    (state) => state.CandidatePipelineDetails.interviewStatusNotSelected
  );

  let refreshPage = useSelector(
    (state) => state.CandidatePipelineDetails.refreshCountIncrement
  );

  const [showFilter, setShowFilter] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [leadDetails, setleadDetails] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [popups, setShowPopups] = useState({
    callRemainder: false,
    notAttend: false,
    success: false,
    confirmation: false,
    Reschedule: false,
    NotInterstedConfirmation: false,
  });
  const [callRemainder, setCallRemainder] = useState({
    notes: "",
    date: null,
  });
  const [selectedDate, setSelectedDate] = useState({
    tentativeInterviewDate: null,
    followUpDate1: null,
  });
  const [validity, setValidity] = useState({
    isFollowDate1: true,
    isFollowDate2: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [options, setOptions] = useState({ jobRoles: [] });
  const [companyNameError, setCompanyNameError] = useState(false);
  const [jobCategoryError, setJobCategoryError] = useState(false);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [notAttendEventArray, setNotAttendEventArray] = useState([]);
  const [notAttendEvent, setNotAttendEvent] = useState("");
  const [eventError, setEventError] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [showRedDot, setShowRedDot] = useState(false);
  const Dispatch = useDispatch();

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
    let data = await GetCandidatePipeline(filterDetails);

    if (data.status == "success") {
      setLeadData(data);
      setTotalCount(data.totalElements);
    } else {
      setLeadData({
        data: [],
      });
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

  function paginationChange(event, page) {
    Dispatch(
      CandidatePipelineActions.setPageChange({
        type: "interviewStatusNotSelected",
        value: page - 1,
      })
    );
  }
  function showNotattend(value) {
    setShowPopups((prev) => ({ ...prev, notAttend: value }));
  }
  function handleOpenConfirmFollowUp(value) {
    setShowPopups((prev) => ({ ...prev, confirmation: value }));
  }
  function handleOpenNotIntersted(value) {
    setShowPopups((prev) => ({ ...prev, NotInterstedConfirmation: value }));
  }
  function handleOpenReschdule(value) {
    setShowPopups((prev) => ({ ...prev, Reschedule: value }));
  }
  function handleCallRemainder(value) {
    setShowPopups((prev) => ({ ...prev, callRemainder: value }));
  }
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
      connectingQualify: true,
      dates:
        callRemainder.date instanceof Date
          ? callRemainder.date.toISOString().split("T").join(" ")
          : callRemainder.date.split("T").join(" "),
      notes: callRemainder.notes,
      mn: leadDetails.mobileNumber,
    };
    setShowLoader(true);
    UpdateFollowup1PipelineStatus(obj)
      .then((res) => {
        setShowLoader(false);
        handleCallRemainder(false);
        handleCallRemainderChange("date", "");
        setCallRemainder({
          notes: "",
          date: "",
        });
        Dispatch(CandidatePipelineActions.setRefreshCount());
      })
      .catch((error) => {
        console.error("Error submitting call remainder:", error);
        setShowLoader(false);
        // Handle error state or message display
      });
  }
  function submitconfirmed() {
    let obj = {
      Attending: true,
      mn: leadDetails.mobileNumber,
    };
    UpdateAttendingPipelineStatus(obj).then(() => {
      handleOpenConfirmFollowUp(false);
      Dispatch(CandidatePipelineActions.setRefreshCount());
    }, []);
  }
  function submitNotIntersted(e) {
    e.preventDefault();
    if (!callRemainder.notes) {
      // setDateTimeError(!callRemainder.notes);
      return;
    }

    let obj = {
      notIntersted: true,
      notes: callRemainder.notes,
      mn: leadDetails.mobileNumber,
    };
    setShowLoader(true);
    UpdateAttendingPipelineStatus(obj)
      .then((res) => {
        setShowLoader(false);
        handleOpenNotIntersted(false);
        setCallRemainder({
          notes: "",
          // date: "",
        });
        Dispatch(CandidatePipelineActions.setRefreshCount());
      })
      .catch((error) => {
        console.error("Error submitting call remainder:", error);
        setShowLoader(false);
        // Handle error state or message display
      });
  }
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

  const dateDiff = Math.ceil(
    (selectedDate.tentativeInterviewDate - new Date()) / (1000 * 60 * 60 * 24)
  );
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
      leadDetails.id,
      selectedDate,
      selectedCompany,
      selectedJobCategory,
      true
    )
      .then((data) => {
        setShowSuccess(true);
        console.log(data, "interviewFollowDate");
        setTimeout(() => {
          setShowSuccess(false);
          handleOpenReschdule(false);
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
  useEffect(() => {
    getJobRole(1).then((data) => {
      let jobRoles = data.results.map((el) => el.jobRoles);
      setOptions((prev) => ({ ...prev, jobRoles: [...jobRoles] }));
    });
  }, []);
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
    page: 0,
    followupStatus: -1,
    stages: 25,
    pipelineStage: "Interview Not Selected",
    startDate: dateFormate(modifyDate("sub", 7)),
    endDate: dateFormate(new Date()),
  };

  function ShowRedDot(obj1, obj2) {
    // Omitting the 'page' key from both objects
    const obj1WithoutPage = { ...obj1 };
    delete obj1WithoutPage.page;

    const obj2WithoutPage = { ...obj2 };
    delete obj2WithoutPage.page;

    console.log(
      obj1WithoutPage,
      obj2WithoutPage,
      "Helooooooooooooooooooooooooooooojjjjjjjddddd"
    );

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
  const formattedDateTime = getCurrentDateTime();
  console.log(formattedDateTime, "CurrentDateandTime");
  function submitNotAttend() {
    if (notAttendEvent === "") {
      setEventError("Please select an event.");
      return;
    }
    let obj = {
      notAttend: true,
      event: notAttendEvent,
      // date: formattedDateTime,
      mn: leadDetails.mobileNumber,
    };
    UpdateFollowup1PipelineStatus(obj).then(() => {
      showNotattend(false);
      setNotAttendEvent("");
      Dispatch(CandidatePipelineActions.setRefreshCount());
    }, []);
  }
  return (
    <div className={`${style.pipelineContainer} mx-2`}>
      <div className={`${style.headerCard} p-2 d-flex justify-content-between`}>
        <b> Not Selected ({totalCount})</b>{" "}
        <div className="mt-1">
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
            style={{ cursor: "pointer", color: "#858585" }}
            className="d-inline-block mx-2"
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
            <div className={`${style.bodyCard} p-1 `}>
              <div className={`${style.textContent} p-1 `}>
                <b
                  onClick={() => {
                    handleCandidateDetails(el.id, "RegisterCandidate");
                  }}
                  className="text-success"
                  style={{ cursor: "pointer" }}
                >
                  {el.firstName ? el.firstName : "-"}{" "}
                  {el.lastName ? el.lastName : ""}
                </b>{" "}
                <br />
                {el.jobCategory ? el.jobCategory : "-"}
                <div className="d-flex justify-content-between">
                  <div>{el.mobileNumber ? el.mobileNumber : "-"}</div>
                  <b
                    style={{
                      border: "1px solid yellow",
                      backgroundColor: "lightyellow",
                      fontSize: "10px",
                      borderRadius: "8px",
                      // marginRight: "18px",
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

              {/* <div
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
                      <li onClick={handleOpenNotIntersted}>
                        <a className="dropdown-item" href="#">
                          Not Intersted
                        </a>
                      </li>
                      <li onClick={handleOpenReschdule}>
                        <a className="dropdown-item" href="#">
                          Reschedule
                        </a>
                      </li>
                      <li onClick={handleOpenConfirmFollowUp}>
                        <a className="dropdown-item" href="#">
                          Attending
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div></div>
              </div> */}
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
          onChange={paginationChange}
          count={leadData.totalPages}
          size="small"
        />
      </div>

      {showFilter && (
        <MyModal>
          <ModalContainer
            // zIndex={2}
            childComponent={
              <>
                <StatusNotSelectedFilter
                  onclose={() => {
                    setShowFilter(false);
                  }}
                />
              </>
            }
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
                    <h4 className=""> Confirmation </h4>
                    <div>
                      Are you sure that you want to attending{" "}
                      <b>
                        {" "}
                        {leadDetails.firstName} {leadDetails.lastName}
                      </b>
                      ?
                    </div>
                    <div className="d-flex justify-content-end flex-row mt-3 ">
                      <button
                        onClick={() => {
                          handleOpenConfirmFollowUp(false);
                        }}
                        className="btn btn-danger mx-3"
                      >
                        No
                      </button>{" "}
                      <button
                        onClick={submitconfirmed}
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
      {popups.NotInterstedConfirmation && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div style={{ width: "380px" }}>
                    {" "}
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-center">Confirmation </h5>

                      <span
                        onClick={() => {
                          handleOpenNotIntersted(false);
                        }}
                        className="btn btn-outline-danger btn-sm"
                      >
                        {" "}
                        <AiOutlineClose />
                      </span>
                    </div>
                    <form onSubmit={(e) => submitNotIntersted(e)}>
                      <div className="mt-2">
                        <span>
                          Are you sure that you want to not intersted{" "}
                          <b>
                            {leadDetails.firstName} {leadDetails.lastName}
                          </b>{" "}
                          ?
                        </span>{" "}
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
      {popups.Reschedule && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div style={{ width: "400px" }}>
                    {" "}
                    <div className="d-flex justify-content-between mb-3">
                      <h4 className="text-center">Reschedule </h4>
                      <span
                        onClick={() => {
                          handleOpenReschdule(false);
                          setValidity((prev) => ({
                            ...prev,
                            isFollowDate1: "",
                            isFollowDate2: "",
                          }));
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
                        }}
                        className="btn btn-outline-danger"
                      >
                        {" "}
                        <IoMdClose />
                      </span>
                    </div>
                    <form action="#" onSubmit={(e) => handleSubmitUpdate(e)}>
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
                              selected={selectedDate.tentativeInterviewDate}
                              onChange={(date) =>
                                handleDateChange(date, "tentativeInterviewDate")
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
                                <div className="" style={{ color: "red" }}>
                                  Please select a date.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="row mt-2">
                        <label htmlFor="">
                          <b>Enter company name and select job category :</b>
                        </label>
                        <div className="col-sm-12 mt-2 d-flex gap-3 align-item-center">
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
                              value={selectedCompany}
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
                        {/* <div
                          className="btn btn-danger px-4"
                          onClick={handleInterviewDateClose}
                        >
                          Close
                        </div> */}
                        <button className="btn btn-success px-4" type="submit">
                          Submit
                        </button>
                      </div>
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
      {showSuccess && (
        <MyModal>
          <ModalContainer
            childComponent={
              <>
                <SuccessTick HeadText={"Successfully"} />
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default NotSelectedPipeline;
