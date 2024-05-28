/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminDetailsActions, notiDetailsActions } from "./redux-store/store";
import { GetAdminDetailsByID, SetNotiReadStatus } from "./apiServices";

// -------------------------pages imports --------------------------------

import SideNavbar from "./components/Navbar/component/sideNavbar";
import EmployerLead from "./pages/Employer/employerLead/EmployerLeadPost";
import EmployerLeadUpdate from "./pages/Employer/employerLead/EmployerLeadUpdate";
import AddNewUser from "./pages/AdminDetails/AddNewUser/addNewUser";
import ProfilePage from "./pages/ProfileDetails/profilePage";

import ProfileDashboard from "./pages/ProfileDashboard/ProfileDashboard";
import ProfileForm from "./pages/AdminDetails/ProfileForm/ProfileForm";
import CandidateLead from "./pages/Candidate/CandidateLeadTable/CandidateLeadPostForm";
import JobRolesTable from "./pages/AdminDetails/ConfigarationTablesCrud/JobRoleDetails/jobRolesTable";

import AccountDeactivationMessage from "./pages/NotFound/accountDeactivate";
import CandidateLeadTable from "./pages/Candidate/CandidateLeadTable/CandidateLeadTable";

import MidLevelList from "./pages/Candidate/MidLevelCandidate/MidLevelList";
import Jobs from "./pages/Tabsview/Jobs/Jobs";
import Midelevelseniorpostform from "./pages/Candidate/MidLevelCandidate/Midelevelseniorpostform";
import MidLevelTabsview from "./pages/Tabsview/MidLevel/MidLevelSenior";
import CandidateEvaluationSummaryF from "./components/mid-senior-report-genration-form/CandidateEvaluationSummaryF";
import CandidateFunnel from "./pages/CandidateFunnel/CandidateFunnel";
// import TasksDaily from "./pages/Candidate/DailyTasks/TasksDaily";
import JobLeadTable from "./pages/Jobs/JobLead/JobLeadTable";
import SkillAddTable from "./pages/AdminDetails/ConfigarationTablesCrud/KeySkillsDetails/SkillDetailsTable";
import SuperAdminTableView from "./pages/Tabsview/SuperAdminTabView/SuperAdminTableView";
import AnalyticsAdmin from "./pages/Tabsview/SuperAdminAnalytics/AnalyticsAdmin";
import FresherForm from "./pages/Candidate/CandidateQualifyForm/FresherForm";
import OnclickButton from "./pages/Candidate/CandidateQualifyForm/OnclickButton";
import EducationSpecializationForm from "./pages/Candidate/CandidateQualifyForm/Example";
import BugFixerpost from "./pages/AdminBugFixer/BugFixerpost";
import BugFixerput from "./pages/AdminBugFixer/BugFixerput";
import BugFixerTable from "./pages/AdminBugFixer/BugFixerTable";
import AdminBugFixerTab from "./pages/Tabsview/AdminBugNewFeature/AdminBugFixerTab";
import SLAPage1 from "./SlaFile/SlaDocument1";
import SLAPage2 from "./SlaFile/SlaDocument2";
import SLADocument from "./SlaFile/SLADocument";
import AdminTemplatePost from "./pages/AdminTemplatePage/AdminTemplatePost";
import FollowUp1Pipeline from "./pages/pipelines/InterviewFollowUp1Pipeline/pipeline";
import FollowUp2Pipeline from "./pages/pipelines/InterviewFollowUp2Pipeline/pipeline";
import InterviewAttendingPipeline from "./pages/pipelines/InterviewAttendingPipeline/Pipeline";
import InterviewStatusPipeline from "./pages/pipelines/interviewStatusPipeline/pipeline";
import CandidatePipelineTab from "./pages/Tabsview/PiplineTabView/CandidatePipeline/CandidatePipline";
import JoiningFollowUp1Pipeline from "./pages/pipelines/joiningFollowUp1Pipeline/pipeline";
import JoiningFollowUp2Pipeline from "./pages/pipelines/joiningFollowUp2Pipeline/pipeline";
import JoiningDayPipeline from "./pages/pipelines/joiningDayPipeline/pipeline";
// import MyDatePicker from "./pages/Datepicker";
// import TasksDaily from "./pages/Candidate/DailyTasks/TasksDaily";

// ------------------------- End ofpages imports --------------------------------

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const EmployerTabs = lazy(() =>
  import("./pages/Tabsview/EmployerTabsView/EmployerTabs")
);
const EmployerLeadTable = lazy(() =>
  import("./pages/Employer/employerLead/EmployerLeadTable")
);

const CandidatePipeline = lazy(() =>
  import("./pages/pipelines/candidatePipeline/pipeline")
);

const LogIn = lazy(() => import("./pages/LoginPage/login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const PaymentContainer = lazy(() => import("./pages/Payment/paymentContainer"));

// const CandidateInterviewCard = lazy(() =>
//   import("../src/pages/Candidate/interviewCard/interviewCard")
// );

const CandidateTabsview = lazy(() =>
  import("./pages/Tabsview/Candidate/CandidateTabsview")
);

export function user_details() {
  let user_obj = { isLoggedIn: false };
  return user_obj;
}

export const PageStatus = createContext();

const RoutesWrp = () => {
  const history = useLocation();
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const adminDetails = useSelector((state) => state.adminDetails);
  // console.log(adminDetails);

  let isSuperAdmin = adminDetails.roleID === 1;

  const pathname = history.pathname;
  const queryParams = new URLSearchParams(history.search);

  // Get the value of the "param" query parameter
  const paramValue = queryParams.get("notificationID");
  useEffect(() => {
    if (paramValue) {
      // alert("hii");
      // console.log(paramValue);
      SetNotiReadStatus(paramValue);
      Dispatch(notiDetailsActions.setNotiDetail(paramValue));
      Dispatch(notiDetailsActions.showDetails(paramValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [activeTab, setActiveTab] = useState({
    isKyc: true,
    isDashbord: false,
  });

  useEffect(() => {
    let isDashbord = history.pathname.indexOf("/dashboard") !== -1;
    let isCandiFilter = history.pathname.indexOf("/candidate_Job") !== -1;
    let isKyc = history.pathname.indexOf("/CandidateTabsview") !== -1;
    let isEmployers = history.pathname.indexOf("/Employer_filter") !== -1;
    let isEmployerDraft = history.pathname.indexOf("/Employer_draft") !== -1;
    let isEmployerPayment =
      history.pathname.indexOf("/Employer_Payment") !== -1;
    let isCandidate = history.pathname.indexOf("/isCandidate") !== -1;
    let isCandidateLead = history.pathname.indexOf("/Can_Lead") !== -1;
    let isAlert = history.pathname.indexOf("/isAlert") !== -1;
    let isCandidateUpdate = history.pathname.indexOf("/isAlert") !== -1;
    let isPayment = history.pathname.indexOf("/payment") !== -1;
    let isRatingemp = history.pathname.indexOf("/Employer_rating") !== -1;
    let isJobLink = history.pathname.indexOf("/job_link") !== -1;
    let iscaninterviews = history.pathname.indexOf("/can_interview") !== -1;

    setActiveTab((val) => ({
      ...val,
      isKyc: isKyc,
      isEmployers: isEmployers,
      isEmployerPayment: isEmployerPayment,
      isEmployerDraft: isEmployerDraft,
      isRatingemp: isRatingemp,
      isDashbord: isDashbord,
      isCandiFilter: isCandiFilter,
      isCandidate: isCandidate,
      isCandidateLead: isCandidateLead,
      isAlert: isAlert,
      isCandidateUpdate: isCandidateUpdate,
      isPayment: isPayment,
      isJobLink: isJobLink,
      iscaninterviews: iscaninterviews,
    }));
  }, [history]);
  useEffect(() => {
    const adminID = localStorage.getItem("adminID");
    if (localStorage.getItem("adminID") != null) {
      Dispatch(
        adminDetailsActions.setAdminLoginDetails({
          adminID: adminID,
        })
      );
      GetAdminDetailsByID(adminID).then((data) => {
        if (data.admin.is_deactivate) {
          navigate("/AccountDeactivated");
        }
      });
      let isLogin = history.pathname.indexOf("/login") !== -1;
      isLogin && navigate("/CandidateTabsview");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageStatus.Provider value={{ activeTab, setActiveTab }}>
        {adminDetails.adminID !== "" && adminDetails.adminID != null && (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <SideNavbar>
                <Routes>
                  <Route index element={<CandidateTabsview />}></Route>
                  <Route
                    path="/Can_Lead"
                    element={<CandidateLeadTable />}
                  ></Route>
                  <Route
                    path="/Employer_lead"
                    element={<EmployerLead />}
                  ></Route>
                  <Route
                    path="/Employer_update"
                    element={<EmployerLeadUpdate />}
                  ></Route>
                  <Route path="" element={<Dashboard />}></Route>
                  <Route path="/payment" element={<PaymentContainer />}></Route>
                  <Route path="/Dashboard" element={<Dashboard />}></Route>
                  {isSuperAdmin && (
                    <Route path="/add_user" element={<AddNewUser />}></Route>
                  )}
                  <Route
                    path="/profile_Dashboard"
                    element={<ProfileDashboard />}
                  ></Route>
                  <Route path="*" element={<NotFound />}></Route>
                  <Route path="/" element={<LogIn />}></Route>
                  <Route
                    path="/midlevel_candidate_leads"
                    element={<MidLevelList />}
                  ></Route>
                  <Route
                    path="/candidateevaluationsummary"
                    element={<CandidateEvaluationSummaryF />}
                  ></Route>
                  <Route
                    path="/Midelevelseniorpostform"
                    element={<Midelevelseniorpostform />}
                  ></Route>
                  <Route
                    path="/superAdminAnalytics"
                    element={<AnalyticsAdmin />}
                  ></Route>
                  <Route
                    path="/AdminAnalytics"
                    element={<CandidateFunnel />}
                  ></Route>
                  <Route
                    path="/Bug/NewFeature"
                    element={<AdminBugFixerTab />}
                  ></Route>
                  <Route
                    path="/workingbugfixerput"
                    element={<BugFixerput />}
                  ></Route>
                  <Route path="/working" element={<SLADocument />}></Route>
                  <Route
                    path="/workingskill"
                    element={<SkillAddTable />}
                  ></Route>
                  <Route
                    path="/superAdminTab"
                    element={<SuperAdminTableView />}
                  ></Route>
                  <Route
                    path="/CandidateTabsview"
                    element={<CandidateTabsview />}
                  ></Route>{" "}
                  <Route
                    path="/EmployerTabsview"
                    element={<EmployerTabs />}
                  ></Route>
                  <Route
                    path="/MidLevelSenior"
                    element={<MidLevelTabsview />}
                  ></Route>
                  <Route path="/JobsTabsview" element={<Jobs />}></Route>
                  <Route path="/jobRoles" element={<JobRolesTable />}></Route>
                  <Route
                    path="/employer_leads"
                    element={<EmployerLeadTable />}
                  ></Route>{" "}
                  <Route
                    path="/candidate_lead"
                    element={<CandidateLead />}
                  ></Route>{" "}
                  <Route path="/profile_page" element={<ProfilePage />}></Route>
                  <Route
                    path="/daily-analytics"
                    element={<ProfileForm />}
                  ></Route>
                  <Route path="/login" element={<LogIn />}></Route>
                  <Route
                    path="/AccountDeactivated"
                    element={<AccountDeactivationMessage />}
                  ></Route>
                  <Route
                    path="/Interview_FollowUp1_Pipeline"
                    element={<FollowUp1Pipeline />}
                  ></Route>
                  <Route
                    path="/Interview_FollowUp2_Pipeline"
                    element={<FollowUp2Pipeline />}
                  ></Route>
                  <Route
                    path="/CandidatePipeline"
                    element={<CandidatePipeline />}
                  ></Route>
                  <Route
                    path="/CandidatePipelineTab"
                    element={<CandidatePipelineTab />}
                  ></Route>
                  <Route
                    path="/AttendingLead"
                    element={<InterviewAttendingPipeline />}
                  ></Route>
                  <Route
                    path="/interviewStatus"
                    element={<InterviewStatusPipeline />}
                  ></Route>
                  <Route
                    path="/joiningFollowUp1"
                    element={<JoiningFollowUp1Pipeline />}
                  ></Route>
                  <Route
                    path="/joiningFollowUp2"
                    element={<JoiningFollowUp2Pipeline />}
                  ></Route>
                  <Route
                    path="/joiningDay"
                    element={<JoiningDayPipeline />}
                  ></Route>
                </Routes>
              </SideNavbar>
            </Suspense>
          </>
        )}

        {!adminDetails.adminID && (
          <>
            <Routes>
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/" element={<LogIn />}></Route>
              <Route path="/login" element={<LogIn />}></Route>
            </Routes>
          </>
        )}
      </PageStatus.Provider>
    </>
  );
};

export default RoutesWrp;
