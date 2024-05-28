/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./CandidateDailyTask.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaDotCircle, FaFilter } from "react-icons/fa";
import CandidateDailyTaskFilter from "./CandidateDailyTaskFilter";
import { BiFilterAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Pagination, Stack } from "@mui/material";
import {
  GetCandidateDailyTask,
  UpdateCandidateDailyTask,
  getCandidateLead,
  getcandidateDetails,
} from "../../../apiServices";
import CandidateFBLeadDetailsview from "../../../components/ModalPopups/CandidateDetails/FBLeadDetailsview";
import ModalContainer from "../../../components/modal_popup";
import { MyModal } from "../../../utility";
import CandidateDetailsview from "../../../components/ModalPopups/CandidateDetails/CandidateDetailsview";
import CandidateLeadDetailsview from "../../../components/ModalPopups/CandidateDetails/CandidateLeadDetailsview";
import { useDispatch } from "react-redux";
import { commonPopupActions } from "../../../redux-store/store";
import SuccessTick from "../../../components/success_tick";
import { CandidateDailyTaskActions } from "../../../redux-store/store";

function CandidateDailyTask() {
  // const [cardsData, setCardsData] = useState([]);

  const cardsData = [
    { taskName: "Candidate call", callTime: "12.00 pm" },
    { taskName: "Candidate call", callTime: "12.00 pm" },
    { taskName: "Candidate call", callTime: "12.00 pm" },
    { taskName: "Candidate hjhd", callTime: "12.00 pm" },
    { taskName: "Candidate jhjh", callTime: "12.00 pm" },
    { taskName: "Candidate sssj", callTime: "12.00 pm" },
    { taskName: "Candidate jsdk", callTime: "12.00 pm" },
    { taskName: "Candidate call", callTime: "12.00 pm" },
    { taskName: "Candidate call", callTime: "12.00 pm" },
    { taskName: "Candidate call", callTime: "12.00 pm" },
  ];

  const [pageCount, setPageCount] = useState({
    CandidateCompletedTaskFilter: "",
    CandidateNewTaskFilter: "",
    CandidatePendingTaskFilter: "",
  });

  const [data, setData] = useState({
    canLead: {},
    metaLead: {},
    candidate: {},
    openCanlead: false,
    openMetalead: false,
    openCandidate: false,
  });

  const CandidateNewTaskFilter = useSelector(
    (state) => state.CandidateDailyTaskDetails.CandidateNewTaskFilter
  );
  const CandidatePendingTaskFilter = useSelector(
    (state) => state.CandidateDailyTaskDetails.CandidatePendingTaskFilter
  );
  const CandidateCompletedTaskFilter = useSelector(
    (state) => state.CandidateDailyTaskDetails.CandidateCompletedTaskFilter
  );

  const [candidateDailyTask, setCandidateDailyTask] = useState({
    CandidateNewTaskFilter: [],
    CandidatePendingTaskFilter: [],
    CandidateCompletedTaskFilter: [],
  });

  const [showSuccess, setShowSuccess] = useState({
    show: false,
    message: "",
  });

  const Dispatch = useDispatch();

  function ReloadList() {
    GetCandidateDailyTask(CandidateNewTaskFilter).then((res) => {
      setPageCount((prev) => ({
        ...prev,
        CandidateNewTaskFilter: res.totalPages,
      }));
      setCandidateDailyTask((prev) => ({
        ...prev,
        CandidateNewTaskFilter: res.content,
      }));
    });
    GetCandidateDailyTask(CandidatePendingTaskFilter).then((res) => {
      setPageCount((prev) => ({
        ...prev,
        CandidatePendingTaskFilter: res.totalPages,
      }));
      setCandidateDailyTask((prev) => ({
        ...prev,
        CandidatePendingTaskFilter: res.content,
      }));
    });
    GetCandidateDailyTask(CandidateCompletedTaskFilter).then((res) => {
      setPageCount((prev) => ({
        ...prev,
        CandidateCompletedTaskFilter: res.totalPages,
      }));
      setCandidateDailyTask((prev) => ({
        ...prev,
        CandidateCompletedTaskFilter: res.content,
      }));
    });
  }

  useEffect(() => {
    GetCandidateDailyTask(CandidateNewTaskFilter).then((res) => {
      setPageCount((prev) => ({
        ...prev,
        CandidateNewTaskFilter: res.totalPages,
      }));
      setCandidateDailyTask((prev) => ({
        ...prev,
        CandidateNewTaskFilter: res.content,
      }));
    });
  }, [CandidateNewTaskFilter]);

  useEffect(() => {
    GetCandidateDailyTask(CandidatePendingTaskFilter).then((res) => {
      setPageCount((prev) => ({
        ...prev,
        CandidatePendingTaskFilter: res.totalPages,
      }));
      setCandidateDailyTask((prev) => ({
        ...prev,
        CandidatePendingTaskFilter: res.content,
      }));
    });
  }, [CandidatePendingTaskFilter]);

  useEffect(() => {
    GetCandidateDailyTask(CandidateCompletedTaskFilter).then((res) => {
      setPageCount((prev) => ({
        ...prev,
        CandidateCompletedTaskFilter: res.totalPages,
      }));
      setCandidateDailyTask((prev) => ({
        ...prev,
        CandidateCompletedTaskFilter: res.content,
      }));
    });
  }, [CandidateCompletedTaskFilter]);

  useEffect(() => {
    // AOS.init({
    //   duration: 500,
    //   easing: "ease",
    // });
    // AOS.refresh();
    const cards = document.querySelectorAll(`.${styles.DailytaskCard1}`);
    cards.forEach((card, index) => {
      card.classList.add("fade-up");
      card.style.animationDelay = `${index * 0.2}s`;
    });
    const cards1 = document.querySelectorAll(`.${styles.DailytaskCard2}`);
    cards1.forEach((card, index) => {
      card.classList.add("fade-up");
      card.style.animationDelay = `${index * 0.2}s`;
    });
    const cards2 = document.querySelectorAll(`.${styles.DailytaskCard3}`);
    cards2.forEach((card, index) => {
      card.classList.add("fade-up");
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }, [cardsData]);

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

  function moveToCompleted(data) {
    const dataObj = {
      id: data.id,
      currentStatus: "Completed Task",
    };

    UpdateCandidateDailyTask(dataObj).then(() => {
      alert("Task Completed");
      setShowSuccess({
        show: true,
        message: "Task Completed",
      });

      ReloadList();
      setTimeout(() => {
        setShowSuccess({
          show: false,
          message: "",
        });
      }, 3000);
    });
  }
  function openDetailedView(data) {
    if (data.fbMetaLead) {
      setData((prev) => ({
        ...prev,
        metaLead: data.fbMetaLead,
        openMetalead: true,
        openCandidate: false,
        openCanlead: false,
      }));
    }

    if (data.canLead) {
      setData((prev) => ({
        ...prev,
        canLead: data.canLead.id,
        openMetalead: false,
        openCandidate: false,
        openCanlead: true,
      }));

      handleCandidateDetails(data.canLead.id, "CandidateLead");
    }

    if (data.candidate) {
      setData((prev) => ({
        ...prev,
        candidate: data.candidate,
        openMetalead: false,
        openCandidate: true,
        openCanlead: false,
      }));
      handleCandidateDetails(data.candidate.id, "RegisterCandidate");
    }
  }

  function handlePageChange(event, value) {
    console.log(value);
    Dispatch(
      CandidateDailyTaskActions.setPageChange({
        filterType: event,
        data: value - 1,
      })
    );
  }

  return (
    <div>
      <div className="d-grid justify-content-end">
        <CandidateDailyTaskFilter filterType={"CandidateCompletedTaskFilter"} />
      </div>
      <div className={`${styles.DailytaskBody}`}>
        <div className={`${styles.Rowofcards}`}>
          <div className={`${styles.DailytaskSm4}`}>
            <div
              style={{ backgroundColor: "#ddff00" }}
              className={`card d-flex flex flex-row justify-content-between ${styles.DailytaskHead}`}
            >
              <span>New Task</span>
              <div title="Filter">
                {/* <CandidateDailyTaskFilter
                  filterType={"CandidateNewTaskFilter"}
                /> */}
              </div>
            </div>

            <div className={`${styles.animate1}`}>
              {candidateDailyTask.CandidateNewTaskFilter.map((card, index) => (
                <div
                  key={index}
                  // data-aos="fade-up"
                  // data-aos-delay={index * 100}
                  className={`card ${styles.DailytaskCard1}`}
                >
                  <div>
                    Task Name: {card.followUpType} <br />
                    Call Time: {card.followUpDate} <br />
                    Candidate Name :{" "}
                    {card.fbMetaLead && card.fbMetaLead.candidateName}
                    {card.canLead && card.canLead.name}
                    {card.candidate && card.candidate.firstName} <br />
                    Number : {card.fbMetaLead && card.fbMetaLead.mobileNumber}
                    {card.canLead && card.canLead.mobileNumber}
                    {card.candidate && card.candidate.mobileNumber}
                  </div>
                  <div className={`d-flex gap-1 ${styles.DailytaskProfileDiv}`}>
                    <div className={` ${styles.DailytaskProfile}`}>
                      <span
                        title={card.admin.userName}
                        className={`${styles.DailytaskProfilespan}`}
                      >
                        {card.admin.userName[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      {" "}
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
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                moveToCompleted(card);
                              }}
                            >
                              <FaDotCircle
                                style={{ color: "#169c50" }}
                                className="me-2"
                              />{" "}
                              Move to Completed
                            </a>
                          </li>

                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                openDetailedView(card);
                              }}
                            >
                              <FaDotCircle
                                style={{ color: "#0066ff" }}
                                className="me-2"
                              />{" "}
                              View Candidate
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-grid justify-content-center mt-2">
              <Stack spacing={2}>
                <Pagination
                  count={pageCount.CandidateNewTaskFilter}
                  onChange={(e, value) => {
                    handlePageChange("CandidateNewTaskFilter", value);
                  }}
                  size="small"
                />
              </Stack>
            </div>
          </div>

          <div className={`${styles.DailytaskSm4}`}>
            <div
              style={{ backgroundColor: "#f99b02" }}
              className={`card d-flex flex flex-row justify-content-between ${styles.DailytaskHead}`}
            >
              <span>Pending Task</span>
              <div title="Filter">
                {/* <CandidateDailyTaskFilter
                  filterType={"CandidatePendingTaskFilter"}
                /> */}
              </div>
            </div>
            <div className={`${styles.animate1}`}>
              {candidateDailyTask.CandidatePendingTaskFilter.map(
                (card, index) => (
                  <div
                    key={index}
                    // data-aos="fade-up"
                    // data-aos-delay={index * 100}
                    className={`card ${styles.DailytaskCard3}`}
                  >
                    <div>
                      Task Name: {card.followUpType} <br />
                      Call Time: {card.followUpDate} <br />
                      Candidate Name :{" "}
                      {card.fbMetaLead && card.fbMetaLead.candidateName}
                      {card.canLead && card.canLead.name}
                      {card.candidate && card.candidate.firstName} <br />
                      Number : {card.fbMetaLead && card.fbMetaLead.mobileNumber}
                      {card.canLead && card.canLead.mobileNumber}
                      {card.candidate && card.candidate.mobileNumber}
                    </div>
                    <div
                      className={`d-flex gap-1 ${styles.DailytaskProfileDiv}`}
                    >
                      <div className={` ${styles.DailytaskProfile}`}>
                        <span
                          title={card.admin.userName}
                          className={`${styles.DailytaskProfilespan}`}
                        >
                          {card.admin.userName[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        {" "}
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
                          >
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                moveToCompleted(card);
                              }}
                            >
                              <FaDotCircle
                                style={{ color: "#169c50" }}
                                className="me-2"
                              />{" "}
                              Move to Completed
                            </a>

                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                openDetailedView(card);
                              }}
                            >
                              <FaDotCircle
                                style={{ color: "#0066ff" }}
                                className="me-2"
                              />{" "}
                              View Candidate
                            </a>
                          </ul>
                        </div>
                        {/* <span className="fs-5">
                        <BsThreeDotsVertical />
                      </span> */}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="d-grid justify-content-center mt-2">
              <Stack spacing={2}>
                <Pagination
                  count={pageCount.CandidatePendingTaskFilter}
                  onChange={(e, value) => {
                    handlePageChange("CandidatePendingTaskFilter", value);
                  }}
                  size="small"
                />
              </Stack>
            </div>
          </div>
          <div className={`${styles.DailytaskSm4}`}>
            <div
              style={{ backgroundColor: "#02fc0f" }}
              className={`card d-flex flex flex-row justify-content-between ${styles.DailytaskHead}`}
            >
              <span>Completed Task</span>
              <div title="Filter">
                {/* <CandidateDailyTaskFilter
                  filterType={"CandidateCompletedTaskFilter"}
                /> */}
              </div>
            </div>
            <div className={`${styles.animate1}`}>
              {candidateDailyTask.CandidateCompletedTaskFilter.map(
                (card, index) => (
                  <div
                    key={index}
                    // data-aos="fade-up"
                    // data-aos-delay={index * 100}
                    className={`card ${styles.DailytaskCard2}`}
                  >
                    <div>
                      Task Name: {card.followUpType} <br />
                      Call Time: {card.followUpDate} <br />
                      Candidate Name :{" "}
                      {card.fbMetaLead && card.fbMetaLead.candidateName}
                      {card.canLead && card.canLead.name}
                      {card.candidate && card.candidate.firstName} <br />
                      Number : {card.fbMetaLead && card.fbMetaLead.mobileNumber}
                      {card.canLead && card.canLead.mobileNumber}
                      {card.candidate && card.candidate.mobileNumber}
                    </div>
                    <div
                      className={`d-flex gap-1 ${styles.DailytaskProfileDiv}`}
                    >
                      <div className={` ${styles.DailytaskProfile}`}>
                        <span
                          title={card.admin.userName}
                          className={`${styles.DailytaskProfilespan}`}
                        >
                          {card.admin.userName[0].toUpperCase()}
                        </span>
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
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                moveToCompleted(card);
                              }}
                            >
                              <FaDotCircle
                                style={{ color: "#169c50" }}
                                className="me-2"
                              />{" "}
                              Move to Completed
                            </a>
                          </li>

                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => {
                                openDetailedView(card);
                              }}
                            >
                              <FaDotCircle
                                style={{ color: "#0066ff" }}
                                className="me-2"
                              />{" "}
                              View Candidate
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="d-grid justify-content-center mt-2">
              <Stack spacing={2}>
                <Pagination
                  count={pageCount.CandidateCompletedTaskFilter}
                  onChange={(e, value) => {
                    handlePageChange("CandidateCompletedTaskFilter", value);
                  }}
                  size="small"
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>

      {data.openMetalead && data.metaLead && (
        <MyModal>
          <ModalContainer
            // zIndex={2}
            childComponent={
              <>
                <CandidateFBLeadDetailsview
                  onClose={() => {
                    setData((prev) => ({ ...prev, openMetalead: false }));
                  }}
                  data={data.metaLead}
                  onAssignChange={() => {
                    // ReloadList();
                  }}
                />
              </>
            }
          />
        </MyModal>
      )}

      {showSuccess.show && (
        <MyModal>
          <ModalContainer
            zIndex={8000}
            childComponent={<SuccessTick HeadText={showSuccess.message} />}
          />
        </MyModal>
      )}
    </div>
  );
}

export default CandidateDailyTask;
