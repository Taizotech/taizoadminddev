/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import interviewStyle from "./pages/Candidate/Candidate interview schedule list/candidateInterviewSchedule.module.scss";
import { GetcanInterviews, PutInterviewStatus } from "./apiServices";
import { commonPopupActions, interviewListActions } from "./redux-store/store";
import ScheduleInterviewFilter from "./pages/Candidate/Candidate interview schedule list/interviewFilter";
import InterviewReschedule from "./pages/Candidate/CandidateInterview/interviewReschedule.";
import ConfirmationPopup from "./components/ModalPopups/confirmationPopup";
import ModalContainer from "./components/modal_popup";
import { DMMMYYYY_formate, MyModal } from "./utility";
import Nojoid from "./pages/Candidate/Candidate interview schedule list/Nojoid";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { Tooltip } from "chart.js";
import { useDispatch, useSelector } from "react-redux";

// import { Dropdown } from "bootstrap";

function RecentActivity({ data }) {
  const date = {
    rescheduledDateTime: data.rescheduledDateTime,
    joinedOn: data.joinedOn,
    selectedOn: data.selectedOn,
    notSelectedOn: data.notSelectedOn,
    offerRejectedOn: data.offerRejectedOn,
    notAttendedOn: data.notAttendedOn,
    attendedOn: data.attendedOn,
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
      return <div className={`${interviewStyle.Attended}`}>Attended</div>;
    }
  }

  return "";
}
function Reference({ width }) {
  //   const isSmallScreen = isWidthDown("md", width);
  //   const isMobileView = useMediaQuery("(max-width:992px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [CandidateInterviewList, setCandidateInterviewList] = React.useState(
    []
  );
  const selectedCandidateID = CandidateInterviewList.find(
    (candidate) => candidate.CanInterviewsModel.id
  );
  const [interviewStatus, setInterviewStatus] = useState({
    id: selectedCandidateID,
    statusfield: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [currentInterviewId, setCurrentInterviewId] = useState("");

  const [contactPersonName, setContactPersonName] = useState("");
  const [contactID, setcontactID] = useState("");
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
  const jobCategory = useSelector(
    (state) => state.interviewListDetails.interviewFilter.jobCategory
  );
  const [open, setOpen] = useState(false);

  const handleClick = (id, event) => {
    setCurrentInterviewId(id);
    console.log(id, "candidate id");
    // // setOpen((prevOpen) => !prevOpen);
    // console.log("Clicked on candidate with ID:", id);
    // setAnchorEl(anchorEl ? event.currentTarget : event.currentTarget);
    // setOpen((prevOpen) => !prevOpen);
  };
  const inputRef = {
    attended: useRef(),
    notAttended: useRef(),
    selected: useRef(),
    notSelected: useRef(),
    offerRejected: useRef(),
    joined: useRef(),
    // rescheduled: useRef(),
  };
  const buttonRef = useRef(null);
  const handleButtonClick = (refName) => {
    const ref = inputRef[refName];
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleRadioBtn = (candidateId, statusFieldName, event) => {
    // let isChecked = event.target.checked;
    console.log(event, "hai hai hai ");
    if (!event || event) {
      handleConfirmationOpen();
      setInterviewStatus((prev) => ({
        ...prev,
        id: currentInterviewId,
        statusfield: statusFieldName,
      }));
      console.log(currentInterviewId, "jahjhj");
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

  function handleConfirmationClose() {
    setShowConfirmPopup(false);
  }

  function handleConfirmationOpen() {
    setShowConfirmPopup(true);
  }
  function ConfirmFormSubmit() {
    PutInterviewStatus(interviewStatus.id, interviewStatus.statusfield).then(
      () => {
        setShowConfirmPopup(false);
        GetcanInterviews(interviewFilter).then((data) => {
          const TotalPageCount = data.totalCount;
          const InterviewList = data.canInterviewList.map((item) => item);
          setCandidateInterviewList(InterviewList);
          setPageCount((prev) => ({
            ...prev,
            // totalCount: totalElements,
            totalPages: Math.ceil(data.totalCount / size),
          }));
          setOpen(false);
        });
        // setOpen(true);
      }
    );
  }
  const handlePopupDetails = (id, type) => {
    console.log(id);

    Dispatch(
      commonPopupActions.setShowPopup({
        name: type,
        id: id,
      })
    );
  };
  function Getreschedule() {
    GetcanInterviews(interviewFilter).then((data) => {
      const TotalPageCount = data.totalCount;
      const InterviewList = data.canInterviewList.map((item) => item);
      setCandidateInterviewList(InterviewList);
      setPageCount((prev) => ({
        ...prev,
        // totalCount: totalElements,
        totalPages: Math.ceil(data.totalCount / size),
      }));
    });
  }
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log(interviewFilter, "interview filter");
  }, [interviewFilter]);
  const Dispatch = useDispatch();
  React.useEffect(() => {
    GetcanInterviews(interviewFilter).then((data) => {
      console.log(data, "can");
      const InterviewList = data.canInterviewList.map((item) => item);
      setCandidateInterviewList(InterviewList);
      setPageCount((prev) => ({
        ...prev,
        // totalCount: totalElements,
        totalPages: Math.ceil(data.totalCount / size),
      }));
    });
  }, []);
  useEffect(() => {
    GetcanInterviews(interviewFilter).then((data) => {
      const TotalPageCount = data.totalCount;
      const InterviewList = data.canInterviewList.map((item) => item);
      setCandidateInterviewList(InterviewList);
      setPageCount((prev) => ({
        ...prev,
        // totalCount: totalElements,
        totalPages: Math.ceil(data.totalCount / size),
      }));
    });
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
  const handleMenuClick = (interviewid, event) => {
    setIsRescheduleOpen(true);
  };
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
        <ScheduleInterviewFilter />
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Job Category</th>
              <th>Company Name</th>
              <th>Area</th>
              <th>City</th>
              <th>Interview Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {CandidateInterviewList.length > 0 ? (
              <>
                {CandidateInterviewList.map((candidate, i) => (
                  <tr>
                    <td scope="row">
                      {candidate.CandidateModel.firstName.length > 10
                        ? `${candidate.CandidateModel.firstName.slice(
                            0,
                            20
                          )}...`
                        : candidate.CandidateModel.firstName}
                    </td>
                    <td>
                      {candidate.CandidateModel.mobileNumber
                        ? "+91 " +
                          String(
                            candidate.CandidateModel.mobileNumber
                          ).substring(0, 10)
                        : ""}
                    </td>
                    <td>
                      {" "}
                      {candidate.JobModel.jobCategory.length > 20
                        ? `${candidate.JobModel.jobCategory.slice(0, 20)}...`
                        : candidate.JobModel.jobCategory}
                    </td>
                    <td>
                      {candidate.CanInterviewsModel.companyName.length > 20
                        ? `${candidate.CanInterviewsModel.companyName.slice(
                            0,
                            20
                          )}...`
                        : candidate.CanInterviewsModel.companyName}
                    </td>
                    <td>{candidate.CanInterviewsModel.area}</td>
                    <td>{candidate.CanInterviewsModel.city}</td>
                    <td>
                      {
                        <DMMMYYYY_formate
                          dateValue={
                            !candidate.CanInterviewsModel.rescheduled
                              ? candidate.CanInterviewsModel
                                  .interviewScheduledDt
                              : candidate.CanInterviewsModel.rescheduledDate
                          }
                        />
                      }
                    </td>
                    <td>
                      <div className={`${interviewStyle.Popper}`}>
                        {interviewFilter.interviewStatus === null ? (
                          <div>
                            <RecentActivity
                              data={candidate.CanInterviewsModel}
                            />
                          </div>
                        ) : (
                          <>
                            <div className={interviewStyle.chips_wrp}>
                              {interviewFilter.interviewStatus ===
                              "isAttended" ? (
                                <>
                                  <div className={interviewStyle.Attended_wrp}>
                                    {candidate.CanInterviewsModel.attended && (
                                      <>
                                        <input
                                          type="checkbox"
                                          name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                          id={`attended_${candidate.CanInterviewsModel.id}`}
                                          checked={
                                            candidate.CanInterviewsModel
                                              .attended
                                          }
                                          onChange={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isAttended",
                                              event.target.checked
                                            )
                                          }
                                        />

                                        {candidate.CanInterviewsModel
                                          .attended && isChecked ? (
                                          <Tooltip title=" candidate attended">
                                            <label
                                              htmlFor={`attended_${candidate.CanInterviewsModel.id}`}
                                            >
                                              Attended
                                            </label>
                                          </Tooltip>
                                        ) : (
                                          <label
                                            htmlFor={`attended_${candidate.CanInterviewsModel.id}`}
                                          >
                                            Attended
                                          </label>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : null}
                              {interviewFilter.interviewStatus ===
                              "isNotAttended" ? (
                                <>
                                  <div
                                    className={interviewStyle.NotAttended_wrp}
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
                                          onChange={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isNotAttended",
                                              event.target.checked
                                            )
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

                              {interviewFilter.interviewStatus ===
                              "isSelected" ? (
                                <>
                                  <div className={interviewStyle.Selected_wrp}>
                                    {candidate.CanInterviewsModel.selected && (
                                      <>
                                        <input
                                          type="checkbox"
                                          name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                          id={`selected_${candidate.CanInterviewsModel.id}`}
                                          checked={
                                            candidate.CanInterviewsModel
                                              .selected
                                          }
                                          onChange={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isSelected",
                                              event.target.checked
                                            )
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
                              {interviewFilter.interviewStatus ===
                              "isNotSelected" ? (
                                <>
                                  <div
                                    className={interviewStyle.NotSelected_wrp}
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
                                          onChange={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isNotSelected",
                                              event.target.checked
                                            )
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
                              {interviewFilter.interviewStatus ===
                              "isOfferRejected" ? (
                                <>
                                  <div
                                    className={interviewStyle.OfferRejected_wrp}
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
                                          onChange={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isOfferRejected",
                                              event.target.checked
                                            )
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
                              {interviewFilter.interviewStatus ===
                              "isRescheduled" ? (
                                <>
                                  <div
                                    className={interviewStyle.rescheduledChips}
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

                              {interviewFilter.interviewStatus ===
                              "isJoined" ? (
                                <>
                                  <div className={interviewStyle.Joined_wrp}>
                                    {candidate.CanInterviewsModel.joined && (
                                      <>
                                        <input
                                          type="checkbox"
                                          name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                          id={`joined_${candidate.CanInterviewsModel.id}`}
                                          checked={
                                            candidate.CanInterviewsModel.joined
                                          }
                                          onChange={(event) =>
                                            handleRadioBtn(
                                              candidate.CanInterviewsModel.id,
                                              "isJoined",
                                              event.target.checked
                                            )
                                          }
                                        />
                                        {candidate.CanInterviewsModel.joined &&
                                        isChecked ? (
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
                            </div>
                          </>
                        )}
                        <div>
                          <div className="btn-group dropstart">
                            <button
                              type="button"
                              // className={`btn btn-light `}

                              data-bs-toggle="dropdown"
                              data-bs-no-caret="true"
                              aria-expanded="false"
                              onClick={(e) => {
                                handleClick(candidate.CanInterviewsModel.id, e);
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
                              <AiOutlineEdit />
                            </button>
                            <ul
                              className="dropdown-menu"
                              style={{ textAlign: "left" }}
                              // ref={dropdownRef}
                            >
                              {/* <!-- Dropdown menu links --> */}
                              <li onClick={() => handleButtonClick("attended")}>
                                <a className="dropdown-item" href="#">
                                  <div
                                    className={`${interviewStyle.select_wrp}`}
                                  >
                                    <input
                                      ref={inputRef.attended}
                                      type="checkbox"
                                      id={`attended_${candidate.CanInterviewsModel.id}`}
                                      name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                      checked={
                                        candidate.CanInterviewsModel.attended
                                      }
                                      onChange={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isAttended",
                                          event.target.checked
                                        )
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
                                      Attended
                                    </label>
                                  </div>
                                </a>
                              </li>
                              <li
                                onClick={() => handleButtonClick("notAttended")}
                              >
                                <a className="dropdown-item" href="#">
                                  <div
                                    className={`${interviewStyle.select_wrp}`}
                                  >
                                    <input
                                      type="checkbox"
                                      ref={inputRef.notAttended}
                                      name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                      id={`notAttended_${candidate.CanInterviewsModel.id}`}
                                      checked={
                                        candidate.CanInterviewsModel.notAttended
                                      }
                                      onChange={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isNotAttended",
                                          event.target.checked
                                        )
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
                              <li onClick={() => handleButtonClick("selected")}>
                                <a className="dropdown-item" href="#">
                                  <div
                                    className={`${interviewStyle.select_wrp}`}
                                  >
                                    <input
                                      type="checkbox"
                                      ref={inputRef.selected}
                                      name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                      id={`selected_${candidate.CanInterviewsModel.id}`}
                                      checked={
                                        candidate.CanInterviewsModel.selected
                                      }
                                      onChange={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isSelected",
                                          event.target.checked
                                        )
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
                              <li
                                onClick={() => handleButtonClick("notSelected")}
                              >
                                <a className="dropdown-item" href="#">
                                  <div
                                    className={`${interviewStyle.select_wrp}`}
                                  >
                                    <input
                                      type="checkbox"
                                      ref={inputRef.notSelected}
                                      name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                      id={`notSelected_${candidate.CanInterviewsModel.id}`}
                                      checked={
                                        candidate.CanInterviewsModel.notSelected
                                      }
                                      onChange={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isNotSelected",
                                          event.target.checked
                                        )
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
                              <li
                                onClick={() =>
                                  handleButtonClick("offerRejected")
                                }
                              >
                                <a className="dropdown-item" href="#">
                                  <div
                                    className={`${interviewStyle.select_wrp}`}
                                  >
                                    <input
                                      ref={inputRef.offerRejected}
                                      type="checkbox"
                                      name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                      id={`offerRejected_${candidate.CanInterviewsModel.id}`}
                                      checked={
                                        candidate.CanInterviewsModel
                                          .offerRejected
                                      }
                                      onChange={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isOfferRejected",
                                          event.target.checked
                                        )
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
                              <li onClick={() => handleButtonClick("joined")}>
                                <a className="dropdown-item" href="#">
                                  <div
                                    className={`${interviewStyle.select_wrp}`}
                                  >
                                    <input
                                      ref={inputRef.joined}
                                      type="checkbox"
                                      name={`statusfield_${candidate.CanInterviewsModel.id}`}
                                      id={`joined_${candidate.CanInterviewsModel.id}`}
                                      checked={
                                        candidate.CanInterviewsModel.joined
                                      }
                                      onChange={(event) =>
                                        handleRadioBtn(
                                          candidate.CanInterviewsModel.id,
                                          "isJoined",
                                          event.target.checked
                                        )
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
                              <li>
                                <a className="dropdown-item" href="#">
                                  <label
                                    onClick={(e) => {
                                      // console.log(
                                      //   e.defaultPrevented,
                                      //   "good"
                                      // );
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
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                {" "}
                <Nojoid />
              </div>
            )}
          </tbody>
        </table>
      </div>
      {showConfirmPopup && (
        <MyModal>
          <ModalContainer
            childComponent={
              <ConfirmationPopup
                heading={"Confirmation"}
                headingText={` Are you sure you want to confirm  the interview status </br> with <b>${contactPersonName}</b>? `}
                onConfirm={ConfirmFormSubmit}
                // enableSubmit={enableSubmit}
                onRequestClose={handleConfirmationClose}
              />
            }
          />
        </MyModal>
      )}
      {isRescheduleOpen && (
        <InterviewReschedule
          interviewId={currentInterviewId}
          onSuccess={() => {
            Getreschedule();
            // handleClose();
            // setIsRescheduleOpen(false);
          }}
          // showModal={true}
        />
      )}
    </>
  );
}

export default Reference;
