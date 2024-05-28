/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, lazy, Suspense } from "react";
import { useState } from "react";
// import CandidateFaceBookMetaTable from "../../Candidate/FacebookMeta/CandidateFaceBookMetaTable";
import candidateTabsviewStyle from "../Candidate/CandidateTabsview.module.scss";
// import CandidateLeadTable from "../../Candidate/CandidateLeadTable/CandidateLeadTable";
import { RiScreenshot2Line } from "react-icons/ri";
import { LuUserCircle } from "react-icons/lu";
import { TbUserSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { GetCanMidLevellist, GetMidseniorSourcing } from "../../../apiServices";
import {
  CandidateLeadActions,
  CandidateMidLevelActions,
  CandidateMidLevelsourcingActions,
  CandidateRegisteredActions,
  FBmetaLeadsSliceActions,
  interviewListActions,
} from "../../../redux-store/store";
import MidLevelSeniorScreening from "../../Candidate/MidLevelCandidate/MidLevelSeniorScreening";
import MidLevelSeniorShortlist from "../../Candidate/MidLevelCandidate/MidLevelSeniorShortlist";
import { PiUserListBold } from "react-icons/pi";
import MidLevelSourcing from "../../Candidate/MidLevelCandidate/MidSeniorsourcingtable";

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

function MidLevelTabsview() {
  const [activeTab, setActiveTab] = useState(1);
  const [TotalCount, setTotalCount] = useState({
    MidLevel_S1: "",
    MidLevel_S2: "",
    MidLevel_S3: "",
    MidLevel_S4: "",
  });

  const Dispatch = useDispatch();

  const handleTabClick = (tabValue) => {
    Dispatch(CandidateMidLevelActions.setCandidateMidLevelFilterPage(0));

    let initialValue = {
      educationQualification: "",
      jobCategory: "",
      experienceInManufacturing: "",
      preferredJobLocation: "",
      mobileNumber: "",
      joiningDate: "",
      currentlyWorking: "",
      maxExperience: 0,
      minExperience: 0,
      status: 0,
      page: 0,
      pageSize: 10,
      createdTimeEnd: "",
      createdTimeStart: "",
      dateFilterType: "",
    };

    Dispatch(CandidateMidLevelActions.setCandidateMidLevelFilter(initialValue));
    Dispatch(CandidateMidLevelActions.setCandidateMidLevelRedDot(false));

    setActiveTab(tabValue);
    window.location.hash = tabValue;
  };
  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     const isInputField = event.target.tagName === "INPUT";
  //     if (!isInputField) {
  //       switch (event.key) {
  //         case "2":
  //           handleTabClick("leads");
  //           break;
  //         case "1":
  //           handleTabClick("sourcing");
  //           break;
  //         case "3":
  //           handleTabClick("Screening");
  //           break;
  //         case "4":
  //           handleTabClick("Shortlist");
  //           break;
  //         // case "5":
  //         //   handleTabClick("leads");
  //         //   break;
  //         default:
  //           handleTabClick("sourcing");
  //           break;
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);
  const CandidateMidLevelFilter = useSelector(
    (state) => state.CandidateMidLevelDetails.CandidateMidLevelFilter
  );
  const CandidateMidLevelFiltersource = useSelector(
    (state) =>
      state.CandidateMidLevelsourcingDetails.CandidateMidLevelsourcingFilter
  );
  const adminDetails = useSelector((state) => state.adminDetails);
  const isSuperAdmin = adminDetails.roleID === 1;
  useEffect(() => {
    const hashValue = window.location.hash.substring(1); // Exclude the '#' symbol

    // Now 'hashValue' contains the value of the hash fragment

    console.log(hashValue);
    if (hashValue) {
      switch (hashValue) {
        case "leads":
          handleTabClick("leads");
          break;
        case "sourcing":
          handleTabClick("sourcing");
          break;
        case "Screening":
          handleTabClick("Screening");
          break;
        case "Shortlist":
          handleTabClick("Shortlist");
          break;
        default:
          handleTabClick("sourcing");
          break;
      }
    } else {
      handleTabClick("sourcing");
    }
  }, []);

  useEffect(() => {
    // to set super admin id as 0
    let id = isSuperAdmin ? 0 : localStorage.getItem("adminID");
    Dispatch(FBmetaLeadsSliceActions.setFBmetaListFilterAdminId(id));
    Dispatch(
      CandidateMidLevelsourcingActions.setCandidateMidLevelsourcingFilterAdmin(
        id
      )
    );
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
    GetCanMidLevellist(CandidateMidLevelFilter, 0).then((data) => {
      if (data.code === 400) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel_S1: 0,
        }));
        return;
      } else if (data && data.data && data.data.totalElements !== undefined) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel_S1: data.data.totalElements,
        }));
      } else {
        console.error(
          "Invalid data structure in API response for GetCanMidLevellist"
        );
      }
    });
    GetCanMidLevellist(CandidateMidLevelFilter, 1).then((data) => {
      if (data.code === 400) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel_S2: 0,
        }));
        return;
      } else if (data && data.data && data.data.totalElements !== undefined) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel_S2: data.data.totalElements,
        }));
      } else {
        console.error(
          "Invalid data structure in API response for GetCanMidLevellist"
        );
      }
    });
    GetCanMidLevellist(CandidateMidLevelFilter, 2).then((data) => {
      if (data.code === 400) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel_S3: 0,
        }));
        return;
      } else if (data && data.data && data.data.totalElements !== undefined) {
        setTotalCount((prev) => ({
          ...prev,
          MidLevel_S3: data.data.totalElements,
        }));
      } else {
        console.error(
          "Invalid data structure in API response for GetCanMidLevellist"
        );
      }
    });
    GetMidseniorSourcing(CandidateMidLevelFiltersource)
      .then((data) => {
        if (data && data.data && data.data.totalElements !== undefined) {
          console.log(data.data.totalElements, "dataElement");
          setTotalCount((prev) => ({
            ...prev,
            MidLevel_S4: data.data.totalElements,
          }));
        } else {
          console.error(
            "Invalid data structure or missing totalElements property"
          );
        }
      })
      .catch((error) => {
        console.error("Error in API call:", error);
      });
  }, []);

  useEffect(() => {
    console.log(TotalCount, "----------------------------------------");
  }, [TotalCount]);

  useEffect(() => {
    if (activeTab === "sourcing") {
      if (isSuperAdmin) {
        GetMidseniorSourcing(CandidateMidLevelFiltersource).then((data) => {
          if (data.code === 400) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S4: 0,
            }));
            return;
          } else if (
            data &&
            data.data &&
            data.data.totalElements !== undefined
          ) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S4: data.data.totalElements,
            }));
          } else {
            console.error(
              "Invalid data structure in API response for GetCanMidLevellist"
            );
          }
        });
      }
    } else if (activeTab === "leads") {
      if (isSuperAdmin) {
        GetCanMidLevellist(CandidateMidLevelFilter, 0).then((data) => {
          if (data.code === 400) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S1: 0,
            }));
            return;
          } else if (
            data &&
            data.data &&
            data.data.totalElements !== undefined
          ) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S1: data.data.totalElements,
            }));
          } else {
            console.error(
              "Invalid data structure in API response for GetCanMidLevellist"
            );
          }
        });
      }
    } else if (activeTab === "Screening") {
      if (isSuperAdmin) {
        GetCanMidLevellist(CandidateMidLevelFilter, 1).then((data) => {
          if (data.code === 400) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S2: 0,
            }));
            return;
          } else if (
            data &&
            data.data &&
            data.data.totalElements !== undefined
          ) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S2: data.data.totalElements,
            }));
          } else {
            console.error(
              "Invalid data structure in API response for GetCanMidLevellist"
            );
          }
        });
      }
    } else if (activeTab === "Shortlist") {
      if (isSuperAdmin) {
        GetCanMidLevellist(CandidateMidLevelFilter, 2).then((data) => {
          if (data.code === 400) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S3: 0,
            }));
            return;
          } else if (
            data &&
            data.data &&
            data.data.totalElements !== undefined
          ) {
            setTotalCount((prev) => ({
              ...prev,
              MidLevel_S3: data.data.totalElements,
            }));
          } else {
            console.error(
              "Invalid data structure in API response for GetCanMidLevellist"
            );
          }
        });
      }
    }
  }, [
    isSuperAdmin,
    CandidateMidLevelFilter,
    CandidateMidLevelFiltersource,
    activeTab,
  ]);

  return (
    <div>
      <div className={`tab-buttons ${candidateTabsviewStyle.tab_buttons}`}>
        <div className={`d-flex ${candidateTabsviewStyle.tab_hr}`}>
          {/* <div
            onClick={() => handleTabClick("metaLeads")}
            className={` ${
              activeTab === "metaLeads"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            } `}
          >
            <BsMeta /> Meta Leads ({TotalCount.FbmetaCount})
          </div> */}

          <div
            onClick={() => handleTabClick("sourcing")}
            className={` ${
              activeTab === "sourcing"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <TbUserSearch /> Sourcing ({TotalCount.MidLevel_S4})
          </div>
          <div
            onClick={() => handleTabClick("leads")}
            className={` ${
              activeTab === "leads"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <LuUserCircle /> Leads ({TotalCount.MidLevel_S1})
          </div>
          <div
            onClick={() => handleTabClick("Screening")}
            className={` ${
              activeTab === "Screening"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            {/* <img src={screening} width={20} height={20} />  */}
            <RiScreenshot2Line /> Screening ({TotalCount.MidLevel_S2})
          </div>
          <div
            onClick={() => handleTabClick("Shortlist")}
            className={` ${
              activeTab === "Shortlist"
                ? candidateTabsviewStyle.activetag
                : candidateTabsviewStyle.unactivetag
            }`}
          >
            <PiUserListBold /> Resource ({TotalCount.MidLevel_S3})
          </div>
        </div>
        <hr style={{ borderTop: "10px solid #ccc" }} />
      </div>

      <div className={`tab-content ${candidateTabsviewStyle.tab_content}`}>
        {activeTab === "sourcing" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <MidLevelSourcing />
            </Suspense>
          </p>
        )}
        {activeTab === "leads" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <MidLevelList />
            </Suspense>
          </p>
        )}
        {activeTab === "Screening" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <MidLevelSeniorScreening />
            </Suspense>
          </p>
        )}
        {activeTab === "Shortlist" && (
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <MidLevelSeniorShortlist />
            </Suspense>
          </p>
        )}
      </div>
    </div>
  );
}

export default MidLevelTabsview;
