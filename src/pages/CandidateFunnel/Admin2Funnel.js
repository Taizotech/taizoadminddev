import { useEffect, useState } from "react";
import styles from "./SuperAdminFunnelPage.module.css";
import styles1 from "./SuperAdminFunnelPage1.module.css";
import styles2 from "./SuperAdminFunnelPage2.module.css";
import styles3 from "./SuperAdminFunnelPage3.module.css";
import { GetAllsdminDetails } from "../../apiServices";
import "./global.css";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
const SuperAdminFunnelPage1 = (data) => {
  // const Dispath = useDispatch("");
  const [scheduledAttending, setScheduledAttending] = useState({
    interviewAttendingCount: "",
    interviewSelectedCount: "",
  });
  const [offerJoined, setOfferJoined] = useState({
    candidateOfferRejectedCount: "",
    candidateJoinedCount: "",
  });
  const StageFunnel = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.stage
  );
  const adminIDOpen = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.adminName
  );
  // const onlyAdmin = localStorage.getItem("adminID");
  console.log(adminIDOpen, "jchdjkkkk");
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  // const adminIDOpen = localStorage.getItem("adminID");
  const [dataCountshow, setDataCountShow] = useState({
    totalLead: "",
    Qualified: "",
    RegisterCount: "",
    Scheduled: "",
    Attending: "",
    Selected: "",
    OfferAccepted: "",
    Joined: "",
  });
  const [leadsData, setLeadsData] = useState({
    totalCandidateLeads: "",
    qualifiedCandidates: "",
    registered: "",
  });
  const [adminName, setAdminName] = useState({
    id: "",
    AdminName: "",
  });

  useEffect(() => {
    GetAllsdminDetails().then((data) => {
      console.log(data, "All admin details");
      const adminNames = data.map((item) => item.userName);
      const adminIds = data.map((item) => item.id);
      setAdminName((prev) => ({
        ...prev,
        id: adminIds,
        AdminName: adminNames,
      }));
      // setAdminId(adminIds);
    });
    setDataCountShow((prev) => ({
      ...prev,
      // totalLead: data.totalLeads,
      totalLead: data.data.totalLeads,
      RegisterCount: data.data.canRegistration,
      Qualified: data.data.totalQualifiedLeads,
      Scheduled: data.data.interviewScheduled,
      Attending: data.data.interviewAttended,
      Selected: data.data.companySelected,
      OfferAccepted: data.data.offerAccepted,
      Joined: data.data.joined,
    }));
    setLeadsData({
      totalCandidateLeads: data.data.canLeadCount + data.data.fbMetaLeadCount,
      qualifiedCandidates:
        data.data.fbMetaLeadQualifiedCount + data.data.canLeadQualifiedCount,
      registered: data.data.candidateCount,
    });
    setScheduledAttending({
      interviewAttendingCount: data.data.interviewAttendingCount,
      interviewSelectedCount: data.data.interviewSelectedCount,
    });
    setOfferJoined({
      candidateOfferRejectedCount: data.data.candidateOfferRejectedCount,
      candidateJoinedCount: data.data.candidateJoinedCount,
    });
  }, [data]);
  console.log("totalLead :", data.qualifiedFbMetaLeads);
  return (
    <div className={styles.AdminFunnelPage1}>
      <div className={styles.superAdminFunnelDiv}>
        {/* {onlyAdmin === 1 ? (
         
        ) : (
          ""
        )} */}
        <b className={styles.superAdminFunnel}>
          {adminName.AdminName[adminName.id.indexOf(data.data.adminId)]}
        </b>
        {StageFunnel === 0 && (
          <>
            <div className={styles.funnelContent}>
              <div className={styles.funnel}>
                <div
                  className={styles.totalCandidateLeads}
                  data-animate-on-scroll
                >
                  <img
                    className={styles.totalCandidateLeadsFunnelB}
                    alt=""
                    src="/total-candidate-leads-funnel-bar.svg"
                  />
                  <div className={styles.totalCandidateLeadsDataTex}>
                    <div className={styles.qualifiedCandidates}>
                      Total Candidate Leads
                    </div>
                    <div className={styles.div}>
                      {dataCountshow.totalLead != null
                        ? dataCountshow.totalLead
                        : "00"}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.qualifiedCandidatesLeads}
                  data-animate-on-scroll
                >
                  <img
                    className={styles.qualifiedCandidatesLeadFunn}
                    alt=""
                    src="/qualified-candidates-lead-funnel-bar.svg"
                  />
                  <div className={styles.qualifiedCandidateLeadsData}>
                    <div className={styles.qualifiedCandidates}>
                      Qualified Candidates
                    </div>
                    <div className={styles.div}>
                      {dataCountshow.Qualified != null
                        ? dataCountshow.Qualified
                        : "00"}
                    </div>
                  </div>
                </div>
                <div className={styles.registered} data-animate-on-scroll>
                  <img
                    className={styles.registeredFunnelBar}
                    alt=""
                    src="/registered-funnel-bar.svg"
                  />
                  <div className={styles.registeredDataText}>
                    <div className={styles.qualifiedCandidates}>Registered</div>
                    <div className={styles.div}>
                      {dataCountshow.RegisterCount != null
                        ? dataCountshow.RegisterCount
                        : "00"}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.interviewScheduled}
                  data-animate-on-scroll
                >
                  <img
                    className={styles.interviewScheduledFunnelBar}
                    alt=""
                    src="/interview-scheduled-funnel-bar.svg"
                  />
                  <div className={styles.interviewScheduledData}>
                    <div className={styles.qualifiedCandidates}>
                      Interview Scheduled
                    </div>
                    <div className={styles.div}>
                      {dataCountshow.Scheduled != null
                        ? dataCountshow.Scheduled
                        : "00"}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.interviewAttended}
                  data-animate-on-scroll
                >
                  <img
                    className={styles.interviewAttendedFunnelBar}
                    alt=""
                    src="/interview-attended-funnel-bar.svg"
                  />
                  <div className={styles.interviewAttendedDataText}>
                    <div className={styles.qualifiedCandidates}>
                      Interview Attended
                    </div>
                    <div className={styles.div}>
                      {dataCountshow.Attending != null
                        ? dataCountshow.Attending
                        : "00"}
                    </div>
                  </div>
                </div>
                <div className={styles.companySelected} data-animate-on-scroll>
                  <img
                    className={styles.companySelectedFunnelBar}
                    alt=""
                    src="/company-selected-funnel-bar.svg"
                  />
                  <div className={styles.companySelectedDataText}>
                    <div className={styles.qualifiedCandidates}>
                      Company Selected
                    </div>
                    <div className={styles.div}>
                      {dataCountshow.Scheduled != null
                        ? dataCountshow.Scheduled
                        : "00"}
                    </div>
                  </div>
                </div>
                <div className={styles.offerAccepted} data-animate-on-scroll>
                  <img
                    className={styles.offerAcceptedFunnelBar}
                    alt=""
                    src="/offer-accepted-funnel-bar.svg"
                  />
                  <div className={styles.offerAcceptedDataText}>
                    <div className={styles.qualifiedCandidates}>
                      Offer Accepted
                    </div>
                    <div className={styles.div}>
                      {dataCountshow.OfferAccepted != null
                        ? dataCountshow.OfferAccepted
                        : "00"}
                    </div>
                  </div>
                </div>
                <div className={styles.joined} data-animate-on-scroll>
                  <img
                    className={styles.offerAcceptedFunnelBar}
                    alt=""
                    src="/joined-funnel-bar.svg"
                  />
                  <div className={styles.offerAcceptedDataText}>
                    <div className={styles.qualifiedCandidates}>Joined</div>
                    <div className={styles.div}>
                      {dataCountshow.Joined != null
                        ? dataCountshow.Joined
                        : "00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {StageFunnel === 1 && (
          <>
            <b className={styles.superAdminFunnel}>{adminIDOpen}</b>
            <div className={styles1.funnelContent}>
              <div className={styles1.funnel}>
                <div
                  className={styles1.totalCandidateLeads}
                  data-animate-on-scroll
                >
                  <img
                    className={styles1.totalCandidateLeadsFunnelB}
                    alt=""
                    src="/total-candidate-leads-funnel-bar1.svg"
                  />
                  <div className={styles1.totalCandidateLeadsDataTex}>
                    <div className={styles1.qualifiedCandidates}>
                      Total Candidate Leads
                    </div>
                    <div className={styles1.div}>
                      {leadsData.totalCandidateLeads}
                    </div>
                  </div>
                </div>
                <div
                  className={styles1.qualifiedCandidatesLeads}
                  data-animate-on-scroll
                >
                  <img
                    className={styles1.qualifiedCandidatesLeadsFun}
                    alt=""
                    src="/qualified-candidates-leads-funnel-bar.svg"
                  />
                  <div className={styles1.qualifiedCandidatesLeadsDat}>
                    <div className={styles1.qualifiedCandidates}>
                      Qualified Candidates
                    </div>
                    <div className={styles1.div}>
                      {leadsData.qualifiedCandidates}
                    </div>
                  </div>
                </div>
                <div className={styles1.registered} data-animate-on-scroll>
                  <img
                    className={styles1.registeredBarIcon}
                    alt=""
                    src="/registered-bar.svg"
                  />
                  <div className={styles1.registeredDataText}>
                    <div className={styles1.qualifiedCandidates}>
                      Registered
                    </div>
                    <div className={styles1.div}>{leadsData.registered}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {StageFunnel === 2 && (
          <>
            {" "}
            <b className={styles.superAdminFunnel}>{adminIDOpen}</b>
            <div className={styles2.funnelContent}>
              <div className={styles2.funnel}>
                <div
                  className={styles2.interviewScheduled}
                  data-animate-on-scroll
                >
                  <img
                    className={styles2.interviewScheduledFunnelBar}
                    alt=""
                    src="/interview-scheduled-funnel-bar1.svg"
                  />
                  <div className={styles2.interviewScheduledDataText}>
                    <div className={styles2.interviewScheduled1}>
                      Interview Scheduled
                    </div>
                    <div className={styles2.div}>
                      {scheduledAttending.interviewAttendingCount}
                    </div>
                  </div>
                </div>
                <div
                  className={styles2.interviewAttended}
                  data-animate-on-scroll
                >
                  <img
                    className={styles2.interviewAttendedBar}
                    alt=""
                    src="/interview-attended-bar.svg"
                  />
                  <div className={styles2.interviewAttendedDataText}>
                    <div className={styles2.interviewScheduled1}>
                      Interview Attended
                    </div>
                    <div className={styles2.div}>
                      {scheduledAttending.interviewSelectedCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {StageFunnel === 3 && (
          <>
            {" "}
            <b className={styles.superAdminFunnel}>{adminIDOpen}</b>
            <div className={styles3.funnelContent}>
              <div className={styles3.funnel}>
                <div className={styles3.offerAccepted} data-animate-on-scroll>
                  <img
                    className={styles3.offerAcceptedFunnelBar}
                    alt=""
                    src="/offer-accepted-funnel-bar1.svg"
                  />
                  <div className={styles3.offerAcceptedDataText}>
                    <div className={styles3.joined}>Offer Accepted</div>
                    <div className={styles3.div}>
                      {offerJoined.candidateOfferRejectedCount}
                    </div>
                  </div>
                </div>
                <div
                  className={styles3.interviewAttended}
                  data-animate-on-scroll
                >
                  <img
                    className={styles3.joinedBarIcon}
                    alt=""
                    src="/joined-funnel-bar.svg"
                  />
                  <div className={styles3.joinedDataText}>
                    <div className={styles3.joined}>Joined</div>
                    <div className={styles3.div}>
                      {offerJoined.candidateJoinedCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuperAdminFunnelPage1;
