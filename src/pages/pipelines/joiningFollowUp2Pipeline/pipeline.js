import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import JoinningFollowUp2LeadPipeline from "./components/joiningFollowUp2Pipeline";
import Joining2ConnectingPipeline from "./components/joining2ConnectingPipeline";
import Joining2ConfirmedPipeline from "./components/joining2ConfirmedPipeline";
import JoinningFollowUp2LeadLostPipeline from "./components/joining2LeadLostPipeline";
import Joinning2NotInterestedPipeline from "./components/joining2NotInterestedPipeline";

function JoiningFollowUp2Pipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <JoinningFollowUp2LeadPipeline />
          <Joining2ConnectingPipeline />
          <Joining2ConfirmedPipeline />

          <Joinning2NotInterestedPipeline />
          <JoinningFollowUp2LeadLostPipeline />
        </div>
      </div>
    </div>
  );
}
export default JoiningFollowUp2Pipeline;
