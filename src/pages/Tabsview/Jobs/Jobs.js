/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, lazy, Suspense } from "react";
import { useState } from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import candidateTabsviewStyle from "../Candidate/CandidateTabsview.module.scss";
import { HiUsers } from "react-icons/hi2";
import { hasAccessTo } from "../../../utility";
import { useSelector } from "react-redux";

const JobLeadTable = lazy(() => import("../../Jobs/JobLead/JobLeadTable"));
const JobsTable = lazy(() => import("../../Jobs/JobsAll/JobsTable"));

function Jobs() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    window.location.hash = tabValue;
  };

  const adminAccess = useSelector((state) => state.RolesAndAccessDetails);

  useEffect(() => {
    const hashValue = window.location.hash.substring(1); // Exclude the '#' symbol

    // Now 'hashValue' contains the value of the hash fragment

    if (hashValue) {
      switch (hashValue) {
        case "leads":
          handleTabClick("leads");
          break;
        case "Jobs":
          handleTabClick("Jobs");
          break;

        default:
          // handleTabClick("leads");
          break;
      }
    } else {
      // handleTabClick("leads");
      if (hasAccessTo(adminAccess.accessNames, "Jobs Leads")) {
        handleTabClick("leads");
      } else {
        handleTabClick("Jobs");
      }
    }
  }, []);
  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          {hasAccessTo(adminAccess.accessNames, "Jobs Leads") && (
            <div
              onClick={() => handleTabClick("leads")}
              className={` ${
                activeTab === "leads"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              } `}
            >
              <HiUsers /> Leads
            </div>
          )}
          {hasAccessTo(adminAccess.accessNames, "Jobs") && (
            <div
              onClick={() => handleTabClick("Jobs")}
              className={` ${
                activeTab === "Jobs"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              }`}
            >
              <BsFillBriefcaseFill /> Jobs
            </div>
          )}
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "leads" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <JobLeadTable />
            </Suspense>
          </p>
        )}
        {activeTab === "Jobs" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <JobsTable />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default Jobs;
