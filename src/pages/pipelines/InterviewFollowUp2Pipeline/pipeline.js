import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import InterviewFollowUp2Pipeline from "./components/InterviewFollowUp2Pipeline";
import ConnectingQualifyingPipeline from "./components/connectingQualifyingPipeline";
import LeadLostPipeline from "./components/leadLostPipeline";
import ConfirmedPipeline from "./components/confirmedPiepline";

// import ConnectingQualifyingPipeline from "./components/connectingQualifyingPipeline";
// import LeadLostPipeline from "./components/leadLostPipeline";

function FollowUp2Pipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <InterviewFollowUp2Pipeline />
          <ConnectingQualifyingPipeline />
          <ConfirmedPipeline />
          <LeadLostPipeline />
        </div>
      </div>
    </div>
  );
}

export default FollowUp2Pipeline;
