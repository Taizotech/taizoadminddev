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
import style from "./FacebookMetaLeadTimeline.module.scss";
import { useRef } from "react";
import { Ddmmmyyyy_date, MyModal, textTruncate } from "../../../utility";
import ModalContainer from "../../../components/modal_popup";
import { useDispatch, useSelector } from "react-redux";
import { showHideDetailsActions } from "../../../redux-store/store";
import TimelineMetaDetails from "./TimelineMetaDetails";
import AddNotesFBLead from "./PostCandidateNotes";
// import AddNotesCandidateLead from "./components/timeLinePost";

// import candidateLeadDetails from "./components/timeLineDetails";
// import TimeLineFilter from "./components/timeLineFilter";

export default function TimelineFacebookMeta({ facebookId }) {
  const [timeLineDetails, setTimeLineDetails] = useState({
    details: {},
    showPopup: false,
  });

  const scrollableRef = useRef(null);

  const [timeLine, setTimeLine] = useState({
    content: [],
    totalPages: 0,
    // canLeadId: canLeadId ? canLeadId : null,
    facebookId: facebookId ? facebookId : null,
    startDate: "",
    endDate: "",
    eventType: null,
  });

  const Dispatch = useDispatch();

  const ShowTimeline = useSelector(
    (state) => state.showHideDetails.candidateLead.leadTimeLine
  );

  const candidateLeadDetails = useSelector(
    (state) => state.showHideDetails.candidateLead
  );

  function showTimeLineDetails(name, value) {
    Dispatch(showHideDetailsActions.setCandidateLeadDetails({ [name]: value }));
  }

  function SetTimeLineDetails(data) {
    setTimeLineDetails((prev) => ({ ...prev, details: data }));
  }

  useEffect(() => {
    console.log(ShowTimeline);
  }, [ShowTimeline]);

  const [page, setPage] = useState(0);

  useEffect(() => {
    getTimeLine(timeLine, page);
  }, [page]);

  function getTimeLine(timeLine, page) {
    GetCanTimeline(timeLine, page).then((res) => {
      setTimeLine((prev) => ({
        ...prev,
        content: res.content,
        totalPages: res.totalPages,
      }));
    });
  }

  useEffect(() => {
    getTimeLine(timeLine, page);
  }, [
    candidateLeadDetails.leadDetails.show,
    candidateLeadDetails.addNotes.show,
  ]);

  return (
    <>
      <div>
        <div>
          {/* <div className="row">
            <div className="col-1"></div>
            <div className="col-9">
              {" "}
              <h4 className="text-center">FacebookMeta Lead's Timeline </h4>
            </div>
            <div className="col-2 pe-3">
              {" "}
              <Button
                // variant="outlined"
                color="error"
                size="small"
                sx={{ width: "20px" }}
                onClick={() => {
                  handleClosePopup();
                }}
              >
                <CloseIcon></CloseIcon>
              </Button>
            </div>
          </div> */}
        </div>

        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
            maxHeight: "400px", // Set your desired maximum height
            overflowY: "auto", // Enable vertical scroll
          }}
        >
          {/* <div className=" d-flex flex-row justify-content-end">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                showTimeLineDetails("addNotes", true);
              }}
            >
              + Add Notes
            </Button>
          </div> */}

          {/* <div>
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
          </div> */}
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
            {timeLine.content.map((element, index) => (
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
                    showTimeLineDetails("leadDetails", true);
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
          {candidateLeadDetails.leadDetails.show && (
            <MyModal>
              <ModalContainer
                zIndex={1001}
                childComponent={
                  <>
                    <TimelineMetaDetails
                      dataObject={timeLineDetails}
                      close={() => {
                        showTimeLineDetails("leadDetails", false);
                      }}
                    />
                  </>
                }
              />
            </MyModal>
          )}

          {candidateLeadDetails.addNotes.show && (
            <MyModal>
              <ModalContainer
                zIndex={1001}
                childComponent={
                  <>
                    <AddNotesFBLead
                      facebookId={candidateLeadDetails.leadTimeLine.facebookId}
                      close={() => {
                        showTimeLineDetails("addNotes", false);
                      }}
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
