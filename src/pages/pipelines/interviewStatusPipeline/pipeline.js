import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import InterviewStatusLeadPipeline from "./components/interviewStatusLead";
import ConnectingQualifyingPipeline from "./components/connectingQualifyingPipeline";
import OfferRejectedPipeline from "./components/offerRejectedPipeline";
import NotSelectedPipeline from "./components/notSelectedPipeline";
import LeadLostPipeline from "./components/leadLostPipeline";
import OfferAcceptedPipeline from "./components/offerAcceptedPipeline";

function InterviewStatusPipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <InterviewStatusLeadPipeline />
          <ConnectingQualifyingPipeline />
          <OfferAcceptedPipeline />
          <OfferRejectedPipeline />
          <NotSelectedPipeline />
          <LeadLostPipeline />
        </div>
      </div>
    </div>
  );
}

export default InterviewStatusPipeline;
