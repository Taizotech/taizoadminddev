/* eslint-disable react/jsx-pascal-case */
import styles from "./interviewCard.module.scss";
import passBackgroundCard from "../../../assets/images/pass-background-with-card-1@2x.png";
import avatarProfilePic from "../../../assets/images/avatar-profile-picture.svg";
import taizoinLogoWatermarkIcon from "../../../assets/images/taizoin-logo-watermark.svg";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { GetInterviewDetails } from "../../../apiServices";
import { DMMMYYYY_formate } from "../../../utility";

const CandidateInterviewCard = ({ interviewId }) => {
  const elementRef = useRef(null);
  const [interviewDetails, setInterviewDetails] = useState({});

  useEffect(() => {
    GetInterviewDetails(interviewId).then((res) => {
      setInterviewDetails({
        candidateName: res.candidate.firstName,
        companyName: res.job.companyName,
        position: res.job.jobCategory,
        contactPersonName: res.job.contactPersonName,
        interviewScheduledDt: res.interview.interviewScheduledDt,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captureImage = async () => {
    try {
      const canvas = await html2canvas(elementRef.current, {
        // Optional options (check library documentation)
        backgroundColor: "transparent",
      });

      // Convert canvas to image data
      const imageData = canvas.toDataURL("image/png");

      // Create a link and trigger a download
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `${interviewDetails.candidateName}_InterviewCard.png`;
      link.click();

      // Optionally, you can close the new window after a certain period
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };
  return (
    <div
      className={`${styles.taizoinCandidateInterviewC} ${styles.fontPoppins} `}
    >
      <div ref={elementRef} className={styles.taizoinInterviewCardpassB}>
        <img
          className={styles.passBackgroundWithCard1}
          alt=""
          src={passBackgroundCard}
        />
        <div className={styles.nterviewCardpass}>
          <div className={styles.cardDetailsDiv}>
            <div className={styles.cardDetails}>
              <h1 className={styles.interviewCard}>INTERVIEW CARD</h1>
              <img
                className={styles.avatarProfilePictureIcon}
                loading="eager"
                alt=""
                src={avatarProfilePic}
              />
              <img
                className={styles.taizoinLogoWatermarkIcon}
                alt=""
                src={taizoinLogoWatermarkIcon}
              />
              <div className={styles.cardDetailWrp}>
                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    Full name{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    : {interviewDetails.candidateName}{" "}
                  </div>
                </div>
                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    Company Name{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    : {interviewDetails.companyName}{" "}
                  </div>
                </div>
                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    Position{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    : {interviewDetails.position}{" "}
                  </div>
                </div>
                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    To Meet{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    : {interviewDetails.contactPersonName}{" "}
                  </div>
                </div>
                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    Reason{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    : Interview{" "}
                  </div>
                </div>
                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    Date{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    :{" "}
                    <DMMMYYYY_formate
                      dateValue={interviewDetails.interviewScheduledDt}
                    />{" "}
                  </div>
                </div>

                <div className="row ps-3">
                  <div className={`${styles.fontPoppins} col-5 ps-4`}>
                    Time{" "}
                  </div>
                  <div className={`${styles.fontPoppins} col-7`}>
                    : 9:00 AM{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.note}>
              <div className={`${styles.note1} ${styles.fontPoppins}`}>
                Note:
              </div>
              <div
                className={`${styles.thisDigitalInterview} ${styles.fontPoppins}`}
              >
                This digital interview card is only for interview purpose and
                valid only one day from the date of interview.
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={captureImage} className={styles.sendWhatsappButton}>
        <div className={styles.sendWhatsapp}>Download Card</div>
      </button>
    </div>
  );
};

export default CandidateInterviewCard;
