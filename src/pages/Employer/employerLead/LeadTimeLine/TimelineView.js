/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
import { GetEmpLeadTimeline } from "../../../../apiServices";
import style from "../../../Candidate/CandidateTimeLine/CandidateTimeline.module.scss";
import { Ddmmmyyyy_date, MyModal, textTruncate } from "../../../../utility";
import ModalContainer from "../../../../components/modal_popup";
import TimeLineDetails from "./timeLineDetails";
import { useDispatch, useSelector } from "react-redux";
import { employerTimelineActions } from "../../../../redux-store/store";

// import TimeLineFilter from "./components/timeLineFilter";

export default function EmployerLeadTimeline({ id }) {
  const [timeLine, setTimeLine] = useState({
    content: [],
    totalPages: 0,
  });
  const [timeLineDetails, setTimeLineDetails] = useState({
    details: {},
    showPopup: false,
  });

  const timelineFilter = useSelector(
    (state) => state.employerTimeline.employerLeadTimeline.filter
  );

  const [page, setPage] = useState(0);

  const Dispatch = useDispatch();

  function SetTimeLineDetails(data) {
    setTimeLineDetails((prev) => ({ ...prev, details: data, showPopup: true }));
  }

  function handleTimelineOpen(value) {
    // setTimeline((prev) => ({ ...prev, empLeadId: el.id, showTimeline: true }));
    Dispatch(employerTimelineActions.setShowEmpLeadTimeline(value));
  }

  function handlePopupClose() {
    setTimeLineDetails((prev) => ({
      ...prev,
      showPopup: false,
    }));
  }

  function getEmpTimeline() {
    GetEmpLeadTimeline(id, timelineFilter)
      .then((res) => {
        setTimeLine((prev) => ({
          ...prev,
          content: res.content,
          totalPages: res.totalPages,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getEmpTimeline();
  }, [page]);

  return (
    <>
      <div>
        {/* <div className="d-flex flex-row justify-content-end">
          <EmpLeadAddTimeLineForm
            onSuccess={() => {
              getEmpTimeline();
            }}
            empLeadId={id}
          />
          <Button
            color="error"
            onClick={() => {
              handleTimelineOpen(false);
            }}
          >
            <Close />
          </Button>
        </div> */}
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          <div className={`${style.timeLineWrp}`}>
            {timeLine.content.length == 0 && (
              <>
                <div className="d-flex justify-content-center mt-5">
                  <p className="text-center text-danger">
                    <b>No Timeline Found</b>
                  </p>
                </div>
              </>
            )}

            {timeLine.content.map((element, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="textSecondary">
                  <div style={{ marginLeft: -20 }}>
                    <Ddmmmyyyy_date dateValue={element.createdTime} />
                  </div>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  onClick={() => {
                    SetTimeLineDetails(element);
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

            {/* {!showFilterForm &&
              timeLine.content.map((element, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="textSecondary">
                    <div style={{ marginLeft: -20 }}>
                      <Ddmmmyyyy_date dateValue={element.createdTime} />
                    </div>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
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
              ))} */}

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
          {/* {timeLineDetails.showPopup && (
            <MyModal>
              <ModalContainer
                zIndex={10000}
                childComponent={
                  <>
                
                    <TimeLineDetails
                      close={handlePopupClose}
                      dataObject={timeLineDetails}
                    />
                  </>
                }
              />
            </MyModal>
          )} */}

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
