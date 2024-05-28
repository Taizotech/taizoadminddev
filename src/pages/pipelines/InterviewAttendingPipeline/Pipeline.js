import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import AttendingPipeline from "./components/attendingPipeline";
import ConnectingQualifyingPipeline from "./components/connectingQualifyingPipeline";
import NotInterestedPipeline from "./components/notIntrestedPipeline";
import LeadLostPipeline from "./components/leadLostPipeline";
import InterviewAttendedPipeline from "./components/interviewAttendedPipeline";
import InterviewReschedulePipeline from "./components/reschedulePipeline";

function InterviewAttendingPipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <AttendingPipeline />
          <ConnectingQualifyingPipeline />
          <InterviewAttendedPipeline />
          <InterviewReschedulePipeline />
          <NotInterestedPipeline />
          <LeadLostPipeline />
        </div>
      </div>
    </div>
  );
}

export default InterviewAttendingPipeline;
