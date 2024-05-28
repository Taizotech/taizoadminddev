/* eslint-disable no-unused-vars */
import React, { useEffect, lazy, Suspense } from "react";
import { useState } from "react";
import candidateTabsviewStyle from "../../Candidate/CandidateTabsview.module.scss";

import { FaChartBar, FaUserCheck } from "react-icons/fa";
import { AiFillFunnelPlot } from "react-icons/ai";
import { PiUserCirclePlusBold, PiUserListFill } from "react-icons/pi";
import { TbCalendarUp } from "react-icons/tb";
import { GiDiscussion } from "react-icons/gi";
import { MdGroupAdd } from "react-icons/md";

const CandidatePipeline = lazy(() =>
  import("../../../pipelines/candidatePipeline/pipeline")
);
const FollowUp1Pipeline = lazy(() =>
  import("../../../pipelines/InterviewFollowUp1Pipeline/pipeline")
);
const FollowUp2Pipeline = lazy(() =>
  import("../../../pipelines/InterviewFollowUp2Pipeline/pipeline")
);
const InterviewAttendingPipeline = lazy(() =>
  import("../../../pipelines/InterviewAttendingPipeline/Pipeline")
);
const InterviewStatusPipeline = lazy(() =>
  import("../../../pipelines/interviewStatusPipeline/pipeline")
);
const JoiningFollowUp1Pipeline = lazy(() =>
  import("../../../pipelines/joiningFollowUp1Pipeline/pipeline")
);
const JoiningFollowUp2Pipeline = lazy(() =>
  import("../../../pipelines/joiningFollowUp2Pipeline/pipeline")
);

const JoiningdayPipeline = lazy(() =>
  import("../../../pipelines/joiningDayPipeline/pipeline")
);
function CandidatePipelineTab() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    window.location.hash = tabValue;
  };

  useEffect(() => {
    const hashValue = window.location.hash.substring(1); // Exclude the '#' symbol

    // Now 'hashValue' contains the value of the hash fragment

    if (hashValue) {
      switch (hashValue) {
        case "New Lead":
          handleTabClick("New Lead");
          break;
        case "Interview_Follow_up1":
          handleTabClick("Interview_Follow_up1");
          break;
        case "Interview_Follow_up2":
          handleTabClick("Interview_Follow_up2");
          break;
        case "Interview_Attending_Pipeline":
          handleTabClick("Interview_Attending_Pipeline");
          break;
        case "Interview_Attended_Pipeline":
          handleTabClick("Interview_Attended_Pipeline");
          break;
        case "joiningFollowUp":
          handleTabClick("joiningFollowUp1");
          break;
        case "joiningFollowUp2":
          handleTabClick("joiningFollowUp2");
          break;

          case "Joiningday":
            handleTabClick("Joiningday");
            break;

        default:
          handleTabClick("New Lead");
          break;
      }
    } else {
      handleTabClick("New Lead");
    }
  }, []);
  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          <div
            onClick={() => handleTabClick("New Lead")}
            className={` ${
              activeTab === "New Lead"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            } `}
          >
            <PiUserListFill style={{ fontSize: "18px" }} /> New Lead
          </div>
          <div
            onClick={() => handleTabClick("Interview_Follow_up1")}
            className={` ${
              activeTab === "Interview_Follow_up1"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <TbCalendarUp style={{ fontSize: "18px" }} /> Follow up 1
          </div>
          <div
            onClick={() => handleTabClick("Interview_Follow_up2")}
            className={` ${
              activeTab === "Interview_Follow_up2"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <TbCalendarUp style={{ fontSize: "18px" }} /> Follow up 2
          </div>
          <div
            onClick={() => handleTabClick("Interview_Attending_Pipeline")}
            className={` ${
              activeTab === "Interview_Attending_Pipeline"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <GiDiscussion style={{ fontSize: "18px" }} /> Interview Attending
          </div>
          <div
            onClick={() => handleTabClick("Interview_Attended_Pipeline")}
            className={` ${
              activeTab === "Interview_Attended_Pipeline"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <PiUserCirclePlusBold style={{ fontSize: "18px" }} /> Interview
            Attended
          </div>
          <div
            onClick={() => handleTabClick("joiningFollowUp1")}
            className={` ${
              activeTab === "joiningFollowUp1"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <MdGroupAdd style={{ fontSize: "18px" }} /> Joining Follow up1
          </div>
          <div
            onClick={() => handleTabClick("joiningFollowUp2")}
            className={` ${
              activeTab === "joiningFollowUp2"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <MdGroupAdd style={{ fontSize: "18px" }} /> Joining Follow up2
          </div>
          <div
            onClick={() => handleTabClick("Joiningday")}
            className={` ${
              activeTab === "Joiningday"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <FaUserCheck style={{ fontSize: "18px" }} /> Joining Day
          </div>
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "New Lead" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidatePipeline />
            </Suspense>
          </p>
        )}
        {activeTab === "Interview_Follow_up1" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <FollowUp1Pipeline />
            </Suspense>
          </p>
        )}
        {activeTab === "Interview_Follow_up2" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <FollowUp2Pipeline />
            </Suspense>
          </p>
        )}
        {activeTab === "Interview_Attending_Pipeline" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <InterviewAttendingPipeline />
            </Suspense>
          </p>
        )}
        {activeTab === "Interview_Attended_Pipeline" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <InterviewStatusPipeline />
            </Suspense>
          </p>
        )}
        {activeTab === "joiningFollowUp1" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <JoiningFollowUp1Pipeline />
            </Suspense>
          </p>
        )}
        {activeTab === "joiningFollowUp2" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <JoiningFollowUp2Pipeline />
            </Suspense>
          </p>
        )}
         {activeTab === "Joiningday" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <JoiningdayPipeline />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default CandidatePipelineTab;
