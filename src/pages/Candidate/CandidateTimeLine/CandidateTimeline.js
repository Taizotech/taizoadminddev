/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";

import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Card, Pagination } from "@mui/material";
import { GetCanTimeline } from "../../../apiServices";
import style from "./CandidateTimeline.module.scss";
import { useRef } from "react";
import { Ddmmmyyyy_date, MyModal, textTruncate } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import TimeLineDetails from "./components/timeLineDetails";
import TimeLineFilter from "./components/timeLineFilter";

export default function CandidateTimeline({ canId }) {
  const [showFilterForm, setShowFilterForm] = useState(false);

  const [timeLineDetails, setTimeLineDetails] = useState({
    details: {},
    showPopup: false,
  });

  const scrollableRef = useRef(null);

  const [timeLine, setTimeLine] = useState({
    content: [],
    totalPages: 0,
    canId: canId ? canId : null,
    startDate: "",
    endDate: "",
    eventType: null,
  });

  function updateFilter(name, value) {
    setTimeLine((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function resetFilter() {
    setTimeLine((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
      eventType: null,
    }));
    // setShowFilterForm(false);
  }

  function handlePopupClose() {
    setTimeLineDetails((prev) => ({
      ...prev,
      showPopup: false,
    }));
  }

  function handlePopupOpen(element) {
    setTimeLineDetails((prev) => ({
      ...prev,
      details: element,
      showPopup: true,
    }));
  }

  const [page, setPage] = useState(0);

  useEffect(() => {
    getTimeLine(timeLine, page);
  }, [page]);

  // useEffect(() => {
  //   console.log(timeLine);
  //   getTimeLine(timeLine, page);
  // }, [timeLine]);

  function getTimeLine(timeLine, page) {
    GetCanTimeline(timeLine, page).then((res) => {
      setTimeLine((prev) => ({
        ...prev,
        content: res.content,
        totalPages: res.totalPages,
      }));
    });
    setShowFilterForm(false);
  }

  const handleFilterButtonClick = () => {
    setShowFilterForm(true);
  };

  function handleCloseFilterPopup() {
    setShowFilterForm(false);
  }

  return (
    <>
      <div>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          <div className=" d-grid justify-content-end">
            <button
              className="btn bg-primary text-light"
              onClick={handleFilterButtonClick}
            >
              Filter
            </button>
          </div>
          <div>
            <div>
              {showFilterForm && (
                <TimeLineFilter
                  updateFilter={updateFilter}
                  close={handleCloseFilterPopup}
                  filterData={timeLine}
                  resetFilter={resetFilter}
                  onSubmit={() => {
                    getTimeLine(timeLine, page);
                  }}
                />
              )}
            </div>
          </div>
          <div className={`${style.timeLineWrp}`} ref={scrollableRef}>
            {timeLine.content.length === 0 && (
              <>
                <div className="d-flex justify-content-center mt-5">
                  <p className="text-center text-danger">
                    <b>No Timeline Found</b>
                  </p>
                </div>
              </>
            )}
            {!showFilterForm &&
              timeLine.content.map((element, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="textSecondary">
                    <div style={{ marginLeft: -20 }}>
                      <Ddmmmyyyy_date dateValue={element.createdTime} />
                    </div>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      style={{
                        backgroundColor:
                          element.eventName === "NotQualified"
                            ? "#d44349"
                            : "#169c50",
                      }}
                    />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent
                    onClick={() => {
                      handlePopupOpen(element);
                    }}
                  >
                    &nbsp;
                    <Card sx={{ cursor: "pointer" }}>
                      <div className="p-3">
                        <div>
                          <strong>{element.eventName}</strong>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: element.eventDescription,
                            }}
                          />
                        </div>
                        <div>
                          {element.notes ? (
                            <>
                              <strong>Notes</strong>: &nbsp;
                              {textTruncate(element.notes, 20)}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}

            <div className="d-flex justify-content-center mt-4">
              <Pagination
                count={timeLine.totalPages}
                variant="outlined"
                page={page + 1}
                onChange={(e, currentPage) => setPage(currentPage - 1)}
                siblingCount={1}
                color="primary"
                hidePrevButton
                hideNextButton
              />
            </div>
          </div>
        </Timeline>

        <div>
          {timeLineDetails.showPopup && (
            <MyModal>
              <ModalContainer
                zIndex={10000}
                childComponent={
                  <>
                    {/*  */}
                    <TimeLineDetails
                      close={handlePopupClose}
                      dataObject={timeLineDetails}
                    />
                  </>
                }
              />
            </MyModal>
          )}
        </div>
      </div>
    </>
  );
}
