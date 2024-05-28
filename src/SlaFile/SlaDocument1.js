import React from "react";
import sla1 from "./slaDocument1.module.css";
import companyLogo from "./sla1images/logo-mark@2x.png";
import taizoName from "./sla1images/taizoin.svg";
import maskGroup from "./sla1images/mask-group@2x.png";
import locationpin from "./sla1images/locationpinsvgrepocom-1-1.svg";
import landline from "./sla1images/landline-1.svg";
import emailSvg from "./sla1images/emailsvgrepocom-3-1.svg";
import wwwtaizo from "./sla1images/worldwideweb-2-1.svg";

const SLAPage1 = ({ companyName }) => {
  return (
    <>
      <div className={sla1["SLADOC"]}>
        <div className={sla1["sla-page-1"]}>
          <section className={sla1["root-f-r-a-m-e"]}>
            <header className={sla1["top-level-frame"]}>
              <div className={sla1["logo-frame"]}>
                <div className={sla1["taizo-logomark1"]}>
                  <img
                    className={sla1["logo-mark-icon1"]}
                    alt=""
                    src={companyLogo}
                  />

                  <img
                    className={sla1["taizoin-icon1"]}
                    alt="logo"
                    src={taizoName}
                  />
                </div>
                <div className={sla1["taizo-technologies-private2"]}>
                  Taizo Technologies Private Limited.
                </div>
              </div>
              <div className={sla1["s-l-a-text"]}>
                <div className={sla1["inner-frames"]}></div>
                <div className={sla1["service-frames"]}></div>
              </div>
            </header>
            <div className={sla1["s-l-a-slice"]}>
              <b className={sla1["service-level-agreement"]}>
                Service Level Agreement (SLA) for {companyName}.
              </b>
            </div>
            <div className={sla1["details-f-r-a-m-e"]}>
              <div className={sla1["mask-group-holder"]}>
                <img
                  className={sla1["mask-group-icon1"]}
                  loading="eager"
                  alt=""
                  src={maskGroup}
                />

                <div className={sla1["body-text2"]}>
                  <div className={sla1["scope-and-overview"]}>
                    <div className={sla1["scope-and-overview1"]}>
                      Scope and Overview:
                    </div>
                    <div className={sla1["this-service-level-container"]}>
                      <span>
                        This Service Level Agreement ("SLA") outlines the
                        commitments and services provided by{" "}
                      </span>
                      Taizo.in
                      <span> to </span>
                      <span className={sla1["taizo-testing1"]}>
                        {companyName}
                      </span>
                      <span>
                        {" "}
                        ("Client") for the recruitment of candidates in the
                        manufacturing industry.
                      </span>
                    </div>
                  </div>
                  <div
                    className={sla1["turnaround-time-for-suitable-c"]}
                    style={{ marginBottom: "10px", marginTop: "10px" }}
                  >
                    <div className={sla1["turnaround-time-for"]}>
                      1.Turnaround Time for Suitable Candidates:
                    </div>
                    <div className={sla1["taizoin-commits-to-container"]}>
                      <span>
                        Taizo.in commits to presenting suitable candidates
                        fulfilling{" "}
                      </span>
                      <span className={sla1["taizo-testings"]}>
                        {companyName}'s {"  "}
                      </span>
                      <span>
                        job requirements within 5 days from the date of request
                        submission.
                      </span>
                    </div>
                  </div>
                  <div
                    className={sla1["dedicated-account-management"]}
                    style={{ marginBottom: "10px" }}
                  >
                    <div className={sla1["dedicated-account-management1"]}>
                      2.Dedicated Account Management:
                    </div>
                    <div className={sla1["a-dedicated-account-container"]}>
                      <span>
                        A dedicated Account Manager will ensure seamless
                        coordination and communication between{" "}
                      </span>
                      Taizo.in
                      <span> and </span>
                      <span className={sla1["taizo-testing2"]}>
                        {companyName}
                      </span>
                      <span> throughout the recruitment process. </span>
                    </div>
                  </div>
                  <div
                    className={sla1["tailored-recruitment-services"]}
                    style={{ marginBottom: "10px" }}
                  >
                    <div className={sla1["tailored-recruitment-services1"]}>
                      3.Tailored Recruitment Services:
                    </div>
                    <div className={sla1["a-committed-team-container"]}>
                      <span>
                        A committed team with significant expertise in
                        mechanical and manufacturing will assist in sourcing,
                        screening, and shortlisting candidates specifically
                        tailored to meet{"  "}
                      </span>
                      <span className={sla1["taizo-testings1"]}>
                        {companyName}'s{" "}
                      </span>
                      <span> hiring needs. </span>
                    </div>
                  </div>
                  <div
                    className={sla1["candidate-interview-line-up"]}
                    style={{ marginBottom: "10px" }}
                  >
                    <div className={sla1["candidate-interview-line-up1"]}>
                      4.Candidate Interview Line-Up:
                    </div>
                    <div className={sla1["taizoin-will-arrange-container"]}>
                      <span>
                        Taizo.in will arrange and coordinate interviews for the
                        shortlisted candidates, facilitating the selection
                        process until{"  "}
                      </span>
                      <span className={sla1["taizo-testings2"]}>
                        {companyName}'s{" "}
                      </span>
                      <span> hiring needs are fulfilled. </span>
                    </div>
                  </div>
                  <div
                    className={sla1["postion-clousure"]}
                    style={{ marginBottom: "10px" }}
                  >
                    <div className={sla1["position-closure"]}>
                      5.Position Closure:
                    </div>
                    <div className={sla1["taizoin-will-work"]}>
                      Taizo.in will work diligently to assist{" "}
                      <span className={sla1["taizo-testings2"]}>
                        {companyName}
                      </span>
                      {"   "}
                      in successfully closing the positions, this includes
                      follow-up with candidates, managing offer negotiations,
                      and ensuring a smooth transition to their new roles.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            className={sla1["company-contact-f-r-a-m-e "]}
            style={{ marginTop: "70px" }}
          >
            <div className={sla1["footer-address1"]}>
              <div className={sla1["software-park-text"]}>
                <div className={sla1["software-technology-parks-container1"]}>
                  <p className={sla1["software-technology-parks1"]}>
                    Software Technology Parks of India,
                  </p>
                  <p className={sla1["nd-floor-no51"]}>
                    2nd Floor, No.5, Rajiv Gandhi Salai, Taramani, Chennai - 600
                    113.
                  </p>
                </div>
                <img
                  className={sla1["location-pin-svgrepo-com-1-11"]}
                  loading="eager"
                  alt=""
                  src={locationpin}
                />
              </div>
              <div className={sla1["info-frame"]}>
                <div className={sla1["communication-channels"]}>
                  <img
                    className={sla1["landline-1-icon1"]}
                    loading="eager"
                    alt=""
                    src={landline}
                  />

                  <div className={sla1["s-l-a"]}>+91 44 4813 5483</div>
                </div>
                <div className={sla1["communication-channels1"]}>
                  <img
                    className={sla1["email-svgrepo-com-3-11"]}
                    loading="eager"
                    alt=""
                    src={emailSvg}
                  />

                  <div className={sla1["infotaizoin4"]}>info@taizo.in </div>
                </div>
                <div className={sla1["communication-channels2"]}>
                  <img
                    className={sla1["world-wide-web-2-11"]}
                    loading="eager"
                    alt=""
                    src={wwwtaizo}
                  />

                  <div className={sla1["wwwtaizoin1"]}> www.taizo.in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SLAPage1;
