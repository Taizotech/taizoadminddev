import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import JoinningFollowUp1LeadPipeline from "./components/joinningFollowUp1Pipeline";
import Joinning1ConnectingPipeline from "./components/joining1ConnectingPipeline";
import Joining1ConfirmedPipeline from "./components/joining1ConfirmedPipeline";
import Joining1LeadLostPipeline from "./components/joining1LeadLostPipeline";
import Joining1NotInterestedPipeline from "./components/joining1NotInterestedPipeline";

function JoiningFollowUp1Pipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <JoinningFollowUp1LeadPipeline />
          <Joinning1ConnectingPipeline />
          <Joining1ConfirmedPipeline />
          <Joining1NotInterestedPipeline />
          <Joining1LeadLostPipeline />
        </div>
      </div>
    </div>
  );
}

export default JoiningFollowUp1Pipeline;
