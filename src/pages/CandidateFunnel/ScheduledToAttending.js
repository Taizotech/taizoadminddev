import { useEffect, useState } from "react";
import styles from "./SuperAdminFunnelPage2.module.css";
import { GetAnalyticsFunnel } from "../../apiServices";
import { useSelector } from "react-redux";
import { dateFormateDD } from "../../utility";

const ScheduledToAttending = () => {
  const filterDetails = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter
  );
  const filterDetailsstartDate = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.startDate
  );
  const filterDetailsEndDate = useSelector(
    (state) => state.CandidateFunnelDetails.CandidateFunnelFilter.endDate
  );
  const [scheduledAttending, setScheduledAttending] = useState({
    interviewAttendingCount: "",
    interviewSelectedCount: "",
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
        setScheduledAttending({
          interviewAttendingCount: data.interviewAttendingCount,
          interviewSelectedCount: data.interviewSelectedCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterDetails]);
  return (
    <div className={styles.superAdminFunnelPage3}>
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
            </div>
            <div className={styles.interviewScheduled} data-animate-on-scroll>
              <img
                className={styles.interviewScheduledFunnelBar}
                alt=""
                src="/interview-scheduled-funnel-bar1.svg"
              />
              <div className={styles.interviewScheduledDataText}>
                <div className={styles.interviewScheduled1}>
                  Interview Scheduled
                </div>
                <div className={styles.div}>
                  {scheduledAttending.interviewAttendingCount}
                </div>
              </div>
            </div>
            <div className={styles.interviewAttended} data-animate-on-scroll>
              <img
                className={styles.interviewAttendedBar}
                alt=""
                src="/interview-attended-bar.svg"
              />
              <div className={styles.interviewAttendedDataText}>
                <div className={styles.interviewScheduled1}>
                  Interview Attended
                </div>
                <div className={styles.div}>
                  {scheduledAttending.interviewSelectedCount}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dataLabels} data-animate-on-scroll>
            <div className={styles.labelsColor}>
              <div className={styles.interviewScheduled2} />
              <div className={styles.interviewAttended2} />
            </div>
            <div className={styles.labelsNames}>
              <div className={styles.interviewScheduled3}>
                Interview Scheduled
              </div>
              <div className={styles.interviewAttended3}>
                Interview Attended
              </div>
            </div>
            <div className={styles.labelData}>
              <b className={styles.b}>
                {scheduledAttending.interviewAttendingCount}
              </b>
              <b className={styles.b1}>
                {scheduledAttending.interviewSelectedCount}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledToAttending;
