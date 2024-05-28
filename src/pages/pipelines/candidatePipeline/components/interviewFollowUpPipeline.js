/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import style from "../pipeline.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Pagination } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import {
  GetCandidatePipeline,
  getCandidateLead,
  getcandidateDetails,
} from "../../../../apiServices";
import {
  MyModal,
  addDaysToDate,
  addOneyear,
  addYear,
  dateFormate,
  getDateSevenDaysAgo,
  modifyDate,
} from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import {
  CandidatePipelineActions,
  commonPopupActions,
} from "../../../../redux-store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CanRegisterFilter from "./canRegisteredFilter";
import InterviewFollowUpFilter from "./interviewFollowUpFilter";
import { HiOutlineRefresh } from "react-icons/hi";

function InterviewFollowUpPipeline() {
  const [leadData, setLeadData] = useState({
    data: [],
  });

  let filterDetails = useSelector(
    (state) => state.CandidatePipelineDetails.interviewFollowUpFilter
  );

  let refreshPage = useSelector(
    (state) => state.CandidatePipelineDetails.refreshCountIncrement
  );

  const [showFilter, setShowFilter] = useState(false);

  const [showRedDot, setShowRedDot] = useState(false);
  // const [interviewdata, setinterviewdata] = useState("");

  const [totalCount, setTotalCount] = useState(0);

  const [leadDetails, setleadDetails] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const Dispatch = useDispatch();

  const handleCandidateDetails = async (candidateleadId, type) => {
    let data;
    console.log(data, "cnadidatre tutu");
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
        type: "interviewFollowUpFilter",
        value: page - 1,
      })
    );
  }
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

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
    followupStatus: 0,
    currentPipeline: "",
    // pipelineStage: "Interview date set",
    stages: 5,
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
      addOneyear(new Date()),
      "CONSOLEEEEEEEEEEeeeeeeeeeeeeeeeeee"
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

  return (
    <div className={`${style.pipelineContainer} mx-2`}>
      <div className={`${style.headerCard} p-2 d-flex justify-content-between`}>
        <b>Interview Follow Up ({totalCount})</b>{" "}
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
        {leadData.data.map((el) => {
          return (
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
                          handleCandidateDetails(el.id, "RegisterCandidate");
                        }}
                        className={style.candidateName}
                      >
                        {" "}
                        {el.firstName ? el.firstName : "-"}{" "}
                        {el.lastName ? el.lastName : "-"}
                      </b>
                    </div>
                    {/* <div
                      style={{
                        // display: "inline-block",
                        padding: "4px",
                        border: "1px solid",
                        borderRadius: "7px",
                        // marginLeft: "15px",
                        borderColor:
                          dateFormate(new Date()) ===
                          dateFormate(el.followUpDate1)
                            ? "blue"
                            : dateFormate(new Date()) ===
                              dateFormate(el.followUpDate2)
                            ? "violet"
                            : "red",
                        backgroundColor:
                          dateFormate(new Date()) ===
                          dateFormate(el.followUpDate1)
                            ? "lightblue"
                            : dateFormate(new Date()) ===
                              dateFormate(el.followUpDate2)
                            ? "lavender"
                            : "pink",
                        color:
                          dateFormate(new Date()) ===
                          dateFormate(el.followUpDate1)
                            ? "blue"
                            : dateFormate(new Date()) ===
                              dateFormate(el.followUpDate2)
                            ? "violet"
                            : "red",
                      }}
                    >
                      <div style={{ fontSize: "10px" }}>
                        <b>{dateFormate(etentativeInterviewDate)}</b>
                      </div>
                    </div> */}
                  </div>
                  {el.jobCategory ? el.jobCategory : "-"} <br />
                  {/* {el.mobileNumber ? el.mobileNumber : "-"} */}
                  <div className="d-flex justify-content-between">
                    <div>{el.mobileNumber ? el.mobileNumber : "-"}</div>
                    <b
                      style={{
                        border: "1px solid yellow",
                        backgroundColor: "lightyellow",
                        fontSize: "10px",
                        borderRadius: "8px",
                        // marginRight:"18px",
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
                  style={{ marginTop: "-20px", marginBottom: "17px" }}
                  className="d-flex justify-content-end"
                >
                  {/* <div>
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
                        <li>
                          <a className="dropdown-item" href="#">
                            Not Qualified
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
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
                <InterviewFollowUpFilter
                  onclose={() => {
                    setShowFilter(false);
                  }}
                />
              </>
            }
          />
        </MyModal>
      )}
    </div>
  );
}

export default InterviewFollowUpPipeline;
