import React from "react";
import style from "./pipeline.module.scss";
import LeadGenerationPipeline from "./components/leadGenerationPipeline";
import CanCallRemainderPipeline from "./components/callRemainderPipeline";
import NotQualifiedPipeline from "./components/notQualifiedPipeline";
import CanRegisteredPipeline from "./components/canRegisteredPipeline";
import InterviewFollowUpPipeline from "./components/interviewFollowUpPipeline";
import CandidateLeadlost from "./components/candidateLeadlost";

function CandidatePipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <LeadGenerationPipeline />
          <CanCallRemainderPipeline />
          <NotQualifiedPipeline />
          <CanRegisteredPipeline />
          <InterviewFollowUpPipeline />
          <CandidateLeadlost />
        </div>
      </div>
    </div>
  );
}

export default CandidatePipeline;
