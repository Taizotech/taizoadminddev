/* eslint-disable no-unused-vars */
import React, { useEffect, lazy, Suspense } from "react";
import { useState } from "react";
import candidateTabsviewStyle from "../Candidate/CandidateTabsview.module.scss";
import AddNewUser from "../../AdminDetails/AddNewUser/addNewUser";
import JobRolesTable from "../../AdminDetails/ConfigarationTablesCrud/JobRoleDetails/jobRolesTable";
import { IoPersonAddSharp } from "react-icons/io5";
import SkillAddTable from "../../AdminDetails/ConfigarationTablesCrud/KeySkillsDetails/SkillDetailsTable";

const JobLead = lazy(() => import("../../Employer/jobLead/JobLead"));
const JobsTable = lazy(() => import("../../Jobs/JobsAll/JobsTable"));

function SuperAdminTableView() {
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
        case "addUser":
          handleTabClick("addUser");
          break;
        case "addRole":
          handleTabClick("addRole");
          break;
        case "addSkill":
          handleTabClick("addSkill");
          break;

        default:
          handleTabClick("addRole");
          break;
      }
    } else {
      handleTabClick("addRole");
    }
  }, []);
  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          {/* <div
            onClick={() => handleTabClick("addUser")}
            className={` ${
              activeTab === "addUser"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            } `}
          >
            <IoPersonAddSharp /> Add User
          </div> */}
          <div
            onClick={() => handleTabClick("addRole")}
            className={` ${
              activeTab === "addRole"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <IoPersonAddSharp /> Job Role
          </div>
          <div
            onClick={() => handleTabClick("addSkill")}
            className={` ${
              activeTab === "addSkill"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <IoPersonAddSharp /> Key Skill
          </div>
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "addUser" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <AddNewUser />
            </Suspense>
          </p>
        )}
        {activeTab === "addRole" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <JobRolesTable />
            </Suspense>
          </p>
        )}
        {activeTab === "addSkill" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <SkillAddTable />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default SuperAdminTableView;
