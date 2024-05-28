/* eslint-disable no-unused-vars */
import React, { useEffect, lazy, Suspense } from "react";
import { useState } from "react";
import candidateTabsviewStyle from "../Candidate/CandidateTabsview.module.scss";

import { FaChartBar } from "react-icons/fa";
import { AiFillFunnelPlot } from "react-icons/ai";

const CandidateFunnel = lazy(() =>
  import("../../CandidateFunnel/CandidateFunnel")
);
const Dashboard = lazy(() => import("../../Dashboard/Dashboard"));

function AnalyticsAdmin() {
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
        case "Bar view":
          handleTabClick("Bar view");
          break;
        case "candidate Funnel":
          handleTabClick("candidate Funnel");
          break;

        default:
          handleTabClick("Bar view");
          break;
      }
    } else {
      handleTabClick("Bar view");
    }
  }, []);
  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          <div
            onClick={() => handleTabClick("Bar view")}
            className={` ${
              activeTab === "Bar view"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            } `}
          >
            <FaChartBar /> Bar view
          </div>
          {/* <div
            onClick={() => handleTabClick("candidate Funnel")}
            className={` ${
              activeTab === "candidate Funnel"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <AiFillFunnelPlot /> cand idate Funnel
          </div> */}
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "Bar view" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </p>
        )}
        {activeTab === "candidate Funnel" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateFunnel />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default AnalyticsAdmin;
