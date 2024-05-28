import React from "react";
import style from "../candidatePipeline/pipeline.module.scss";
import JoiningDayLeadPipeline from "./components/joiningDayLeadPipeline";
import JoiningDayConnectingPipeline from "./components/joiningDayConnectingPipeline";
import JoiningDayConfirmedPipeline from "./components/joiningDayConfirmedPipeline";
import JoiningDayLeadLostPipeline from "./components/joiningDayLeadLostPipeline";
import JoiningDayNotInterestedPipeline from "./components/joiningDayNotInterestedPipeline";


function JoiningDayPipeline() {
  return (
    <div>
      <div className={`${style.pipelineWrp}`}>
        <div className={`${style.pipelineBox}`}>
          <JoiningDayLeadPipeline />
          <JoiningDayConnectingPipeline />
          <JoiningDayConfirmedPipeline />
          <JoiningDayNotInterestedPipeline/>
          <JoiningDayLeadLostPipeline />
        </div>
      </div>
    </div>
  );
}
export default JoiningDayPipeline;
