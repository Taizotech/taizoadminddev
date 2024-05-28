import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import InterviewFollowUp1Pipeline from "./components/interviewFollowUp1Pipeline";
import ConnectingQualifyingPipeline from "./components/connectingQualifyingPipeline";
import LeadLostPipeline from "./components/leadLostPipeline";
import ConfirmedPipeline from "./components/confirmedPipeline";

function FollowUp1Pipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <InterviewFollowUp1Pipeline />
          <ConnectingQualifyingPipeline />
          <ConfirmedPipeline />
          <LeadLostPipeline />
        </div>
      </div>
    </div>
  );
}

export default FollowUp1Pipeline;
