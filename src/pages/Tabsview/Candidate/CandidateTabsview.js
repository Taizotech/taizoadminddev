/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, lazy, Suspense } from "react";
import { useState } from "react";
// import CandidateFaceBookMetaTable from "../../Candidate/FacebookMeta/CandidateFaceBookMetaTable";
import { BsMeta } from "react-icons/bs";
import candidateTabsviewStyle from "./CandidateTabsview.module.scss";
import { HiUsers } from "react-icons/hi2";
// import CandidateLeadTable from "../../Candidate/CandidateLeadTable/CandidateLeadTable";
import { RiUserFollowLine } from "react-icons/ri";
import { VscCalendar } from "react-icons/vsc";
// import CandidateInterviewTable from "../../Candidate/Candidate interview schedule list/CandidateInterviewTable";
// import RegisteredCandidateTable from "../../Candidate/CandidateRegistered/RegisteredCandidateTable";
// import MidLevelList from "../../Candidate/MidLevelCandidate/MidLevelList";
import { useDispatch, useSelector } from "react-redux";

import {
  GetAdminDetailsByID,
  GetCanMidLevellist,
  GetCandidateLead,
  GetJoinedCandidate,
  GetcanInterviews,
  PostCandidateFBmeta,
  postCandidate,
} from "../../../apiServices";
import {
  CandidateLeadActions,
  CandidateRegisteredActions,
  FBmetaLeadsSliceActions,
  interviewListActions,
} from "../../../redux-store/store";
import "aos/dist/aos.css";
import CandidateJoined from "../../Candidate/JoinedCandidate/CandidateJoined";
import { MdJoinInner } from "react-icons/md";
import CandidateDailyTask from "../../Candidate/CandidateDialyTask/CandidateDailyTask";
import { FaTasks } from "react-icons/fa";
import { hasAccessTo } from "../../../utility";
import CandidateResource from "../../Candidate/ResourceCandidate/CandidateResource";
import RecruitmentsLeads from "../../Candidate/Recruitmentleads/RecruitmentsLeads";
// AOS.init({
//   duration: 500,
//   easing: "ease",
// });
const RegisteredCandidateTable = lazy(() =>
  import("../../Candidate/CandidateRegistered/RegisteredCandidateTable")
);

const CandidateInterviewTable = lazy(() =>
  import(
    "../../Candidate/Candidate interview schedule list/CandidateInterviewTable"
  )
);

const MidLevelList = lazy(() =>
  import("../../Candidate/MidLevelCandidate/MidLevelList")
);

const CandidateLeadTable = lazy(() =>
  import("../../Candidate/CandidateLeadTable/CandidateLeadTable")
);

const CandidateFaceBookMetaTable = lazy(() =>
  import("../../Candidate/FacebookMeta/CandidateFaceBookMetaTable")
);

function CandidateTabsview() {
  const [activeTab, setActiveTab] = useState(1);
  const [TotalCount, setTotalCount] = useState({
    FbmetaCount: "",
    LeadCount: "",
    Register: "",
    interviews: "",
    MidLevel: "",
    joindeCandidate: "",
  });

  const adminAccess = useSelector((state) => state.RolesAndAccessDetails);
  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     // Check if the keypress occurs within an input field
  //     const isInputField =
  //       event.target.tagName === "INPUT" &&
  //       event.target.type === "text" &&
  //       event.target.id == "outlined-multiline-flexible";

  //     // If not within the specified input field, perform the tab switch
  //     if (!isInputField) {
  //       switch (event.key) {
  //         case "1":
  //           handleTabClick("metaLeads");
  //           break;
  //         case "2":
  //           handleTabClick("leads");
  //           break;
  //         case "3":
  //           handleTabClick("registered");
  //           break;
  //         case "4":
  //           handleTabClick("interviews");
  //           break;
  //         case "5":
  //           handleTabClick("Joined");
  //           break;
  //         // case "6":
  //         //   handleTabClick("CandidateDailyTask");
  //         //   break;
  //         default:
  //           // Default action if no matching key is pressed
  //           handleTabClick("metaLeads");
  //           break;
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [activeTab]);

  const Dispatch = useDispatch();

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    window.location.hash = tabValue;
  };
  const FBmetaListFilter = useSelector(
    (state) => state.FbmetaLeadDetails.FBmetaListFilter
  );
  const CanLeadFilter = useSelector(
    (state) => state.CandidateLeadTable.CandidateLeadFilter
  );
  const CandidateRegisterFilter = useSelector(
    (state) => state.CandidateRegistered.filterData
  );
  const interviewFilter = useSelector(
    (state) => state.interviewListDetails.interviewFilter
  );
  const CandidateMidLevelFilter = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter
  );
  const JoinedList = useSelector(
    (state) => state.CandidateJoinedListDetails.CandidateJoinedFilter
  );
  const adminDetails = useSelector((state) => state.adminDetails);
  const isSuperAdmin = adminDetails.roleID === 1;
  useEffect(() => {
    const hashValue = window.location.hash.substring(1); // Exclude the '#' symbol

    let adminId = localStorage.getItem("adminID");

    async function getAdminDetails() {
      let response = await GetAdminDetailsByID(adminId);
      let role = response.roles[0].roleName == "Super Amdin";

      if (!role) return;
    }

    // Now 'hashValue' contains the value of the hash fragment

    console.log(hashValue);
    if (hashValue) {
      switch (hashValue) {
        case "metaLeads":
          handleTabClick("metaLeads");
          break;
        case "leads":
          handleTabClick("leads");
          break;
        case "registered":
          handleTabClick("registered");
          break;
        case "recruitmentleads":
          handleTabClick("recruitmentleads");
          break;
        case "interviews":
          handleTabClick("interviews");
          break;
        case "Joined":
          handleTabClick("Joined");
          break;
        case "seniorLevel":
          handleTabClick("seniorLevel");
          break;
        case "CandidateDailyTask":
          handleTabClick("CandidateDailyTask");
          break;
        case "candidateResource":
          handleTabClick("candidateResource");
          break;
        default:
          // handleTabClick("metaLeads");
          break;
      }
    } else {
      // handleTabClick("metaLeads");

      if (adminAccess.roleName == "Blue collar recruitment") {
        handleTabClick("registered");
      } else {
        handleTabClick("metaLeads");
      }
    }
  }, []);

  useEffect(() => {
    // to set super admin id as 0
    let id = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterAdminId(id));
  }, [adminDetails]);

  useEffect(() => {
    // to set registered candidate filter adminId to -1
    let adminId = isSuperAdmin ? -1 : localStorage.getItem("adminID");
    Dispatch(
      CandidateRegisteredActions.setRegisterCandidateListFilterAdminId(adminId)
    );
  }, [adminDetails]);

  useEffect(() => {
    // to set admin id to null if super admin
    if (isSuperAdmin) {
      Dispatch(CandidateLeadActions.setCandidateLeadFilterAdminId("null"));
      Dispatch(interviewListActions.setInterviewFilterShceduleBy(0));
    }
  }, [adminDetails]);

  useEffect(() => {
    if (isSuperAdmin) {
      PostCandidateFBmeta(FBmetaListFilter).then((data) => {
        setTotalCount((prev) => ({
          ...prev,
          FbmetaCount: data.totalCount,
        }));
      });

      GetCandidateLead(CanLeadFilter).then((data) => {
        setTotalCount((prev) => ({
          ...prev,
          LeadCount: data.totalCount,
        }));
      });

      postCandidate(CandidateRegisterFilter)
        .then((data) => {
          if (data && data[0] && data[0].total_count !== undefined) {
            setTotalCount((prev) => ({
              ...prev,
              Register: data[0].total_count,
            }));
          } else {
            console.error("Invalid data structure in API response");
            // Handle the error as needed
          }
        })
        .catch((error) => {
          console.error("Error in postCandidate API call:", error);
          // Handle the error as needed
        });

      GetcanInterviews(interviewFilter).then((data) => {
        setTotalCount((prev) => ({
          ...prev,
          interviews: data.totalCount,
        }));
      });

      GetCanMidLevellist(CandidateMidLevelFilter).then((data) => {
        if (data && data.data && data.data.totalElements !== undefined) {
          setTotalCount((prev) => ({
            ...prev,
            MidLevel: data.data.totalElements,
          }));
        } else {
          console.error(
            "Invalid data structure in API response for GetCanMidLevellist"
          );
        }
      });
      GetJoinedCandidate(JoinedList).then((data) => {
        console.log(data, "Candidate Joinded response");
        setTotalCount((prev) => ({
          ...prev,
          joindeCandidate: data.totalCount,
        }));
        // setJoinedCandidateList(data.candidateList);
        // setpageCount(Math.ceil(data.totalCount / size));
      });
    }
  }, [
    isSuperAdmin,
    FBmetaListFilter,
    CanLeadFilter,
    CandidateRegisterFilter,
    interviewFilter,
    JoinedList,
  ]);
  useEffect(() => {
    PostCandidateFBmeta(FBmetaListFilter).then((data) => {
      console.log(data, "FB TotalCount");
      setTotalCount((prev) => ({
        ...prev,
        FbmetaCount: data.totalCount,
      }));
    });
    GetJoinedCandidate(JoinedList).then((data) => {
      console.log(data, "Candidate Joinded response");
      setTotalCount((prev) => ({
        ...prev,
        joindeCandidate: data.totalCount,
      }));
      // setJoinedCandidateList(data.candidateList);
      // setpageCount(Math.ceil(data.totalCount / size));
    });
    GetCandidateLead(CanLeadFilter).then((data) => {
      setTotalCount((prev) => ({
        ...prev,
        LeadCount: data.totalCount,
      }));
    });

    postCandidate(CandidateRegisterFilter)
      .then((data) => {
        if (data && data[0] && data[0].total_count !== undefined) {
          setTotalCount((prev) => ({
            ...prev,
            Register: data[0].total_count,
          }));
        } else {
          console.error("Invalid data structure in API response");
          // Handle the error as needed
        }
      })
      .catch((error) => {
        console.error("Error in postCandidate API call:", error);
        // Handle the error as needed
      });

    GetcanInterviews(interviewFilter).then((data) => {
      setTotalCount((prev) => ({
        ...prev,
        interviews: data.totalCount,
      }));
    });

    GetCanMidLevellist(CandidateMidLevelFilter).then((data) => {
      if (data && data.data && data.data.totalElements !== undefined) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel: data.data.totalElements,
        }));
      } else {
        console.error(
          "Invalid data structure in API response for GetCanMidLevellist"
        );
      }
    });
  }, []);
  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          <>
            <div
              onClick={() => handleTabClick("metaLeads")}
              className={` ${
                activeTab === "metaLeads"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              } `}
            >
              <BsMeta /> Meta Leads ({TotalCount.FbmetaCount})
            </div>
          </>

          <div
            onClick={() => handleTabClick("leads")}
            className={` ${
              activeTab === "leads"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <HiUsers /> Leads ({TotalCount.LeadCount})
          </div>

          <div
            onClick={() => handleTabClick("registered")}
            className={` ${
              activeTab === "registered"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <RiUserFollowLine />{" "}
            {adminAccess.roleName == "Blue collar recruitment"
              ? "Leads"
              : "Registered"}{" "}
            ({TotalCount.Register})
          </div>

          {/* recruitment team lead  */}
          {/* <div
            onClick={() => handleTabClick("recruitmentleads")}
            className={` ${
              activeTab === "recruitmentleads"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <HiUsers />
            Recruitment Leads
          </div> */}

          <div
            onClick={() => handleTabClick("interviews")}
            className={` ${
              activeTab === "interviews"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <VscCalendar /> Interviews ({TotalCount.interviews})
          </div>

          <div
            onClick={() => handleTabClick("Joined")}
            className={` ${
              activeTab === "Joined"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <MdJoinInner /> Joined ({TotalCount.joindeCandidate})
          </div>

          {/* {hasAccessTo(adminAccess.accessNames, "Candidate Resource") && (
            
          )} */}
          {/* <div
            onClick={() => handleTabClick("candidateResource")}
            className={` ${
              activeTab === "candidateResource"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <MdJoinInner /> Resource ({TotalCount.joindeCandidate})
          </div> */}
          {/* {
            <div
              onClick={() => handleTabClick("CandidateDailyTask")}
              className={` ${
                activeTab === "CandidateDailyTask"
                  ? candidateTabsviewStyle.activetag
                  : candidateTabsviewStyle.unactivetag
              }`}
            >
              <FaTasks /> Daily Task ({TotalCount.joindeCandidate})
            </div>
          } */}
          {/* <div
            onClick={() => handleTabClick("seniorLevel")}
            className={` ${
              activeTab === "seniorLevel"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <LuUserCircle /> Senior Level ({TotalCount.MidLevel})
          </div> */}
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "metaLeads" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateFaceBookMetaTable />
            </Suspense>
          </p>
        )}
        {activeTab === "leads" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateLeadTable />
            </Suspense>
          </p>
        )}
        {activeTab === "registered" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <RegisteredCandidateTable />{" "}
            </Suspense>
          </p>
        )}
        {activeTab === "recruitmentleads" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <RecruitmentsLeads />{" "}
            </Suspense>
          </p>
        )}
        {activeTab === "interviews" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateInterviewTable />
            </Suspense>
          </p>
        )}
        {activeTab === "Joined" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateJoined />
            </Suspense>
          </p>
        )}
        {activeTab === "seniorLevel" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <MidLevelList />
            </Suspense>
          </p>
        )}
        {activeTab === "CandidateDailyTask" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateDailyTask />
            </Suspense>
          </p>
        )}
        {activeTab === "candidateResource" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CandidateResource />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default CandidateTabsview;
