/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import style from "../pipeline.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Pagination, TextField } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import moment from "moment";
import "moment-timezone";
import accordionstyle from "../../../Candidate/CandidateQualifyForm/QualifyForm.module.scss";
import {
  GetCanLeadPipeline,
  GetCandidateQualifyDetials,
  PutCandidateType,
  UpdateCanPipelineStatus,
  getCandidateLead,
  getcandidateDetails,
} from "../../../../apiServices";
import {
  MyModal,
  addDaysToDate,
  addOneyear,
  dateFormate,
  getCurrentDateTime,
  getDateSevenDaysAgo,
  modifyDate,
} from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import CandidateFBLeadDetailsview from "../../../../components/ModalPopups/CandidateDetails/FBLeadDetailsview";
import CandidateLeadPopup from "../../../../components/ModalPopups/CandidateLeadPopup";
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
import CallRemainderFilter from "./callRemainderFilter.";
import { HiOutlineRefresh } from "react-icons/hi";

function CanCallRemainderPipeline() {
  const [leadData, setLeadData] = useState({
    data: [],
  });

  let filterDetails = useSelector(
    (state) => state.CandidatePipelineDetails.callRemainderFilter
  );

  let refreshPage = useSelector(
    (state) => state.CandidatePipelineDetails.refreshCountIncrement
  );

  const [showFilter, setShowFilter] = useState(false);
  const [leadQualifyFormOpen, setLeadQualifyFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [leadDetails, setleadDetails] = useState("");
  const [showSuccessForm, setshowSuccessForm] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState({
    show: false,
    id: 1,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [showRedDot, setShowRedDot] = useState(false);
  const [popups, setShowPopups] = useState({
    callRemainder: false,
    success: false,
    confirmation: false,
  });
  const [notQualifyNotes, setNotQualifyNotes] = useState("");
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
    let data = await GetCanLeadPipeline(filterDetails);

    if (data.status) {
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
  function handleQualifyFormSubmit() {
    setshowSuccessForm(true);

    setTimeout(() => {
      setshowSuccessForm(false);
      setSelectedOption("");
      setLeadQualifyFormOpen(false);
    }, 1000);
    fetchData();
  }

  function paginationChange(event, page) {
    Dispatch(
      CandidatePipelineActions.setPageChange({
        type: "callRemainderFilter",
        value: page - 1,
      })
    );
  }
  function showNotQualify(value) {
    setShowPopups((prev) => ({ ...prev, confirmation: value }));
  }
  function handleCallNotAttend(value) {
    setShowPopups((prev) => ({ ...prev, confirmation: value }));
  }
  const formattedDateTime = getCurrentDateTime();
  function submitNotQualified(e) {
    e.preventDefault();
    if (!notQualifyNotes) {
      // setDateTimeError(!callRemainder.date);
      return;
    }
    let obj = {
      notQualified: true,
      date: formattedDateTime,
      notes: notQualifyNotes,
      id: leadDetails.id,
    };
    UpdateCanPipelineStatus(obj).then(() => {
      showNotQualify(false);
      Dispatch(CandidatePipelineActions.setRefreshCount());
    }, []);
  }
  function submitNotAttend() {
    let obj = {
      notAttend: true,
      // notes: callRemainder.notes,
      id: leadDetails.id,
    };
    UpdateCanPipelineStatus(obj).then(() => {
      showNotQualify(false);
      Dispatch(CandidatePipelineActions.setRefreshCount());
    }, []);
  }

  let initialFilterObj = {
    mobileNumber: -1,
    assignTo: localStorage.getItem("adminID"),
    profilePageNo: -1,
    fromSource: "",
    jobCategory: "",
    currentStatus: "",
    dateFilterType: "",
    expYearsMax: -1,
    expYearsMin: -1,
    page: "",
    currentPipeline: "New candidate lead",
    pipelineStage: "Connecting Qualifying",
    stages: 2,
    startDate: dateFormate(modifyDate("sub", 7)),
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
  return (
    <div className={`${style.pipelineContainer} mx-2`}>
      <div className={`${style.headerCard} p-2 d-flex justify-content-between`}>
        <b>Connecting - Qualifing ({totalCount}) </b>{" "}
        <div className="mt-0">
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
            className="d-inline-block mx-2"
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
            <div className={`${style.bodyCard} p-1 `}>
              <div className={`${style.textContent} p-1 `}>
                <div className="d-flex justify-content-between">
                  <div>
                    <b
                      onClick={() => {
                        handleCandidateDetails(el.id, "CandidateLead");
                      }}
                      className={style.candidateName}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {el.name ? el.name : "-"} {el.lastName ? el.lastName : ""}{" "}
                    </b>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 4px", // Adjusted padding to make the badge smaller
                      border: "1px solid",
                      textAlign: "center",
                      borderRadius: "8px", // Adjusted border-radius to make the badge smaller
                      fontSize: "10px",
                      borderColor:
                        el.currentStatus === "Not attend"
                          ? "orange" // Border color for "Not attend"
                          : el.currentStatus === "Call remainder"
                          ? "gray" // Border color for "Call remainder"
                          : "",
                      backgroundColor:
                        el.currentStatus === "Not attend"
                          ? "rgba(255, 99, 71, 0.2)" // Lighter shade of red using RGBA
                          : el.currentStatus === "Call remainder"
                          ? "lightgray" // Background color for "Call remainder"
                          : "",
                      color:
                        el.currentStatus === "Not attend"
                          ? "orange" // Text color for "Not attend"
                          : el.currentStatus === "Call remainder"
                          ? "gray" // Text color for "Call remainder"
                          : "",
                    }}
                  >
                    <b>
                      <div>{el.currentStatus ? el.currentStatus : "-"}</div>
                    </b>
                  </div>
                </div>{" "}
                <div className="d-flex justify-content-between">
                  {el.jobCategory ? el.jobCategory : "-"}
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginBottom: "3px",
                    }}
                  >
                    {el.currentStatus === "Call remainder" && el.callRemainderOn
                      ? (() => {
                          const currentDate = new Date();
                          const callRemainderOnDate = new Date(
                            el.callRemainderOn
                          );
                          const differenceMs =
                            callRemainderOnDate - currentDate;
                          const differenceDays = Math.ceil(
                            differenceMs / (1000 * 60 * 60 * 24)
                          );
                          if (differenceDays > 0) {
                            return `${differenceDays} days more`;
                          } else {
                            const daysAgo = Math.abs(differenceDays);
                            if (daysAgo === 0) {
                              return "Today";
                            } else if (daysAgo === 1) {
                              return "1 day ago";
                            } else {
                              return `${daysAgo} days ago`;
                            }
                          }
                        })()
                      : ""}
                  </div>
                </div>
                {/* {el.mobileNumber ? el.mobileNumber : "-"} */}
                <div className="d-flex justify-content-between">
                  <div>{el.mobileNumber ? el.mobileNumber : "-"}</div>
                  <b
                    style={{
                      border: "1px solid yellow",
                      backgroundColor: "lightyellow",
                      fontSize: "10px",
                      borderRadius: "8px",
                      marginRight: "10px",
                      marginTop: "3px",
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
                          className="dropdown-item"
                          href="#"
                          onClick={() => {
                            showNotQualify(true);
                          }}
                        >
                          Not Qualified
                        </a>
                      </li>
                      {/* <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => {
                            handleCallNotAttend(true);
                          }}
                        >
                          Not Attend
                        </a>
                      </li> */}

                      {/* <li>
                        <a className="dropdown-item" href="#">
                          Call Remainder
                        </a>
                      </li> */}
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
                <CallRemainderFilter
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
                      Are you sure that you want to not qualify{" "}
                      <b>{leadDetails.name}</b>?
                    </div>
                    <form action="#" onSubmit={(e) => submitNotQualified(e)}>
                      <div>
                        {" "}
                        <TextField
                          label="Add Notes"
                          multiline
                          value={notQualifyNotes}
                          onChange={(e) => {
                            setNotQualifyNotes(e.target.value);
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
      {/* {popups.confirmation && (
        <>
          <MyModal>
            <ModalContainer
              zIndex="5000"
              childComponent={
                <>
                  <div>
                    <h4 className=""> Confirmation </h4>
                    <div>
                      Are you sure that you want to not attend{" "}
                      <b> {leadDetails.name}</b>?
                    </div>
                    <div className="d-flex justify-content-end flex-row mt-3 ">
                      <button
                        onClick={() => {
                          handleCallNotAttend(false);
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
      )} */}
      {showSuccessForm && (
        <MyModal>
          <ModalContainer
            zIndex="5000"
            childComponent={<SuccessTick HeadText="Successfully Submit" />}
          />
        </MyModal>
      )}
    </div>
  );
}

export default CanCallRemainderPipeline;
