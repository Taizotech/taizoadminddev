/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";
import styles from "./SuperAdminFunnelPage1.module.css";
import { GetAnalyticsFunnel } from "../../apiServices";
import { useSelector } from "react-redux";
import { dateFormateDD } from "../../utility";

const LeadToRegister = () => {
  const filterDetails = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter
  );
  const filterDetailsstartDate = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.startDate
  );
  const filterDetailsEndDate = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.endDate
  );
  const [leadsData, setLeadsData] = useState({
    totalCandidateLeads: "",
    qualifiedCandidates: "",
    registered: "",
  });
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAnalyticsFunnel(" ", filterDetails);
        const data = response;
        console.log(data, "funneldatalead-register");
        setLeadsData({
          totalCandidateLeads: data.canLeadCount + data.fbMetaLeadCount,
          qualifiedCandidates:
            data.fbMetaLeadQualifiedCount + data.canLeadQualifiedCount,
          registered: data.candidateCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterDetails]);

  return (
    <>
      <div className={styles.superAdminFunnelPage2}>
        <div className={styles.superAdminFunnelDiv}>
          <div className={styles.funnelContent}>
            <div className={styles.funnel}>
              <div className="d-flex mb-2">
                <div className="me-2">
                  <b>{dateFormateDD(filterDetailsstartDate)}</b>
                </div>{" "}
                <b>-</b>{" "}
                <div className="ms-2">
                  <b>{dateFormateDD(filterDetailsEndDate)}</b>
                </div>
              </div>{" "}
              <div
                className={styles.totalCandidateLeads}
                data-animate-on-scroll
              >
                <img
                  className={styles.totalCandidateLeadsFunnelB}
                  alt=""
                  src="/total-candidate-leads-funnel-bar1.svg"
                />
                <div className={styles.totalCandidateLeadsDataTex}>
                  <div className={styles.qualifiedCandidates}>
                    Total Candidate Leads
                  </div>
                  <div className={styles.div}>
                    {leadsData.totalCandidateLeads}
                  </div>
                </div>
              </div>
              <div
                className={styles.qualifiedCandidatesLeads}
                data-animate-on-scroll
              >
                <img
                  className={styles.qualifiedCandidatesLeadsFun}
                  alt=""
                  src="/qualified-candidates-leads-funnel-bar.svg"
                />
                <div className={styles.qualifiedCandidatesLeadsDat}>
                  <div className={styles.qualifiedCandidates}>
                    Qualified Candidates
                  </div>
                  <div className={styles.div}>
                    {leadsData.qualifiedCandidates}
                  </div>
                </div>
              </div>
              <div className={styles.registered} data-animate-on-scroll>
                <img
                  className={styles.registeredBarIcon}
                  alt=""
                  src="/registered-bar.svg"
                />
                <div className={styles.registeredDataText}>
                  <div className={styles.qualifiedCandidates}>Registered</div>
                  <div className={styles.div}>{leadsData.registered}</div>
                </div>
              </div>
            </div>
            <div className={`mt-2 ${styles.dataLabels}`} data-animate-on-scroll>
              <div className={styles.labelsColor}>
                <div className={styles.totalCandidateLeads2} />
                <div className={styles.qualifiedCandidates1} />
                <div className={styles.registered2} />
              </div>
              <div className={styles.labelsNames}>
                <div className={styles.totalCandidateLeads3}>Total Leads</div>
                <div className={styles.qualifiedCandidates2}>Qualified</div>
                <div className={styles.registered3}>Registered</div>
              </div>
              <div className={styles.labelData}>
                <b className={styles.b}>{leadsData.totalCandidateLeads}</b>
                <b className={styles.b1}>{leadsData.qualifiedCandidates}</b>
                <b className={styles.b}>{leadsData.registered}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadToRegister;
