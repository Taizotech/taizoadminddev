/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, Suspense, lazy } from "react";
import { useState } from "react";
import candidateTabsviewStyle from "../Candidate/CandidateTabsview.module.scss";
import { HiUsers } from "react-icons/hi2";
import { RiUserFollowLine } from "react-icons/ri";
// import EmployerLeadTable from "../../Employer/employerLead/EmployerLeadTable";
// import EmployerRegiterTable from "../../Employer/EmployerRegisterTable/EmployerRegiterTable";
// import KycVerify from "../../Employer/Kyc_verify";
// import EmployerEnquiryTable from "../../Employer/employerEnquiry/EmployerEnquiryTable";
import { AiTwotoneCustomerService } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import {
  GetEmployerEnquiry,
  GetEmployerFilterDetails,
  GetEmployerLeadList,
} from "../../../apiServices";
import { base_url } from "../../../App";
import { hasAccessTo } from "../../../utility";

const EmployerLeadTable = lazy(() =>
  import("../../Employer/employerLead/EmployerLeadTable")
);
const EmployerEnquiryTable = lazy(() =>
  import("../../Employer/employerEnquiry/EmployerEnquiryTable")
);
const KycVerify = lazy(() => import("../../Employer/Kyc_verify"));

const EmployerRegiterTable = lazy(() =>
  import("../../Employer/EmployerRegisterTable/EmployerRegiterTable")
);

function EmployerTabs() {
  const [activeTab, setActiveTab] = useState(1);
  const [TotalCount, setTotalCount] = useState({
    LeadCount: "",
    Register: "",
    Kyc: "",
    Enquiry: "",
  });

  const adminAccess = useSelector((state) => state.RolesAndAccessDetails);

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     const isInputField = event.target.tagName === "INPUT";
  //     if (!isInputField) {
  //       switch (event.key) {
  //         case "1":
  //           handleTabClick("leads");
  //           break;
  //         case "2":
  //           handleTabClick("registered");
  //           break;
  //         case "3":
  //           handleTabClick("kyc");
  //           break;
  //         case "4":
  //           handleTabClick("enquiry");
  //           break;
  //         // case "5":
  //         //   handleTabClick("leads");
  //         //   break;
  //         default:
  //           handleTabClick("leads");
  //           break;
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);
  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    window.location.hash = tabValue;
  };
  const adminDetails = useSelector((state) => state.adminDetails);

  let isSuperAdmin = adminDetails.roleID == 1;
  const EmployerLead = useSelector(
    (state) => state.EmployerLeadDetails.EmployerLeadFilter
  );
  const EmployerRegister = useSelector(
    (state) => state.EmployerRegisterDetails.EmployerRegisterFilter
  );
  const EmployerFilter = useSelector(
    (state) => state.EmployerEnquiryDetails.EmployerEnquiryFilter
  );
  useEffect(() => {
    const hashValue = window.location.hash.substring(1); // Exclude the '#' symbol

    // Now 'hashValue' contains the value of the hash fragment

    if (hashValue) {
      switch (hashValue) {
        case "leads":
          handleTabClick("leads");
          break;
        case "registered":
          handleTabClick("registered");
          break;
        case "kyc":
          handleTabClick("kyc");
          break;
        case "enquiry":
          handleTabClick("enquiry");
          break;

        default:
          // handleTabClick("leads");
          break;
      }
    } else {
      handleTabClick("leads");
    }
  }, []);

  function GetCompanyDetails(filterPage) {
    fetch(
      `${base_url}/viewKYCDocuments?page=0&start_date=2000-01-01&end_date=2030-01-01&size=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalCount((prev) => ({
          ...prev,
          Kyc: data.recordsTotal,
        }));
      });
  }
  useEffect(() => {
    GetEmployerLeadList(EmployerLead).then((data) => {
      setTotalCount((prev) => ({
        ...prev,
        LeadCount: data.data.totalElements,
      }));
    });
    GetEmployerFilterDetails(EmployerRegister).then((data) => {
      setTotalCount((prev) => ({
        ...prev,
        Register: data.totalCount,
      }));
    });
    GetEmployerEnquiry(EmployerFilter).then((data) => {
      setTotalCount((prev) => ({
        ...prev,
        Enquiry: data.totalCount,
      }));
    });
    GetCompanyDetails();
  }, []);

  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          {hasAccessTo(adminAccess.accessNames, "Employer Leads") && (
            <div
              onClick={() => handleTabClick("leads")}
              className={` ${
                activeTab === "leads"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              } `}
            >
              <HiUsers /> Leads ({TotalCount.LeadCount})
            </div>
          )}
          {hasAccessTo(adminAccess.accessNames, "Employer Registered") && (
            <div
              onClick={() => handleTabClick("registered")}
              className={` ${
                activeTab === "registered"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              }`}
            >
              <RiUserFollowLine /> Registered ({TotalCount.Register})
            </div>
          )}
          {hasAccessTo(adminAccess.accessNames, "Employer KYC") && (
            <div
              onClick={() => handleTabClick("kyc")}
              className={` ${
                activeTab === "kyc"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              }`}
            >
              <TiTick /> KYC ({TotalCount.Kyc})
            </div>
          )}
          {isSuperAdmin && (
            <div
              onClick={() => handleTabClick("enquiry")}
              className={` ${
                activeTab === "enquiry"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              }`}
            >
              <AiTwotoneCustomerService /> Enquiry Registered (
              {TotalCount.Enquiry})
            </div>
          )}
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "leads" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <EmployerLeadTable />
            </Suspense>
          </p>
        )}
        {activeTab === "registered" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <EmployerRegiterTable />
            </Suspense>
          </p>
        )}
        {activeTab === "kyc" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <KycVerify />
            </Suspense>
          </p>
        )}
        {activeTab === "enquiry" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <EmployerEnquiryTable />
            </Suspense>
          </p>
        )}
        {/* {activeTab === 5 && (
          <p>
            <EmployerFieldLeads />
          </p>
        )} */}
      </div>
    </div>
  );
}

export default EmployerTabs;
