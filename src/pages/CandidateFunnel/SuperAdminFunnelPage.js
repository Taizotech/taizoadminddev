/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./SuperAdminFunnelPage.module.css";
import { GetAllsdminDetails, GetAnalyticsFunnel } from "../../apiServices";
import "./global.css";
import { useSelector } from "react-redux";

const SuperAdminFunnelPage = () => {
  const filterDetails = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter
  );
 
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
  const [adminList, setAdminList] = useState([]);
  const [adminName, setAdminName] = useState({
    id: "",
    AdminName: "",
  });
  const adminId = localStorage.getItem("adminID");
  const adminDetailsRole = useSelector((state) => state.adminDetails);
  let isSuperAdmin = adminDetailsRole.roleID == 1;

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
  }, [filterDetails]);

  useEffect(() => {}, [filterDetails]);
  useEffect(() => {
    if (isSuperAdmin) {
      GetAnalyticsFunnel(" ", filterDetails).then((data) => {
        setAdminList(data);
        const TotalLeadCount = data.map((item) => item.totalLeads);
        let totalleadSum = TotalLeadCount.reduce((acc, el) => acc + el, 0);
        const qualifiedCount = data.map((item) => item.totalQualifiedLeads);
        let qualifiedCountSum = qualifiedCount.reduce((acc, el) => acc + el, 0);
        const CanRegister = data.map((item) => item.canRegistration);
        let CanRegisterSum = CanRegister.reduce((acc, el) => acc + el, 0);
        const ScheduledCount = data.map((item) => item.interviewScheduled);
        let ScheduledSum = ScheduledCount.reduce((acc, el) => acc + el, 0);
        const AttendedCount = data.map((item) => item.interviewAttended);
        let AttendedCountSum = AttendedCount.reduce((acc, el) => acc + el, 0);
        const Selected = data.map((item) => item.companySelected);
        let SelectedSum = Selected.reduce((acc, el) => acc + el, 0);
        const Rejected = data.map((item) => item.offerAccepted);
        let RejectedSum = Rejected.reduce((acc, el) => acc + el, 0);
        const Joined = data.map((item) => item.joined);
        let JoinedSum = Joined.reduce((acc, el) => acc + el, 0);

        setDataCountShow((prev) => ({
          ...prev,
          totalLead: totalleadSum,
          RegisterCount: CanRegisterSum,
          Qualified: qualifiedCountSum,
          Scheduled: ScheduledSum,
          Attending: AttendedCountSum,
          Selected: SelectedSum,
          OfferAccepted: RejectedSum,
          Joined: JoinedSum,
        }));

        // Call the function to generate the funnel chart
      });
      return;
    }

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
  }, [isSuperAdmin, filterDetails]);

  useEffect(() => {
    if (adminId != 1) {
      GetAnalyticsFunnel(adminId, filterDetails).then((data) => {
        setAdminList(data, "setadmin");
        console.log("----------------data-------------------", data);
        // Process the data if needed
      });
    }
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
  }, [adminId, filterDetails]);

  // const [showFunnel, setShowFunnel] = useState({ show: false, data: {} });
  // function ShowFunnel(data) {
  //   setShowFunnel((prev) => ({ ...prev, show: true, data: data }));
  // }
  // function CloseFunnel(data) {
  //   setShowFunnel((prev) => ({ ...prev, show: false, data: data }));
  // }

  return (
    <>
      <div>
        <div className={styles.superAdminFunnelPage}>
          <div className={styles.superAdminFunnelDiv}>
            {/* {/ <b className={styles.superAdminFunnel}>Super Admin Funnel</b> /} */}
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
                    <div className={styles.div}>{dataCountshow.totalLead}</div>
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
                    <div className={styles.div}>{dataCountshow.Qualified}</div>
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
                    <div className={styles.div}>{dataCountshow.Scheduled}</div>
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
                    <div className={styles.div}>{dataCountshow.Attending}</div>
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
                    <div className={styles.div}>{dataCountshow.Selected}</div>
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
                      {dataCountshow.OfferAccepted}
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
                    <div className={styles.div}>{dataCountshow.Joined}</div>
                  </div>
                </div>
              </div>
              <div className={styles.dataLabels} data-animate-on-scroll>
                <div className={styles.labelsColor}>
                  <div className={styles.totalCandidateLeads2} />
                  <div className={styles.qualifiedCandidates1} />
                  <div className={styles.registered2} />
                  <div className={styles.interviewScheduled2} />
                  <div className={styles.interviewAttended2} />
                  <div className={styles.companySelected2} />
                  <div className={styles.offerAccepted2} />
                  <div className={styles.joined2} />
                </div>
                <div className={styles.labelsNames}>
                  <div className={styles.totalCandidateLeads3}>
                    Total&nbsp;Leads
                  </div>
                  <div className={styles.qualifiedCandidates2}>Qualified</div>
                  <div className={styles.registered3}>Registered</div>
                  <div className={styles.registered3}>
                    Interview&nbsp;Scheduled
                  </div>
                  <div className={styles.registered3}>
                    Interview&nbsp;Attended
                  </div>
                  <div className={styles.registered3}>
                    Company&nbsp;Selected
                  </div>
                  <div className={styles.offerAccepted3}>
                    Offer&nbsp;Accepted
                  </div>
                  <div className={styles.registered3}>Joined</div>
                </div>
                <div className={styles.labelData}>
                  <b className={styles.b}>{dataCountshow.totalLead}</b>
                  <b className={styles.b1}>{dataCountshow.Qualified}</b>
                  <b className={styles.b}>{dataCountshow.RegisterCount}</b>
                  <b className={styles.b}>{dataCountshow.Scheduled}</b>
                  <b className={styles.b}>{dataCountshow.Attending}</b>
                  <b className={styles.b}>{dataCountshow.Selected}</b>
                  <b className={styles.b1}>{dataCountshow.OfferAccepted}</b>
                  <b className={styles.b}>{dataCountshow.Joined}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {/* {adminId != 1 && (
          <div>
            <SuperAdminFunnelPage1 data={adminList} />
          </div>
        )} */}
      </div>

      {/* {showFunnel.show && (
        <>
          <MyModal>
            <ModalContainer
              childComponent={
                <>
                  <div className="d-flex justify-content-end">
                    <div
                      className="btn btn-danger "
                      onClick={() => CloseFunnel()}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                  <SuperAdminFunnelPage1 data={showFunnel.data} />
                </>
              }
            />
          </MyModal>
        </>
      )} */}
    </>
  );
};

export default SuperAdminFunnelPage;
