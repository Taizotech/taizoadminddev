/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, Suspense } from "react";
import { useState } from "react";
import candidateTabsviewStyle from "../Candidate/CandidateTabsview.module.scss";
import { HiUsers } from "react-icons/hi2";
// import EmployerLeadTable from "../../Employer/employerLead/EmployerLeadTable";
// import EmployerRegiterTable from "../../Employer/EmployerRegisterTable/EmployerRegiterTable";
// import KycVerify from "../../Employer/Kyc_verify";
// import EmployerEnquiryTable from "../../Employer/employerEnquiry/EmployerEnquiryTable";

import { useSelector } from "react-redux";
import { GetBugfixerView, GetEmployerLeadList } from "../../../apiServices";
import { hasAccessTo } from "../../../utility";
import BugFixerTable from "../../AdminBugFixer/BugFixerTable";
import { VscDebugCoverage } from "react-icons/vsc";

function AdminBugFixerTab() {
  const [activeTab, setActiveTab] = useState(1);
  const [TotalCount, setTotalCount] = useState({
    BugNewfeature: "",
  });

  const adminAccess = useSelector((state) => state.RolesAndAccessDetails);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    window.location.hash = tabValue;
  };
  const adminDetails = useSelector((state) => state.adminDetails);
  const BugFixerList = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter
  );
  const size = useSelector(
    (state) => state.BugFixerTableDetails.FieldBugFixFilter.size
  );
  let isSuperAdmin = adminDetails.roleID == 1;
  const EmployerLead = useSelector(
    (state) => state.EmployerLeadDetails.EmployerLeadFilter
  );

  useEffect(() => {
    const hashValue = window.location.hash.substring(1); // Exclude the '#' symbol

    // Now 'hashValue' contains the value of the hash fragment

    if (hashValue) {
      switch (hashValue) {
        case "Bug/NewFeature":
          handleTabClick("Bug/NewFeature");
          break;

        default:
          // handleTabClick("leads");
          break;
      }
    } else {
      handleTabClick("Bug/NewFeature");
    }
  }, []);

  useEffect(() => {
    GetBugfixerView(BugFixerList).then((data) => {
      setTotalCount((prev) => ({
        ...prev,
        BugNewfeature: Math.ceil(data.totalElements),
      }));
    });
  }, []);

  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          {/* {hasAccessTo(adminAccess.accessNames, "/Bug/NewFeature") && (
          
          )} */}
          <div
            onClick={() => handleTabClick("Bug/NewFeature")}
            className={` ${
              activeTab === "Bug/NewFeature"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            } `}
          >
            <VscDebugCoverage /> Raise Ticket / New Feature (
            {TotalCount.BugNewfeature})
          </div>
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "Bug/NewFeature" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <BugFixerTable />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminBugFixerTab;
