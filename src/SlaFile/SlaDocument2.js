import React from "react";
import sla2 from "./slaDocument2.module.css";
import companyLogo from "./sla1images/logo-mark@2x.png";
import taizoName from "./sla1images/taizoin.svg";
import sealSignature from "./sla1images/seal--signature-f-1@2x.png";
import locationpin from "./sla1images/locationpinsvgrepocom-1-1.svg";
import landline from "./sla1images/landline-1.svg";
import emailSvg from "./sla1images/emailsvgrepocom-3-1.svg";
import wwwtaizo from "./sla1images/worldwideweb-2-1.svg";
import maskGroup from "./sla1images/mask-group@2x.png";

const SLAPage2 = ({
  recruitmentFeePercentage,
  paymentType,
  paymentDueDays,
  companyName,
  replacementmonth,
  paymentTerms,
  date,
}) => {
  return (
    <div className={sla2["SLADOC"]}>
      <div className={sla2["sla-page-2"]}>
        <section className={sla2["s-l-a-page"]}>
          <header className={sla2["container-frame"]}>
            <div className={sla2["taizo-logomark"]}>
              <div className={sla2["text-vector"]}>
                <img
                  className={sla2["logo-mark-icon"]}
                  loading="eager"
                  alt=""
                  src={companyLogo}
                />
                <img
                  className={sla2["taizoin-icon"]}
                  loading="eager"
                  alt=""
                  src={taizoName}
                />
              </div>
              <div className={sla2["taizo-technologies-private"]}>
                Taizo Technologies Private Limited.
              </div>
            </div>
            <div className={sla2["recruitment-info-frame"]}>
              <div className={sla2["top-blackline"]}></div>
              <div className={sla2["top-right-green-line"]}></div>
            </div>
          </header>
          <div className={sla2["s-l-a-frame"]}>
            <div className={sla2["fee-structure-frame"]}>
              <img className={sla2["mask-group-icon"]} alt="" src={maskGroup} />
              <div className={sla2["body-text"]}>
                <div className={sla2["body-text1"]}>
                  <div className={sla2["recruitment-fee-structure"]}>
                    <div className={sla2["recruitment-fee-structure1"]}>
                      Recruitment Fee Structure:
                    </div>
                    <div className={sla2["taizoin-charges-833-container"]}>
                      <span>Taizo.in charges </span>
                      <span className={sla2["on-the-annual"]}>
                        {recruitmentFeePercentage} % on the Annual {paymentType}{" "}
                      </span>
                      per candidate recruited,
                      <span>
                        plus GST, as the recruitment fee. The invoice will be
                        raised on the candidate's date of joining, and payment
                        is expected within <strong>{paymentTerms}</strong>
                        <span className={sla2["FW600"]}>
                          {paymentDueDays}
                        </span>{" "}
                        from the billing date.
                      </span>
                    </div>
                  </div>
                  <div className={sla2["gurantee-and-replacement"]}>
                    <div className={sla2["guarantee-and-replacement"]}>
                      Guarantee and Replacement:
                    </div>
                    <div className={sla2["in-the-event"]}>
                      In the event a candidate placed by Taizo.in voluntarily
                      leaves{" "}
                      <span className={sla2["FW600"]}>{companyName}</span>{" "}
                      within{" "}
                      <span className={sla2["FW600"]}>{replacementmonth}</span>{" "}
                      of joining, Taizo.in will provide a one-time replacement
                      at no additional charge. Please note that this replacement
                      policy will not apply if the company terminates the
                      employee for any other reason, for which we do not
                      guarantee providing a replacement.
                    </div>
                  </div>
                  <div className={sla2["effective-date"]}>
                    <div className={sla2["effective-date1"]}>
                      Effective Date:
                    </div>
                    <div className={sla2["this-service-level"]}>
                      This Service Level Agreement is effective from the date of
                      acceptance by both parties and will remain in effect until
                      the successful fulfillment of the positions.
                    </div>
                  </div>
                </div>
                <div className={sla2["accepted-and-agreed"]}>
                  <div className={sla2["signatures-frame"]}>
                    <div className={sla2["by-accepting-this"]}>
                      By accepting this SLA, both parties agree to the terms and
                      conditions outlined above.
                    </div>
                    <br />
                    <div className={sla2["accepted-and-agreed1"]}>
                      Accepted and agreed:
                    </div>
                    <div className={sla2["taizo-testing"]}>{companyName}</div>
                    <br />
                  </div>
                  <div className={sla2["signature-frame"]}>
                    <div className={sla2["date-frame"]}>
                      <div className={sla2["signature"]}>Signature:</div>
                      <div className={sla2["seal-signature"]}>
                        ______________
                      </div>
                    </div>
                    <div className={sla2["date-frame1"]}>
                      <div className={sla2["date"]}>Date:</div>
                      <div className={sla2["div"]}>______________</div>
                    </div>
                  </div>
                </div>
                <div className={sla2["taizo-seal-signature"]}>
                  <div className={sla2["signature1"]}>Signature:</div>
                  <div className={sla2["recruitment-fee-structure2"]}>
                    <div className={sla2["date1"]}>Date:</div>
                    <div className={sla2["xxxx-xx-xx"]}>{date}</div>
                  </div>
                  <div className={sla2["taizo-technologies-private1"]}>
                    Taizo Technologies Private Limited
                  </div>
                  <img
                    className={sla2["seal-signature-f-1"]}
                    loading="eager"
                    alt=""
                    src={sealSignature}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={sla2["footeraddress"]} style={{ marginTop: "40px" }}>
          <div className={sla2["footer-address"]}>
            <div className={sla2["location"]}>
              <div className={sla2["software-technology-parks-container"]}>
                <p className={sla2["software-technology-parks"]}>
                  Software Technology Parks of India,
                </p>
                <p className={sla2["nd-floor-no5"]}>
                  2nd Floor, No.5, Rajiv Gandhi Salai, Taramani, Chennai - 600
                  113.
                </p>
              </div>
              <img
                className={sla2["location-pin-svgrepo-com-1-1"]}
                loading="eager"
                alt=""
                src={locationpin}
              />
            </div>
            <div className={sla2["emailsvgrepocom"]}>
              <div className={sla2["infotaizoin"]}>
                <img
                  className={sla2["landline-1-icon"]}
                  loading="eager"
                  alt=""
                  src={landline}
                />
                <div className={sla2["div1"]}>+91 44 4813 5483</div>
              </div>
              <div className={sla2["infotaizoin1"]}>
                <img
                  className={sla2["email-svgrepo-com-3-1"]}
                  loading="eager"
                  alt=""
                  src={emailSvg}
                />
                <div className={sla2["infotaizoin2"]}>info@taizo.in</div>
              </div>
              <div
                className={sla2["infotaizoin3"]}
                style={{ paddingLeft: "10px" }}
              >
                <img
                  className={sla2["world-wide-web-2-1"]}
                  loading="eager"
                  alt=""
                  src={wwwtaizo}
                />
                <div className={sla2["wwwtaizoin"]}>www.taizo.in</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAPage2;
