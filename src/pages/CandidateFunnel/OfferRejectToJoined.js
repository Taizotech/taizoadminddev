import { useEffect, useState } from "react";
import styles from "./SuperAdminFunnelPage3.module.css";
import { GetAnalyticsFunnel } from "../../apiServices";
import { useSelector } from "react-redux";
import { dateFormateDD } from "../../utility";

const OfferRejectToJoined = () => {
  const filterDetails = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter
  );
  const filterDetailsstartDate = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.startDate
  );
  const filterDetailsEndDate = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.endDate
  );
  const [offerJoined, setOfferJoined] = useState({
    candidateOfferRejectedCount: "",
    candidateJoinedCount: "",
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
        setOfferJoined({
          candidateOfferRejectedCount: data.candidateOfferRejectedCount,
          candidateJoinedCount: data.candidateJoinedCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterDetails]);
  return (
    <div className={styles.superAdminFunnelPage4}>
      <div className={styles.superAdminFunnelDiv}>
        {/* <b className={styles.superAdminFunnel}>Super Admin Funnel</b> */}
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
            </div>
            <div className={styles.offerAccepted} data-animate-on-scroll>
              <img
                className={styles.offerAcceptedFunnelBar}
                alt=""
                src="/offer-accepted-funnel-bar1.svg"
              />
              <div className={styles.offerAcceptedDataText}>
                <div className={styles.joined}>Offer Accepted</div>
                <div className={styles.div}>
                  {offerJoined.candidateOfferRejectedCount}
                </div>
              </div>
            </div>
            <div className={styles.interviewAttended} data-animate-on-scroll>
              <img
                className={styles.joinedBarIcon}
                alt=""
                src="/joined-funnel-bar.svg"
              />
              <div className={styles.joinedDataText}>
                <div className={styles.joined}>Joined</div>
                <div className={styles.div}>
                  {offerJoined.candidateJoinedCount}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dataLabels} data-animate-on-scroll>
            <div className={styles.labelsColor}>
              <div className={styles.offerAccepted2} />
              <div className={styles.joined1} />
            </div>
            <div className={styles.labelsNames}>
              <div className={styles.offerAccepted3}>Offer Accepted</div>
              <div className={styles.joined2}>Joined</div>
            </div>
            <div className={styles.labelData}>
              <b className={styles.b}>
                {offerJoined.candidateOfferRejectedCount}
              </b>
              <b className={styles.b1}>{offerJoined.candidateJoinedCount}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferRejectToJoined;
